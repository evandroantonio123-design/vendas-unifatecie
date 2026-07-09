// Catálogo de "2ª Graduação" (portador de diploma) extraído do
// REGULAMENTO_CAMPANHA_2026-2_PORTADOR_DE_DIPLOMA_EAD_VERSAO_7.
// Mesma lógica de desconto (66%) da graduação comum, mas cada curso tem
// uma tabela de pré-requisitos (ANEXO II do regulamento): diploma anterior
// aceito + tempo de aproveitamento (0,5 / 1 / 2 anos) para aquele diploma.
//
// Cobre todos os Grupos BASE, 01, 02, 03 e 04 do regulamento (~61 cursos
// de 2ª graduação, com suas respectivas tabelas de pré-requisitos).

// Lista de pré-requisitos compartilhada pelos 11 cursos "X para licenciados"
// do Grupo 02 - todos aceitam a mesma lista de licenciaturas/formações
// pedagógicas, 1 ano de aproveitamento.
const PREREQS_PARA_LICENCIADOS = `
Licenciatura em Andragogia|1 ano
Licenciatura em Artes|1 ano
Licenciatura em Artes Cênicas|1 ano
Licenciatura em Artes Visuais|1 ano
Licenciatura em Biologia|1 ano
Licenciatura em Ciências|1 ano
Licenciatura em Ciências Biológicas|1 ano
Licenciatura em Ciências da Religião|1 ano
Licenciatura em Ciências Sociais|1 ano
Licenciatura em Dança|1 ano
Licenciatura em Educação Artística|1 ano
Licenciatura em Educação do Campo|1 ano
Licenciatura em Educação Especial|1 ano
Licenciatura em Educação Física|1 ano
Licenciatura em Educação Indígena|1 ano
Licenciatura em Filosofia|1 ano
Licenciatura em Física|1 ano
Licenciatura em Geografia|1 ano
Licenciatura em História|1 ano
Licenciatura em Letras|1 ano
Licenciatura em Letras Português|1 ano
Licenciatura em Letras Português-Espanhol|1 ano
Licenciatura em Letras Português-Francês|1 ano
Licenciatura em Letras Português-Inglês|1 ano
Licenciatura em Letras Português-Italiano|1 ano
Licenciatura em Línguas Estrangeiras Modernas|1 ano
Licenciatura em Matemática|1 ano
Licenciatura em Música|1 ano
Licenciatura em Pedagogia|1 ano
Licenciatura em Psicopedagogia|1 ano
Licenciatura em Química|1 ano
Licenciatura em Sociologia|1 ano
Licenciatura em Teatro|1 ano
Formação Pedagógica em Artes|1 ano
Formação Pedagógica em Ciências Biológicas|1 ano
Formação Pedagógica em Filosofia|1 ano
Formação Pedagógica em Física|1 ano
Formação Pedagógica em Geografia|1 ano
Formação Pedagógica em História|1 ano
Formação Pedagógica em Letras|1 ano
Formação Pedagógica em Matemática|1 ano
Formação Pedagógica em Pedagogia|1 ano
Formação Pedagógica em Química|1 ano
Formação Pedagógica em Sociologia|1 ano
`;

