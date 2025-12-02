
import { Member, BlogPost, NewsItem, MetaConfig, Metric } from './types';

export const INITIAL_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Carlos Mendes',
    role: 'Conselheiro Independente',
    bio: 'Especialista em reestruturação de empresas familiares com mais de 20 anos de experiência em conselhos administrativos.',
    specialization: 'Conselhos Consultivos',
    photoUrl: 'https://picsum.photos/id/1005/400/400',
    linkedinUrl: 'https://linkedin.com',
    email: 'carlos@exemplo.com'
  },
  {
    id: '2',
    name: 'Ana Souza',
    role: 'Diretora de Compliance',
    bio: 'Advogada com foco em mitigação de riscos e implementação de programas de integridade em multinacionais.',
    specialization: 'Compliance',
    photoUrl: 'https://picsum.photos/id/1011/400/400',
    linkedinUrl: 'https://linkedin.com'
  },
  {
    id: '3',
    name: 'Roberto Fields',
    role: 'Consultor Estratégico',
    bio: 'Focado em inovação e transformação digital para conselhos de administração.',
    specialization: 'Estratégia',
    photoUrl: 'https://picsum.photos/id/1025/400/400',
    linkedinUrl: 'https://linkedin.com'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'O Papel do Conselheiro na Era Digital',
    author: 'Redação Conselho+',
    date: '2023-10-15',
    excerpt: 'Como a tecnologia está transformando as tomadas de decisão nos conselhos modernos.',
    content: 'A transformação digital não é mais uma opção, é uma necessidade imperativa para a sobrevivência das organizações...',
    imageUrl: 'https://picsum.photos/id/180/800/400'
  },
  {
    id: '2',
    title: 'ESG: Além da Sigla',
    author: 'Maria Oliveira',
    date: '2023-09-28',
    excerpt: 'Entendendo a profundidade das práticas ambientais, sociais e de governança.',
    content: 'ESG representa um paradigma onde o lucro não é o único indicador de sucesso...',
    imageUrl: 'https://picsum.photos/id/190/800/400'
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Nova regulamentação da CVM sobre transparência',
    source: 'Regulatório',
    date: '2023-10-20',
    summary: 'A Comissão de Valores Mobiliários publicou ontem a resolução 175 que impacta diretamente...',
    link: '#'
  },
  {
    id: '2',
    title: 'Tendências de Governança para 2024 segundo IBGC',
    source: 'Boas Práticas',
    date: '2023-10-18',
    summary: 'O congresso anual destacou a diversidade cognitiva como pilar central.',
    link: '#'
  }
];

export const DEFAULT_META_TAGS: MetaConfig = {
  title: 'REDE CONSELHO+ | Governança Corporativa e Conselhos Consultivos',
  description: 'A principal rede de conexões para conselheiros e executivos. Aprofunde-se em Governança Corporativa, ESG, Compliance e Gestão Estratégica.',
  keywords: 'Governança Corporativa, Conselho Consultivo, Conselheiros Independentes, Gestão Estratégica, Compliance, Riscos, ESG',
  ogTitle: 'REDE CONSELHO+ | Somamos Valor com Governança',
  ogDescription: 'Conecte-se com especialistas e acesse as melhores práticas de governança corporativa. Uma rede exclusiva para conselheiros.',
  ogImage: 'https://www.conselhomais.com.br/assets/social-share.jpg',
  ogUrl: 'https://www.conselhomais.com.br/'
};

export const INITIAL_METRICS: Metric[] = [
  { id: '1', label: 'Membros Ativos', value: '150+' },
  { id: '2', label: 'Eventos Realizados', value: '45' },
  { id: '3', label: 'Empresas Impactadas', value: '300+' },
];
