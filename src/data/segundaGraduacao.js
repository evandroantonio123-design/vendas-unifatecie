// Catálogo de "2ª Graduação" (portador de diploma) extraído do
// REGULAMENTO_CAMPANHA_2026-2_PORTADOR_DE_DIPLOMA_EAD_VERSAO_7.
// Mesma lógica de desconto (66%) da graduação comum, mas cada curso tem
// uma tabela de pré-requisitos (ANEXO II do regulamento): diploma anterior
// aceito + tempo de aproveitamento (0,5 / 1 / 2 anos) para aquele diploma.
//
// ATENÇÃO: este arquivo cobre por enquanto os Grupos BASE, 01, 03 e 04
// (19 cursos). O Grupo 02 (~50 cursos "Tecnologia em X", listas de
// pré-requisitos muito grandes) fica para uma próxima etapa.

export const campanhaSegundaGraduacao = {
  name: 'Processo Seletivo Portador de Diploma (2ª Graduação) - Módulo 2/2026',
  level: 'segunda_graduacao',
  validUntil: '2026-05-31',
  active: true,
  discountPct: 66,
  enrollmentFeeFrom: null,
  enrollmentFeeTo: 49.9,
  firstPaymentNote: '1ª mensalidade apenas para Julho!',
  bonusText: null,
};

// "Nome do diploma anterior|duração" - um por linha.
function parsePrereqs(raw) {
  return raw
    .trim()
    .split('\n')
    .map((line) => {
      const [degree, duration] = line.split('|').map((s) => s.trim());
      return { degree, duration };
    });
}