const CURSOS_PARA_LICENCIADOS = [
  'Artes',
  'Ciências Biológicas',
  'Educação Especial',
  'Filosofia',
  'Geografia',
  'História',
  'Letras (Português/Libras)',
  'Letras (Português/Inglês)',
  'Matemática',
  'Pedagogia',
  'Sociologia',
];

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
  // ---- Grupo 02 - R$330,00 ----
  [
    'Artes Visuais',
    'EAD',
    330.0,
    `
Bacharelado em Artes|1 ano
Tecnologia em Produção Cultural|1 ano
`,
  ],
  [
    'Biblioteconomia',
    'Semi-presencial',
    330.0,
    `
Bacharelado em Arquivologia|1 ano
Bacharelado em Ciência da Informação|1 ano
Bacharelado em Jornalismo|1 ano
Bacharelado em Museologia|1 ano
Tecnologia em Bibliotecas e Informação|1 ano
Tecnologia em Gestão de Arquivos|1 ano
Tecnologia em Gestão Documental|1 ano
Tecnologia em Museologia|1 ano
`,
  ],
  [
    'Educação Física (Bacharelado para licenciados)',
    'Semi-presencial',
    330.0,
    `
Licenciatura em Educação Física|2 anos
`,
  ],
  [
    'Educação Física (Licenciatura para bacharéis)',
    'Semi-presencial',
    330.0,
    `
Bacharelado em Educação Física|2 anos
`,
  ],
  [
    'Publicidade e Propaganda',
    'EAD',
    330.0,
    `
Bacharelado em Comunicação Social|1 ano
Bacharelado em Jornalismo|1 ano
Bacharelado em Marketing|1 ano
Bacharelado em Relações Públicas|1 ano
Tecnologia em Comunicação Institucional|1 ano
Tecnologia em Design de Animação|1 ano
Tecnologia em Marketing|1 ano
Tecnologia em Marketing Digital|1 ano
Tecnologia em Mídias Sociais e Digitais|1 ano
Tecnologia em Produção Multimídia|1 ano
Tecnologia em Produção Publicitária|1 ano
`,
  ],
  [
    'Sistemas de Informação',
    'EAD',
    330.0,
    `
Bacharelado em Ciência da Computação|1 ano
Bacharelado em Engenharia da Computação|1 ano
Bacharelado em Engenharia de Computação|1 ano
Bacharelado em Engenharia de Dados|1 ano
Bacharelado em Engenharia de Segurança Cibernética|1 ano
Bacharelado em Engenharia de Sistemas|1 ano
Bacharelado em Engenharia de Software|1 ano
Tecnologia em Análise e Desenvolvimento de Sistemas|1 ano
Tecnologia em Banco de Dados|1 ano
Tecnologia em Banco de Datas|1 ano
Tecnologia em Big Data e Inteligência Analítica|1 ano
Tecnologia em Cibersegurança|1 ano
Tecnologia em Gestão da Tecnologia da Informação|1 ano
Tecnologia em Inteligência Artificial|1 ano
Tecnologia em Inteligência Artificial e Machine Learning|1 ano
Tecnologia em Internet das Coisas|1 ano
Tecnologia em Jogos Digitais|1 ano
Tecnologia em Redes de Computadores|1 ano
Tecnologia em Segurança da Informação|1 ano
Tecnologia em Sistemas para Internet|1 ano
`,
  ],
  [
    'Administração',
    'EAD',
    330.0,
    `
Bacharelado em Administração Pública|1 ano
Bacharelado em Ciências Contábeis|1 ano
Bacharelado em Ciências Econômicas - Economia|1 ano
Bacharelado em Ciências Imobiliárias|1 ano
Bacharelado em Ciências Sociais|1 ano
Bacharelado em Comércio Exterior|1 ano
Bacharelado em Comunicação Social (Jornalismo/Publicidade e Propaganda)|1 ano
Bacharelado em Direito|1 ano
Bacharelado em Economia|1 ano
Bacharelado em Engenharia Ambiental|1 ano
Bacharelado em Engenharia de Produção|1 ano
Bacharelado em Publicidade e Propaganda|1 ano
Bacharelado em Relações Internacionais|1 ano
Bacharelado em Relações Públicas|1 ano
Bacharelado em Secretariado Executivo|1 ano
Cursos Superiores de Formação de Oficiais Militares (área militar)|1 ano
Tecnologia em Comércio Exterior|1 ano
Tecnologia em Empreendedorismo Educacional|1 ano
Tecnologia em Gestão Comercial|1 ano
Tecnologia em Gestão da Produção Industrial|1 ano
Tecnologia em Gestão da Qualidade|1 ano
Tecnologia em Gestão de Cooperativas|1 ano
Tecnologia em Gestão de Lojas e Pontos de Venda|1 ano
Tecnologia em Gestão de Negócios|1 ano
Tecnologia em Gestão de Negócios Imobiliários|1 ano
Tecnologia em Gestão de Patrimônio|1 ano
Tecnologia em Gestão de Políticas Públicas|1 ano
Tecnologia em Gestão de Processos|1 ano
Tecnologia em Gestão de Processos Industriais|1 ano
Tecnologia em Gestão de Projetos|1 ano
Tecnologia em Gestão de Recursos Humanos|1 ano
Tecnologia em Gestão de Serviços|1 ano
Tecnologia em Gestão de Serviços Industriais|1 ano
Tecnologia em Gestão de Serviços Judiciais e Notariais|1 ano
Tecnologia em Gestão de Serviços Públicos|1 ano
Tecnologia em Gestão do Agronegócio|1 ano
Tecnologia em Gestão do Varejo|1 ano
Tecnologia em Gestão Imobiliária|1 ano
Tecnologia em Gestão Portuária|1 ano
Tecnologia em Gestão Pública|1 ano
Tecnologia em Logística|1 ano
Tecnologia em Mediação, Conciliação e Arbitragem|1 ano
Tecnologia em Negócios Sustentáveis e ESG|1 ano
Tecnologia em Perícia Judicial e Extrajudicial|1 ano
Tecnologia em Processos Gerenciais|1 ano
Tecnologia em Produção Publicitária|1 ano
Tecnologia em Recrutamento, Seleção e Desenvolvimento de Pessoas|1 ano
Tecnologia em Secretariado|1 ano
Tecnologia em Sustentabilidade e Inovação|1 ano
Tecnologia em Transformação Digital|1 ano
Tecnólogo em Administração de Pequenas e Médias Empresas|1 ano
Tecnólogo em Automação de Serviços Executivos|1 ano
Tecnólogo em Comércio Exterior|1 ano
Tecnólogo em Comunicação Empresarial|1 ano
Tecnólogo em Empreendedorismo e Novos Negócios|1 ano
Tecnólogo em Gestão Ambiental|1 ano
Tecnólogo em Gestão Comercial|1 ano
Tecnólogo em Gestão da Produção Industrial|1 ano
Tecnólogo em Gestão da Qualidade|1 ano
Tecnólogo em Gestão da Qualidade (Normalização e Qualidade Industrial)|1 ano
Tecnólogo em Gestão das Organizações do Terceiro Setor|1 ano
Tecnólogo em Gestão de Cooperativas|1 ano
Tecnólogo em Gestão de Negócios Digitais|1 ano
Tecnólogo em Gestão de Planejamento Financeiro|1 ano
Tecnólogo em Gestão de Serviços Jurídicos, Registrais e Notariais|1 ano
Tecnólogo em Gestão do Agronegócio|1 ano
Tecnólogo em Gestão Empresarial|1 ano
Tecnólogo em Gestão Financeira|1 ano
Tecnólogo em Gestão Global Trading: Negócios, Logística e Finanças Globais|1 ano
Tecnólogo em Gestão Imobiliária|1 ano
Tecnólogo em Gestão Portuária|1 ano
Tecnólogo em Gestão Pública|1 ano
Tecnólogo em Logística|1 ano
Tecnólogo em Marketing|1 ano
Tecnólogo em Negócios Imobiliários|1 ano
Tecnólogo em Processos Gerenciais|1 ano
Tecnólogo em Recursos Humanos|1 ano
Tecnólogo em Relações Internacionais|1 ano
Tecnólogo em Secretariado|1 ano
Tecnólogo em Secretariado Executivo|1 ano
Tecnólogo em Segurança do Trabalho|1 ano
Tecnólogo em Segurança Pública|1 ano
Tecnólogo em Gestão em Segurança Privada|1 ano
`,
  ],
  [
    'Ciências Contábeis',
    'EAD',
    330.0,
    `
Bacharel em Ciência Política|1 ano
Bacharelado em Administração|1 ano
Bacharelado em Administração Pública|1 ano
Bacharelado em Engenharia de Produção|1 ano
Bacharelado em Ciências Econômicas|1 ano
Bacharelado em Ciências Gerenciais Gestão de Empresas e Negócios|1 ano
Bacharelado em Direito|1 ano
Bacharelado em Economia|1 ano
Bacharelado em Gestão de Projetos|1 ano
Bacharelado em Gestão Financeira|1 ano
Bacharelado em Relações Internacionais|1 ano
Bacharelado em Secretariado Executivo|1 ano
Cursos Superiores de Formação de Oficiais Militares (área militar)|1 ano
Tecnologia em Gestão Financeira|1 ano
Tecnológico em Secretariado|1 ano
Tecnólogo em Administração de Pequenas e Médias Empresas|1 ano
Tecnólogo em Administração Pública|1 ano
Tecnólogo em Comércio Exterior|1 ano
Tecnólogo em Gestão Comercial|1 ano
Tecnólogo em Gestão da Qualidade|1 ano
Tecnólogo em Gestão de Cooperativas|1 ano
Tecnólogo em Gestão de Negócios Imobiliários|1 ano
Tecnólogo em Gestão de Pequenas e Médias Empresas|1 ano
Tecnólogo em Gestão e Empreendedorismo|1 ano
Tecnólogo em Gestão Empresarial|1 ano
Tecnólogo em Gestão Financeira|1 ano
Tecnólogo em Gestão Fiscal e Tributária|1 ano
Tecnólogo em Gestão Global Trading: Negócios, Logística e Finanças Globais|1 ano
Tecnólogo em Gestão Mercadológica|1 ano
Tecnólogo em Gestão Pública|1 ano
Tecnólogo em Logística|1 ano
Tecnólogo em Marketing|1 ano
Tecnólogo em Planejamento Financeiro|1 ano
Tecnólogo em Processos Gerenciais|1 ano
Tecnólogo em Recursos Humanos|1 ano
Tecnólogo em Recursos Humanos Estratégicos|1 ano
`,
  ],
  [
    'Análise e Desenvolvimento de Sistemas',
    'EAD',
    330.0,
    `
Bacharelado em Biblioteconomia|0,5 ano
Bacharelado em Ciência da Computação|0,5 ano
Bacharelado em Engenharia da Computação|0,5 ano
Bacharelado em Engenharia de Computação|0,5 ano
Bacharelado em Engenharia de Dados|0,5 ano
Bacharelado em Engenharia de Segurança Cibernética|0,5 ano
Bacharelado em Engenharia de Sistemas|0,5 ano
Bacharelado em Engenharia de Software|0,5 ano
Bacharelado em Engenharia DevOps|0,5 ano
Bacharelado em Estatística|0,5 ano
Bacharelado em Sistemas de Informação|0,5 ano
Técnico em Desenvolvimento de Sistemas|0,5 ano
Técnico em Informática|0,5 ano
Técnico em Informática para Internet|0,5 ano
Técnico em Manutenção e Suporte em Informática|0,5 ano
Técnico em Redes de Computadores|0,5 ano
Tecnologia em Análise e Desenvolvimento de Sistemas|0,5 ano
Tecnologia em Segurança da Informação|0,5 ano
Tecnologia em Sistemas para Internet|0,5 ano
Bacharelado em Administração|1 ano
Bacharelado em Ciências Contábeis|1 ano
Curso Técnico com Formação em Análise e Desenvolvimento de Sistemas|1 ano
Curso Técnico com Formação em Processamento de Dados|1 ano
Curso Técnico em Redes de Computadores|1 ano
Curso Técnico em Informática|1 ano
Diploma em Processamento de Dados|1 ano
Tecnologia em Banco de Dados|1 ano
Tecnologia em Banco de Datas|1 ano
Tecnologia em Big Data e Inteligência Analítica|1 ano
Tecnologia em Cibersegurança|1 ano
Tecnologia em Gestão da Tecnologia da Informação|1 ano
Tecnologia em Inteligência Artificial|1 ano
Tecnologia em Inteligência Artificial e Machine Learning|1 ano
Tecnologia em Internet das Coisas|1 ano
Tecnologia em Redes de Computadores|1 ano
`,
  ],
  [
    'Comércio Exterior',
    'EAD',
    330.0,
    `
Bacharelado em Administração|0,5 ano
Bacharelado em Ciências Contábeis|0,5 ano
Bacharelado em Engenharia de Logística|0,5 ano
Bacharelado em Gestão de Projetos|0,5 ano
Bacharelado em Logística|0,5 ano
Bacharelado em Relações Internacionais|0,5 ano
Técnico em Comércio|0,5 ano
Técnico em Comércio Exterior|0,5 ano
Técnico em Logística|0,5 ano
Técnico em Marketing|0,5 ano
Tecnologia em Gestão Portuária|0,5 ano
Tecnologia em Logística|0,5 ano
Tecnologia em Negócios Sustentáveis e ESG|0,5 ano
`,
  ],
  [
    'Design de Interiores',
    'EAD',
    330.0,
    `
Bacharelado em Arquitetura e Urbanismo|0,5 ano
Bacharelado em Artes Visuais|0,5 ano
Bacharelado em Desenho Industrial|0,5 ano
Bacharelado em Design|0,5 ano
Técnico em Desenho de Construção Civil|0,5 ano
Técnico em Design de Interiores|0,5 ano
Técnico em Design de Móveis|0,5 ano
Técnico em Edificações|0,5 ano
Técnico em Paisagismo|0,5 ano
Tecnologia em Arquitetura de Ambientes|0,5 ano
Tecnologia em Design do Produto|0,5 ano
`,
  ],
  [
    'Design Gráfico',
    'EAD',
    330.0,
    `
Bacharelado em Artes|0,5 ano
Bacharelado em Artes Visuais|0,5 ano
Bacharelado em Desenho Industrial|0,5 ano
Bacharelado em Design|0,5 ano
Bacharelado em Jornalismo|0,5 ano
Licenciatura em Artes|0,5 ano
Licenciatura em Artes Visuais|0,5 ano
Técnico em Computação Gráfica|0,5 ano
Técnico em Comunicação Visual|0,5 ano
Técnico em Multimídia|0,5 ano
Técnico em Processos Gráficos|0,5 ano
Técnico em Publicidade|0,5 ano
Tecnologia em Comunicação e Multimeios|0,5 ano
Tecnologia em Design de Animação|0,5 ano
Tecnologia em Produção Cultural|0,5 ano
Tecnologia em Produção de Conteúdos Digitais|0,5 ano
Tecnologia em Produção Multimídia|0,5 ano
`,
  ],
  [
    'Gastronomia',
    'EAD',
    330.0,
    `
Bacharelado em Engenharia de Alimentos|0,5 ano
Bacharelado em Hotelaria|0,5 ano
Bacharelado em Turismo|0,5 ano
Tecnologia em Alimentos|0,5 ano
Tecnologia em Gestão de Eventos|0,5 ano
Tecnologia em Hotelaria|0,5 ano
Técnico em Alimentos|1 ano
Técnico em Confeitaria|1 ano
Técnico em Gastronomia|1 ano
Técnico em Nutrição e Dietética|1 ano
Técnico em Panificação|1 ano
Técnico em Serviços de Restaurante e Bar|1 ano
Tecnologia em Gestão de Turismo|1 ano
Tecnologia em Produção de Cacau e Chocolate|1 ano
Tecnologia em Produção de Cachaça|1 ano
Tecnologia em Produção de Cerveja|1 ano
`,
  ],
  [
    'Gestão Ambiental',
    'EAD',
    330.0,
    `
Bacharelado em Engenharia Ambiental|0,5 ano
Bacharelado em Engenharia Sanitária|0,5 ano
Bacharelado em Engenharia Sanitária e Ambiental|0,5 ano
Bacharelado em Gestão Ambiental|0,5 ano
Bacharelado em Gestão Ambiental e Administração|0,5 ano
Bacharelado em Gestão de Recursos Naturais|0,5 ano
Técnico em Controle Ambiental|0,5 ano
Técnico em Meio Ambiente|0,5 ano
Técnico em Saneamento|0,5 ano
Tecnologia em Controle Ambiental|0,5 ano
Tecnologia em Gestão de Projetos Sustentáveis|0,5 ano
Tecnologia em Gestão de Resíduos Sólidos|0,5 ano
Tecnologia em Gestão de Saúde Ambiental|0,5 ano
Tecnologia em Meio Ambiente|0,5 ano
Tecnologia em Saneamento Ambiental|0,5 ano
Bacharelado em Engenharia Civil|1 ano
Bacharelado em Engenharia de Minas|1 ano
Bacharelado em Engenharia de Petróleo|1 ano
Bacharelado em Engenharia Florestal|1 ano
Técnico em Meio Ambiente|1 ano
Tecnologia em Sustentabilidade e Inovação|1 ano
Tecnólogo em Controle Ambiental|1 ano
`,
  ],
  [
    'Gestão Comercial',
    'EAD',
    330.0,
    `
Bacharelado em Ciências Imobiliárias|0,5 ano
Técnico em Administração|0,5 ano
Técnico em Transações Imobiliárias|0,5 ano
Técnico em Comércio|0,5 ano
Técnico em Comércio Exterior|0,5 ano
Técnico em Marketing|0,5 ano
Técnico em Vendas|0,5 ano
Tecnologia em Gestão de Lojas e Pontos de Venda|0,5 ano
Tecnologia em Gestão do Varejo|0,5 ano
Tecnologia em Marketing|0,5 ano
Bacharelado em Administração|1 ano
Bacharelado em Ciências Contábeis|1 ano
Bacharelado em Hotelaria|1 ano
Bacharelado em Marketing|1 ano
Bacharelado em Turismo|1 ano
Técnico em Vendas|1 ano
Tecnologia em Comércio Exterior|1 ano
Tecnologia em Gestão de Negócios|1 ano
Tecnologia em Gestão de Turismo|1 ano
Tecnologia em Hotelaria|1 ano
`,
  ],
  [
    'Gestão da Produção Industrial',
    'EAD',
    330.0,
    `
Bacharelado em Engenharia de Aplicação|0,5 ano
Bacharelado em Engenharia de Produção|0,5 ano
Bacharelado em Engenharia em Produção Agroindustrial|0,5 ano
Bacharelado em Engenharia Industrial|0,5 ano
Bacharelado em Gestão de Projetos|0,5 ano
Bacharelado em Logística|0,5 ano
Técnico em Administração|0,5 ano
Técnico em Fabricação Mecânica|0,5 ano
Técnico em Logística|0,5 ano
Técnico em Planejamento e Controle da Produção|0,5 ano
Técnico em Qualidade|0,5 ano
Tecnologia em Engenharia da Produção|0,5 ano
Tecnologia em Gestão da Qualidade|0,5 ano
Tecnologia em Gestão de Processos Industriais|0,5 ano
Tecnologia em Gestão de Serviços Industriais|0,5 ano
Tecnologia em Gestão Industrial|0,5 ano
Tecnologia em Manutenção Industrial|0,5 ano
Tecnologia em Negócios Sustentáveis e ESG|0,5 ano
Tecnologia em Produção de Móveis|0,5 ano
Tecnologia em Produção Industrial|0,5 ano
Bacharelado em Administração|1 ano
Bacharelado em Engenharia de Produção|1 ano
Tecnologia em Fabricação Mecânica|1 ano
Tecnologia em Gestão de Manutenção|1 ano
Tecnologia em Manutenção de Aeronaves|1 ano
Tecnologia em Materiais|1 ano
Tecnologia em Projetos Mecânicos|1 ano
Tecnologia em Soldagem|1 ano
`,
  ],
  [
    'Gestão da Qualidade',
    'EAD',
    330.0,
    `
Bacharelado em Administração|0,5 ano
Bacharelado em Engenharia de Produção|0,5 ano
Técnico em Eletrotécnica|0,5 ano
Técnico em Mecânica Industrial|0,5 ano
Técnico em Edificações|0,5 ano
Técnico em Química|0,5 ano
Bacharelado em Engenharia em Produção Agroindustrial|0,5 ano
Bacharelado em Engenharia Industrial|0,5 ano
Bacharelado em Gestão de Projetos|0,5 ano
Técnico em Administração|0,5 ano
Técnico em Metrologia|0,5 ano
Técnico em Planejamento e Controle da Produção|0,5 ano
Técnico em Qualidade|0,5 ano
Tecnologia em Engenharia da Produção|0,5 ano
Tecnologia em Gestão da Produção Industrial|0,5 ano
Tecnologia em Gestão de Negócios|0,5 ano
Tecnologia em Gestão de Processos|0,5 ano
Tecnologia em Gestão de Projetos|0,5 ano
Tecnologia em Gestão Empresarial|0,5 ano
Tecnologia em Gestão Industrial|0,5 ano
Tecnologia em Negócios Sustentáveis e ESG|0,5 ano
Tecnologia em Processos Gerenciais|0,5 ano
Tecnologia em Produção Industrial|0,5 ano
`,
  ],
  [
    'Gestão de Recursos Humanos',
    'EAD',
    330.0,
    `
Bacharelado em Administração|0,5 ano
Bacharelado em Ciências Contábeis|0,5 ano
Bacharelado em Gestão da Qualidade|0,5 ano
Bacharelado em Gestão de Projetos|0,5 ano
Técnico em Administração|0,5 ano
Técnico em Recursos Humanos|0,5 ano
Técnico em Secretariado|0,5 ano
Tecnologia em Coaching e Desenvolvimento Humano|0,5 ano
Tecnologia em Negócios Sustentáveis e ESG|0,5 ano
Tecnologia em Processos Gerenciais|0,5 ano
Tecnologia em Psicologia Organizacional|0,5 ano
Tecnologia em Recrutamento, Seleção e Desenvolvimento de Pessoas|0,5 ano
`,
  ],
  [
    'Gestão de Segurança Privada',
    'EAD',
    330.0,
    `
Bacharelado em Ciências Policiais|0,5 ano
Bacharelado em Segurança Pública|0,5 ano
Técnico em Defesa Civil|0,5 ano
Técnico em Guarda e Segurança|0,5 ano
Técnico em Segurança do Trabalho|0,5 ano
Tecnologia em Gestão de Segurança Pública e Privada|0,5 ano
Tecnologia em Segurança do Trabalho|0,5 ano
Tecnologia em Segurança Privada|0,5 ano
`,
  ],
  [
    'Gestão do Agronegócio',
    'EAD',
    330.0,
    `
Bacharelado em Administração|1 ano
Bacharelado em Agronomia|1 ano
Bacharelado em Ciências do Solo|1 ano
Bacharelado em Comércio Exterior|1 ano
Bacharelado em Engenharia Agrícola|1 ano
Bacharelado em Engenharia em Produção Agroindustrial|1 ano
Bacharelado em Gestão de Projetos|1 ano
Bacharelado em Logística|1 ano
Técnico em Administração|1 ano
Técnico em Agricultura|1 ano
Técnico em Agronegócio|1 ano
Técnico em Agropecuária|1 ano
Técnico em Cooperativismo|1 ano
Tecnologia em Fruticultura|1 ano
Tecnologia em Gestão de Cooperativas|1 ano
Tecnologia em Horticultura|1 ano
Tecnologia em Mecanização em Agricultura de Precisão|1 ano
Tecnologia em Negócios Sustentáveis e ESG|1 ano
Tecnologia em Processos Gerenciais|1 ano
Tecnologia em Produção de Grãos|1 ano
Tecnologia em Produção Pesqueira|1 ano
Tecnólogo em Agronegócio|1 ano
`,
  ],
  [
    'Gestão Financeira',
    'EAD',
    330.0,
    `
Bacharelado em Ciências Contábeis|0,5 ano
Bacharelado em Gestão Financeira|0,5 ano
Técnico em Administração|0,5 ano
Técnico em Contabilidade|0,5 ano
Técnico em Finanças|0,5 ano
Técnico em Seguros|0,5 ano
Tecnologia em Gestão de Investimentos|0,5 ano
Bacharelado em Administração|1 ano
Bacharelado em Ciências Econômicas|1 ano
Bacharelado em Economia|1 ano
Bacharelado em Gestão de Projetos|1 ano
Curso Técnico em Contabilidade|1 ano
Tecnologia em Gestão de Patrimônio|1 ano
Tecnologia em Logística|1 ano
Tecnologia em Negócios Sustentáveis e ESG|1 ano
Tecnologia em Processos Gerenciais|1 ano
`,
  ],
  [
    'Gestão Pública',
    'EAD',
    330.0,
    `
Bacharelado em Administração|0,5 ano
Bacharelado em Administração Pública|0,5 ano
Bacharelado em Ciência Política|0,5 ano
Bacharelado em Direito|0,5 ano
Bacharelado em Gestão de Projetos|0,5 ano
Técnico em Administração|0,5 ano
Técnico em Secretariado|0,5 ano
Técnico em Serviços Públicos|0,5 ano
Tecnologia em Administração Pública|0,5 ano
Tecnologia em Gestão de Políticas Públicas|0,5 ano
Tecnologia em Gestão de Serviços Públicos|0,5 ano
Tecnologia em Negócios Sustentáveis e ESG|0,5 ano
Bacharelado em Ciências Contábeis|1 ano
Bacharelado em Relações Internacionais|1 ano
Técnico em Serviços Públicos|1 ano
Tecnologia em Desenvolvimento Comunitário|1 ano
Tecnologia em Mediação, Conciliação e Arbitragem|1 ano
Tecnologia em Perícia Judicial e Extrajudicial|1 ano
`,
  ],
  [
    'Logística',
    'EAD',
    330.0,
    `
Bacharelado em Administração|0,5 ano
Técnico em Mecânica Industrial|0,5 ano
Bacharelado em Ciências Contábeis|0,5 ano
Bacharelado em Comércio Exterior|0,5 ano
Bacharelado em Engenharia de Logística|0,5 ano
Bacharelado em Engenharia de Produção|0,5 ano
Bacharelado em Engenharia de Transportes|0,5 ano
Bacharelado em Gestão de Projetos|0,5 ano
Bacharelado em Logística|0,5 ano
Técnico em Administração|0,5 ano
Técnico em Comércio Exterior|0,5 ano
Técnico em Logística|0,5 ano
Técnico em Portos|0,5 ano
Técnico em Transporte de Cargas|0,5 ano
Tecnologia em Comércio Exterior|0,5 ano
Tecnologia em Engenharia da Produção|0,5 ano
Tecnologia em Gestão Portuária|0,5 ano
Tecnologia em Negócios Sustentáveis e ESG|0,5 ano
Tecnologia em Processos Gerenciais|0,5 ano
`,
  ],
  [
    'Marketing',
    'EAD',
    330.0,
    `
Bacharelado em Administração|0,5 ano
Bacharelado em Marketing|0,5 ano
Bacharelado em Publicidade e Propaganda|0,5 ano
Bacharelado em Relações Públicas|0,5 ano
Técnico em Comércio|0,5 ano
Técnico em Design Gráfico|0,5 ano
Técnico em Marketing|0,5 ano
Técnico em Publicidade|0,5 ano
Técnico em Vendas|0,5 ano
Tecnologia em Comunicação Institucional|0,5 ano
Tecnologia em Design Gráfico|0,5 ano
Tecnologia em Gestão Comercial|0,5 ano
Tecnologia em Gestão de Eventos|0,5 ano
Tecnologia em Gestão do Varejo|0,5 ano
Tecnologia em Mídias Sociais e Digitais|0,5 ano
Tecnologia em Produção de Conteúdos Digitais|0,5 ano
Tecnologia em Produção Publicitária|0,5 ano
`,
  ],
  [
    'Negócios Imobiliários',
    'EAD',
    330.0,
    `
Bacharelado em Administração|0,5 ano
Bacharelado em Ciências Contábeis|0,5 ano
Bacharelado em Ciências Imobiliárias|0,5 ano
Técnico em Administração|0,5 ano
Técnico em Comércio|0,5 ano
Técnico em Condomínio|0,5 ano
Técnico em Transações Imobiliárias|0,5 ano
Tecnologia em Administração em Ênfase Imobiliária|0,5 ano
Tecnologia em Gestão Comercial|0,5 ano
Tecnologia em Gestão de Lojas e Pontos de Venda|0,5 ano
Tecnologia em Gestão Imobiliária|0,5 ano
`,
  ],
  [
    'Processos Gerenciais',
    'EAD',
    330.0,
    `
Bacharelado em Administração|0,5 ano
Técnico em Automação Industrial|0,5 ano
Técnico em Química|0,5 ano
Bacharelado em Administração Pública|0,5 ano
Bacharelado em Engenharia de Logística|0,5 ano
Bacharelado em Gestão da Qualidade|0,5 ano
Bacharelado em Gestão de Projetos|0,5 ano
Bacharelado em Logística|0,5 ano
Técnico em Administração|0,5 ano
Técnico em Comércio|0,5 ano
Técnico em Finanças|0,5 ano
Técnico em Recursos Humanos|0,5 ano
Técnico em Secretariado|0,5 ano
Técnico em Seguros|0,5 ano
Tecnologia em Administração Pública|0,5 ano
Tecnologia em Gestão da Produção Industrial|0,5 ano
Tecnologia em Gestão da Qualidade|0,5 ano
Tecnologia em Gestão de Cooperativas|0,5 ano
Tecnologia em Gestão de Negócios|0,5 ano
Tecnologia em Gestão de Patrimônio|0,5 ano
Tecnologia em Gestão de Políticas Públicas|0,5 ano
Tecnologia em Gestão de Processos|0,5 ano
Tecnologia em Gestão de Processos Industriais|0,5 ano
Tecnologia em Gestão de Projetos|0,5 ano
Tecnologia em Gestão de Serviços|0,5 ano
Tecnologia em Gestão de Serviços Industriais|0,5 ano
Tecnologia em Gestão de Serviços Públicos|0,5 ano
Tecnologia em Gestão Empresarial|0,5 ano
Tecnologia em Gestão Pública|0,5 ano
Tecnologia em Logística|0,5 ano
Tecnologia em Negócios Sustentáveis e ESG|0,5 ano
Tecnologia em Sustentabilidade e Inovação|0,5 ano
Bacharelado em Ciências Contábeis|1 ano
Bacharelado em Engenharia de Projetos|1 ano
Bacharelado em Publicidade e Propaganda|1 ano
Bacharelado em Secretariado|1 ano
Curso Técnico em Cooperativismo|1 ano
Técnico em Condomínio|1 ano
Tecnologia em Gestão de Lojas e Pontos de Venda|1 ano
Tecnologia em Secretariado|1 ano
`,
  ],
  [
    'Secretariado',
    'EAD',
    330.0,
    `
Bacharelado em Administração|0,5 ano
Bacharelado em Secretariado|0,5 ano
Técnico em Administração|0,5 ano
Técnico em Secretariado|0,5 ano
Técnico em Serviços Jurídicos|0,5 ano
Tecnologia em Despachante Documentalista|0,5 ano
`,
  ],
  [
    'Segurança no Trabalho',
    'EAD',
    330.0,
    `
Bacharelado em Engenharia Civil|1 ano
Bacharelado em Engenharia de Segurança do Trabalho|1 ano
Técnico em Controle Ambiental|1 ano
Técnico em Defesa Civil|1 ano
Técnico em Meio Ambiente|1 ano
Técnico em Segurança do Trabalho|1 ano
`,
  ],
  [
    'Segurança Pública',
    'EAD',
    330.0,
    `
Bacharelado em Ciências Policiais|0,5 ano
Bacharelado em Direito|0,5 ano
Bacharelado em Segurança Pública|0,5 ano
Carteirinha Funcional como Profissional de Segurança Pública|0,5 ano
Técnico em Defesa Civil|0,5 ano
Técnico em Guarda e Segurança|0,5 ano
Técnico em Segurança do Trabalho|0,5 ano
Tecnologia em Criminologia|0,5 ano
Tecnologia em Gestão de Segurança Privada|0,5 ano
Tecnologia em Investigação e Inteligência Policial|0,5 ano
Tecnologia em Segurança do Trabalho|0,5 ano
Tecnologia em Segurança no Trânsito|0,5 ano
Tecnologia em Segurança Privada|0,5 ano
Tecnologia em Serviços Jurídicos|0,5 ano
Tecnologia em Serviços Penais|0,5 ano
`,
  ],
  [
    'Sistemas para Internet',
    'EAD',
    330.0,
    `
Bacharelado em Engenharia da Computação|0,5 ano
Bacharelado em Engenharia de Sistemas|0,5 ano
Bacharelado em Engenharia DevOps|0,5 ano
Bacharelado em Estatística|0,5 ano
Bacharelado em Sistemas de Informação|0,5 ano
Técnico em Desenvolvimento de Sistemas|0,5 ano
Técnico em Informática|0,5 ano
Técnico em Informática para Internet|0,5 ano
Técnico em Manutenção e Suporte em Informática|0,5 ano
Técnico em Redes de Computadores|0,5 ano
Tecnologia em Análise e Desenvolvimento de Sistemas|0,5 ano
Tecnologia em Internet das Coisas|0,5 ano
Tecnologia em Segurança da Informação|0,5 ano
Técnico em Processamento de Dados|1 ano
Tecnologia em Banco de Dados|1 ano
Tecnologia em Banco de Datas|1 ano
Tecnologia em Gestão da Tecnologia da Informação|1 ano
Tecnologia em Inteligência Artificial|1 ano
Tecnologia em Inteligência Artificial e Machine Learning|1 ano
Tecnologia em Jogos Digitais|1 ano
Tecnologia em Marketing Digital|1 ano
Tecnologia em Transformação Digital|1 ano
`,
  ],
];

const CURSOS_PARA_LICENCIADOS_ROWS = CURSOS_PARA_LICENCIADOS.map((name) => [
  name,
  'Semi-presencial',
  330.0,
  PREREQS_PARA_LICENCIADOS,
]);

export const seedCoursesSegundaGraduacao = [...RAW_COURSES, ...CURSOS_PARA_LICENCIADOS_ROWS].map(
  ([name, modality, priceFull, prereqRaw]) => ({
    name: `${name} (2ª Graduação)`,
    level: 'segunda_graduacao',
    modality,
    duration: null,
    priceFull,
    prerequisites: parsePrereqs(prereqRaw),
  })
);
