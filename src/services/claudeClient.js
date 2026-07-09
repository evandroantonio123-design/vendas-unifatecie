import Anthropic from '@anthropic-ai/sdk';
import { search as searchCourses } from '../repositories/courseRepository.js';
import { renderCourseText } from './templateRenderer.js';

const MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-6';

let client = null;
function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) {
    const err = new Error(
      'ANTHROPIC_API_KEY não configurada. Defina essa variável no .env para usar o assistente de IA.'
    );
    err.code = 'MISSING_API_KEY';
    throw err;
  }
  if (!client) client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
}

const SEARCH_TOOL = {
  name: 'search_courses',
  description:
    'Busca cursos cadastrados no banco de dados por nome, modalidade ou nivel. Retorna o texto de vendas ja pronto e formatado (renderedText) de cada curso encontrado, com valores reais do banco de dados.',
  input_schema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Termo de busca: nome do curso (ou parte dele), modalidade, etc.',
      },
    },
    required: ['query'],
  },
};

const CHAT_SYSTEM_PROMPT = `Você é um assistente interno da equipe de vendas da UNIFATECIE. Sua única função é ajudar o vendedor a encontrar o curso certo e devolver o texto padrão de vendas já pronto.

Regras obrigatórias, sem exceção:
1. Você NUNCA escreve valores, percentuais de desconto, datas ou textos promocionais por conta própria. Toda informação de curso/preço vem EXCLUSIVAMENTE da ferramenta search_courses.
2. Para qualquer pergunta sobre curso, valor ou campanha, chame primeiro a ferramenta search_courses.
3. Se a busca retornar exatamente 1 resultado, responda repetindo EXATAMENTE o campo "renderedText" retornado pela ferramenta, sem alterar, resumir, traduzir, corrigir ou reformatar nenhum caractere.
4. Se retornar mais de 1 resultado, liste rapidamente as opções (curso + modalidade + campanha) e peça ao vendedor para confirmar qual deseja; não invente qual é o certo.
5. Se não retornar nenhum resultado, diga que não encontrou esse curso cadastrado e peça para tentar outro termo ou avisar o time responsável pelo cadastro.
6. Nunca invente nome de curso, valor, prazo ou campanha que não veio da ferramenta.`;

/**
 * Conversa com busca "grounded": o modelo só pode relatar texto que veio
 * literalmente da ferramenta search_courses (que por sua vez usa o mesmo
 * templateRenderer da busca simples). Isso evita qualquer alucinação de preço.
 */
export async function chatWithSearch(userMessage, history = []) {
  const anthropic = getClient();
  const messages = [...history, { role: 'user', content: userMessage }];

  let response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: CHAT_SYSTEM_PROMPT,
    tools: [SEARCH_TOOL],
    messages,
  });

  let iterations = 0;
  while (response.stop_reason === 'tool_use' && iterations < 4) {
    iterations++;
    messages.push({ role: 'assistant', content: response.content });

    const toolResults = [];
    for (const block of response.content) {
      if (block.type !== 'tool_use') continue;
      if (block.name === 'search_courses') {
        const matches = searchCourses(block.input.query || '');
        const results = matches.map(({ course, campaign }) => ({
          course: course.name,
          modality: course.modality,
          campaign: campaign.name,
          renderedText: renderCourseText({ course, campaign }),
        }));
        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: JSON.stringify({ count: results.length, results }),
        });
      }
    }
    messages.push({ role: 'user', content: toolResults });

    response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: CHAT_SYSTEM_PROMPT,
      tools: [SEARCH_TOOL],
      messages,
    });
  }

  messages.push({ role: 'assistant', content: response.content });
  const textBlock = response.content.find((b) => b.type === 'text');
  return { text: textBlock ? textBlock.text : '', messages };
}

const EXTRACT_TOOL = {
  name: 'submit_extracted_course',
  description: 'Envia os dados de curso extraidos do texto do regulamento para revisao humana.',
  input_schema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Nome do curso' },
      level: { type: 'string', enum: ['graduacao', 'pos'] },
      modality: { type: 'string', description: 'Ex: Semi-presencial, EAD, Presencial' },
      duration: { type: 'string', description: 'Ex: 4 anos' },
      priceFull: { type: ['number', 'null'], description: 'Mensalidade cheia do curso (sem desconto)' },
      campaignName: { type: ['string', 'null'], description: 'Nome da campanha, ex: Campanha de Junho' },
      discountPct: { type: ['number', 'null'], description: 'Percentual de desconto da campanha, ex: 70' },
      enrollmentFeeFrom: { type: ['number', 'null'], description: 'Matrícula cheia da campanha' },
      enrollmentFeeTo: { type: ['number', 'null'], description: 'Matrícula com desconto da campanha (0 se isenta)' },
      firstPaymentNote: { type: ['string', 'null'], description: 'Ex: 1ª mensalidade apenas para Agosto!' },
      bonusText: { type: ['string', 'null'], description: 'Ex: linha de bonus tipo sorteio de carro' },
      validUntil: { type: ['string', 'null'], description: 'Data no formato YYYY-MM-DD, se mencionada' },
    },
    required: ['name'],
  },
};

const EXTRACT_SYSTEM_PROMPT = `Você extrai dados estruturados de textos de regulamentos de cursos para popular um banco de dados.

Regra mais importante: NUNCA invente, estime, arredonde ou deduza um valor que não esteja explicitamente escrito no texto fornecido. Se um campo não estiver claramente presente no texto, envie null (literalmente) para aquele campo. É melhor deixar null do que arriscar um valor errado.

Envie o resultado chamando a ferramenta submit_extracted_course.`;

/**
 * Extrai um rascunho estruturado a partir de texto colado pelo admin
 * (copiado de um PDF de regulamento). O resultado é sempre um RASCUNHO -
 * a rota que chama esta função nunca salva direto no banco.
 */
export async function extractCourseFromText(rawText) {
  const anthropic = getClient();
  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: EXTRACT_SYSTEM_PROMPT,
    tools: [EXTRACT_TOOL],
    tool_choice: { type: 'tool', name: 'submit_extracted_course' },
    messages: [{ role: 'user', content: rawText }],
  });
  const block = response.content.find((b) => b.type === 'tool_use');
  return block ? block.input : null;
}