const RAW_COURSES = [
  // ---- Grupo BASE - R$225,00 ----
  [
    'Design de Produto',
    'EAD',
    225.0,
    `
Bacharelado em Desenho Industrial|0,5 ano
Bacharelado em Design|0,5 ano
Técnico em Computação Gráfica|0,5 ano
Técnico em Design de Embalagens|0,5 ano
Técnico em Design de Joias|0,5 ano
Técnico em Design de Móveis|0,5 ano
Técnico em Design Gráfico|0,5 ano
Tecnologia em Arquitetura de Ambientes|0,5 ano
Tecnologia em Design de Interiores|0,5 ano
Tecnologia em Design de Moda|0,5 ano
Tecnologia em Design do Produto|0,5 ano
Tecnologia em Produção de Móveis|0,5 ano
`,
  ],
  [
    'Jogos Digitais',
    'EAD',
    225.0,
    `
Bacharelado em Ciência da Computação|0,5 ano
Bacharelado em Engenharia de Software|0,5 ano
Bacharelado em Sistemas de Informação|0,5 ano
Técnico em Computação Gráfica|0,5 ano
Técnico em Desenvolvimento de Sistemas|0,5 ano
Técnico em Informática|0,5 ano
Técnico em Multimídia|0,5 ano
Técnico em Programação de Jogos Digitais|0,5 ano
Tecnologia em Design de Animação|0,5 ano
Tecnologia em Jogos Digitais|0,5 ano
Tecnologia em Produção de Conteúdos Digitais|0,5 ano
Tecnologia em Produção Multimídia|0,5 ano
`,
  ],
  [
    'Produção Publicitária',
    'EAD',
    225.0,
    `
Bacharelado em Comunicação Social|0,5 ano
Bacharelado em Marketing|0,5 ano
Bacharelado em Publicidade e Propaganda|0,5 ano
Bacharelado em Relações Públicas|0,5 ano
Técnico em Design Gráfico|0,5 ano
Técnico em Marketing|0,5 ano
Técnico em Multimídia|0,5 ano
Técnico em Publicidade|0,5 ano
Técnico em Rádio e Televisão|0,5 ano
Tecnologia em Comunicação e Multimeios|0,5 ano
Tecnologia em Comunicação Institucional|0,5 ano
Tecnologia em Design Gráfico|0,5 ano
Tecnologia em Marketing|0,5 ano
Tecnologia em Marketing Digital|0,5 ano
Tecnologia em Produção de Conteúdos Digitais|0,5 ano
Tecnologia em Produção Multimídia|0,5 ano
`,
  ],
  [
    'Segurança no Trânsito',
    'EAD',
    225.0,
    `
Bacharelado em Engenharia de Transportes|0,5 ano
Bacharelado em Segurança Pública|0,5 ano
Carteirinha Funcional como Profissional de Segurança Pública|0,5 ano
Técnico em Defesa Civil|0,5 ano
Técnico em Guarda e Segurança|0,5 ano
Técnico em Trânsito|0,5 ano
`,
  ],
  // ---- Grupo 01 - R$299,00 ----
  [
    'Ciências Econômicas',
    'EAD',
    299.0,
    `
Bacharelado em Administração|1 ano
Bacharelado em Administração Pública|1 ano
Bacharelado em Ciência da Informação|1 ano
Bacharelado em Ciência Política|1 ano
Bacharelado em Relações Internacionais|1 ano
Tecnologia em Gestão de Investimentos|1 ano
Bacharelado em Ciências Contábeis|1 ano
Bacharelado em Direito|1 ano
Bacharelado em Engenharia de Produção|1 ano
Bacharelado em Secretariado Executivo|1 ano
Cursos Superiores de Formação de Oficiais Militares (área militar)|1 ano
Tecnólogo em Administração de Pequenas e Médias Empresas|1 ano
Tecnólogo em Automação de Serviços Executivos|1 ano
Tecnólogo em Comércio Exterior|1 ano
Tecnólogo em Gestão Comercial|1 ano
Tecnólogo em Gestão da Produção Industrial|1 ano
Tecnólogo em Gestão da Qualidade|1 ano
Tecnólogo em Gestão da Qualidade (Normalização e Qualidade Industrial)|1 ano
Tecnólogo em Gestão das Organizações do Terceiro Setor|1 ano
Tecnólogo em Gestão de Cooperativas|1 ano
Tecnólogo em Gestão de Negócios Digitais|1 ano
Tecnólogo em Gestão de Planejamento Financeiro|1 ano
Tecnólogo em Gestão de Qualidade|1 ano
Tecnólogo em Gestão do Agronegócio|1 ano
Tecnólogo em Gestão e Empreendedorismo|1 ano
Tecnólogo em Gestão Empresarial|1 ano
Tecnólogo em Gestão Financeira|1 ano
Tecnólogo em Gestão Global Trading: Negócios, Logística e Finanças Globais|1 ano
Tecnólogo em Logística|1 ano
Tecnólogo em Processos Gerenciais|1 ano
Tecnólogo em Recursos Humanos|1 ano
Tecnólogo em Secretariado|1 ano
Tecnólogo em Secretariado Executivo|1 ano
`,
  ],
  [
    'Processos Escolares',
    'Semi-presencial',
    299.0,
    `
Bacharelado em Psicopedagogia|0,5 ano
Curso Técnico em Ludoteca|0,5 ano
Licenciatura em Andragogia|0,5 ano
Licenciatura em Educação do Campo|0,5 ano
Licenciatura em Educação Especial|0,5 ano
Licenciatura em Educação Indígena|0,5 ano
Licenciatura em Normal Superior|0,5 ano
Licenciatura em Pedagogia|0,5 ano
Licenciatura em Psicopedagogia|0,5 ano
Licenciatura em Teatro|0,5 ano
Normal Superior|0,5 ano
Técnico em Alimentação Escolar|0,5 ano
Técnico em Brinquedoteca|0,5 ano
Técnico em Infraestrutura Escolar|0,5 ano
Técnico em Multimeios Didáticos|0,5 ano
Técnico em Secretaria Escolar|0,5 ano
Tecnologia em Educação Social|0,5 ano
Tecnologia em Empreendedorismo Educacional|0,5 ano
Tecnologia em Interpretação de Sinais|0,5 ano
Tecnologia em Processos Educacionais|0,5 ano
`,
  ],
  [
    'Teologia',
    'EAD',
    299.0,
    `
Tecnologia em Ministério Pastoral|1 ano
`,
  ],
  // ---- Grupo 03 - R$499,00 ----
  [
    'Estética e Cosmética',
    'EAD',
    499.0,
    `
Técnico em Estética|0,5 ano
Técnico em Imagem Pessoal|0,5 ano
Técnico em Massoterapia|0,5 ano
Técnico em Podologia|0,5 ano
Tecnologia em Embelezamento e Imagem Pessoal|0,5 ano
Tecnologia em Estética e Cosmética|0,5 ano
`,
  ],
  [
    'Engenharia de Produção',
    'Semi-presencial',
    499.0,
    `
Bacharelado em Engenharia de Aplicação|1 ano
Bacharelado em Engenharia de Manutenção e Diagnóstico Industrial|1 ano
Bacharelado em Engenharia de Materiais|1 ano
Bacharelado em Engenharia de Processos|1 ano
Bacharelado em Engenharia de Projetos|1 ano
Bacharelado em Engenharia em Produção Agroindustrial|1 ano
Bacharelado em Engenharia Industrial|1 ano
Bacharelado em Engenharia Mecânica|1 ano
Bacharelado em Gestão da Qualidade|1 ano
Tecnologia em Engenharia da Produção|1 ano
Bacharelado em Engenharia Civil|1 ano
Bacharelado em Engenharia Química|1 ano
Tecnologia em Gestão de Manutenção|1 ano
Tecnologia em Gestão Industrial|1 ano
Tecnologia em Produção Industrial|1 ano
Bacharelado em Administração|1 ano
Bacharelado em Administração Pública|1 ano
Bacharelado em Ciências Contábeis|1 ano
Bacharelado em Ciências Econômicas - Economia|1 ano
Bacharelado em Ciências Gerenciais Gestão de Empresas e Negócios|1 ano
Bacharelado em Engenharia|1 ano
Tecnólogo em Automação de Serviços Executivos|1 ano
Tecnólogo em Automação Industrial|1 ano
Tecnólogo em Controle de Processos Industriais|1 ano
Tecnólogo em Gestão Ambiental|1 ano
Tecnólogo em Gestão Comercial|1 ano
Tecnólogo em Gestão da Cadeia de Suprimentos (Supply Chain)|1 ano
Tecnólogo em Gestão da Manutenção Industrial|1 ano
Tecnólogo em Gestão da Produção e Operações|1 ano
Tecnólogo em Gestão da Produção Industrial|1 ano
Tecnólogo em Gestão da Qualidade|1 ano
Tecnólogo em Gestão da Qualidade (Normalização e Qualidade Industrial)|1 ano
Tecnólogo em Gestão de Cooperativas|1 ano
Tecnólogo em Gestão de Custos Industriais|1 ano
Tecnólogo em Gestão de Processos Industriais|1 ano
Tecnólogo em Gestão de Projetos|1 ano
Tecnólogo em Gestão Industrial|1 ano
Tecnólogo em Logística|1 ano
Tecnólogo em Manufatura Avançada|1 ano
Tecnólogo em Mecânica|1 ano
Tecnólogo em Mecânica Automotiva|1 ano
Tecnólogo em Planejamento e Controle da Produção|1 ano
Tecnólogo em Segurança do Trabalho|1 ano
Tecnólogo em Sistemas de Produção|1 ano
Tecnólogo em Tecnologia Florestal|1 ano
`,
  ],
  [
    'Engenharia Ambiental e Sanitária',
    'Semi-presencial',
    499.0,
    `
Bacharelado em Engenharia Ambiental|2 anos
Bacharelado em Engenharia de Recursos Hídricos|2 anos
Bacharelado em Engenharia Química|2 anos
Bacharelado em Engenharia Sanitária|2 anos
Bacharelado em Engenharia Sanitária e Ambiental|2 anos
Bacharelado em Gestão Ambiental|2 anos
Bacharelado em Gestão Ambiental e Administração|2 anos
Bacharelado em Gestão de Recursos Naturais|2 anos
Tecnologia em Controle Ambiental|2 anos
Tecnologia em Gestão Ambiental|2 anos
Tecnologia em Gestão de Projetos Sustentáveis|2 anos
Tecnologia em Gestão de Recursos Hídricos|2 anos
Tecnologia em Gestão de Resíduos Sólidos|2 anos
Tecnologia em Gestão de Saúde Ambiental|2 anos
Tecnologia em Meio Ambiente|2 anos
Tecnologia em Saneamento Ambiental|2 anos
`,
  ],
  [
    'Engenharia de Software',
    'EAD',
    499.0,
    `
Bacharelado em Ciência da Computação|1 ano
Bacharelado em Engenharia da Computação|1 ano
Bacharelado em Engenharia de Dados|1 ano
Bacharelado em Engenharia de Sistemas|1 ano
Bacharelado em Engenharia DevOps|1 ano
Bacharelado em Sistemas de Informação|1 ano
Tecnologia em Análise e Desenvolvimento de Sistemas|1 ano
Tecnologia em Banco de Dados|1 ano
Tecnologia em Gestão da Tecnologia da Informação|1 ano
Tecnologia em Jogos Digitais|1 ano
Tecnologia em Segurança da Informação|1 ano
Tecnologia em Sistemas de Informação|1 ano
Tecnologia em Sistemas para Internet|1 ano
`,
  ],
  [
    'Terapias Integrativas e Complementares',
    'Semi-presencial',
    499.0,
    `
Bacharelado em Educação Física|0,5 ano
Bacharelado em Fisioterapia|0,5 ano
Bacharelado em Nutrição|0,5 ano
Bacharelado em Terapia Ocupacional|0,5 ano
Técnico em Estética|0,5 ano
Técnico em Massoterapia|0,5 ano
Técnico em Podologia|0,5 ano
Técnico em Terapias Holísticas|0,5 ano
Tecnologia em Embelezamento e Imagem Pessoal|0,5 ano
Tecnologia em Estética e Cosmética|0,5 ano
Tecnologia em Gerontologia|0,5 ano
Tecnologia em Massoterapia|0,5 ano
Tecnologia em Podologia|0,5 ano
`,
  ],
  // ---- Grupo 04 - R$799,00 ----
  [
    'Arquitetura e Urbanismo',
    'Semi-presencial',
    799.0,
    `
Bacharelado em Engenharia Civil|2 anos
`,
  ],
  [
    'Engenharia Agronômica (Agronomia)',
    'Semi-presencial',
    799.0,
    `
Bacharelado em Agronomia|2 anos
Bacharelado em Ciências do Solo|2 anos
Bacharelado em Ciências Florestais|2 anos
Bacharelado em Engenharia Agrícola|2 anos
Bacharelado em Engenharia Florestal|2 anos
Tecnologia em Agroecologia|2 anos
Tecnologia em Agroindústria|2 anos
Tecnologia em Apicultura e Meliponicultura|2 anos
Tecnologia em Aquicultura|2 anos
Tecnologia em Cafeicultura|2 anos
Tecnologia em Fruticultura|2 anos
Tecnologia em Gestão do Agronegócio|2 anos
Tecnologia em Horticultura|2 anos
Tecnologia em Mecanização em Agricultura de Precisão|2 anos
Tecnologia em Produção de Grãos|2 anos
Tecnologia em Produção Pesqueira|2 anos
Tecnologia em Silvicultura|2 anos
Tecnologia em Viticultura e Enologia|2 anos
`,
  ],
  [
    'Engenharia Civil',
    'Semi-presencial',
    799.0,
    `
Bacharelado em Arquitetura e Urbanismo|2 anos
Bacharelado em Engenharia Ambiental|2 anos
Bacharelado em Engenharia de Minas|2 anos
Bacharelado em Engenharia de Petróleo|2 anos
Bacharelado em Engenharia de Recursos Hídricos|2 anos
Bacharelado em Engenharia de Segurança do Trabalho|2 anos
Bacharelado em Engenharia de Transportes|2 anos
Bacharelado em Engenharia Elétrica|2 anos
Bacharelado em Engenharia Sanitária|2 anos
Bacharelado em Engenharia Sanitária e Ambiental|2 anos
Tecnologia em Agrimensura|2 anos
Tecnologia em Construção Civil|2 anos
Tecnologia em Construção de Edifícios|2 anos
Tecnologia em Construções ou Edificações|2 anos
Tecnologia em Engenharia de Produção com Ênfase em Construção|2 anos
Tecnologia em Gestão de Obras|2 anos
`,
  ],
  [
    'Engenharia da Computação',
    'EAD',
    799.0,
    `
Bacharelado em Engenharia de Instrumentação|1 ano
Bacharelado em Engenharia de Sistemas|1 ano
Bacharelado em Engenharia de Software|1 ano
Bacharelado em Engenharia Elétrica|1 ano
Bacharelado em Engenharia Eletrônica|1 ano
Bacharelado em Engenharia Mecatrônica|1 ano
Bacharelado em Sistemas de Informação|1 ano
Tecnologia em Análise e Desenvolvimento de Sistemas|2 anos
Tecnologia em Automação Industrial|2 anos
Tecnologia em Eletrônica Industrial|2 anos
Tecnologia em Instrumentação Industrial|2 anos
Tecnologia em Sistemas de Informação|2 anos
Tecnologia em Sistemas para Internet|2 anos
`,
  ],
  [
    'Engenharia Elétrica',
    'Semi-presencial',
    799.0,
    `
Bacharelado em Engenharia de Automação Industrial|2 anos
Bacharelado em Engenharia de Controle e Automação|2 anos
Bacharelado em Engenharia de Energia|2 anos
Bacharelado em Engenharia Eletrônica|2 anos
Bacharelado em Engenharia Mecânica|2 anos
Tecnologia em Energia e Eficiência Energética|2 anos
Tecnologia em Gestão de Energia e Eficiência Energética|2 anos
Tecnologia em Gestão de Sistemas Elétricos|2 anos
Tecnologia em Mecatrônica Industrial|2 anos
Tecnologia em Sistemas Elétricos|2 anos
`,
  ],
  [
    'Engenharia Mecânica',
    'Semi-presencial',
    799.0,
    `
Bacharelado em Engenharia de Aplicação|2 anos
Bacharelado em Engenharia de Automação Industrial|2 anos
Bacharelado em Engenharia de Controle e Automação|2 anos
Bacharelado em Engenharia de Manutenção e Diagnóstico Industrial|2 anos
Bacharelado em Engenharia de Materiais|2 anos
Bacharelado em Engenharia de Produção|2 anos
Bacharelado em Engenharia Elétrica|2 anos
Bacharelado em Engenharia Mecatrônica|2 anos
Tecnologia em Engenharia da Produção|2 anos
Tecnologia em Fabricação Mecânica|2 anos
Tecnologia em Gestão de Manutenção|2 anos
Tecnologia em Manutenção de Aeronaves|2 anos
Tecnologia em Manutenção Industrial|2 anos
Tecnologia em Materiais|2 anos
Tecnologia em Mecânica de Precisão|2 anos
Tecnologia em Mecatrônica Industrial|2 anos
Tecnologia em Produção de Móveis|2 anos
Tecnologia em Produção Industrial|2 anos
Tecnologia em Projetos Mecânicos|2 anos
Tecnologia em Refrigeração e Climatização|2 anos
Tecnologia em Sistemas Automotivos|2 anos
Tecnologia em Soldagem|2 anos
`,
  ],
];

export const seedCoursesSegundaGraduacao = RAW_COURSES.map(([name, modality, priceFull, prereqRaw]) => ({
  name: `${name} (2ª Graduação)`,
  level: 'segunda_graduacao',
  modality,
  duration: null,
  priceFull,
  prerequisites: parsePrereqs(prereqRaw),
}));
