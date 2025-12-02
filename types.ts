export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string; // Max 80 words
  specialization: string; // Governança, Compliance, etc.
  photoUrl: string;
  linkedinUrl?: string;
  email?: string;
  phone?: string;
  profileUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  excerpt: string;
  imageUrl: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string; // e.g., "Mercado", "IBGC", "Internacional"
  date: string;
  summary: string;
  link?: string;
}

export enum Page {
  HOME = 'HOME',
  IDENTITY = 'IDENTITY',
  DIRECTORY = 'DIRECTORY',
  BLOG = 'BLOG',
  NEWS = 'NEWS',
  CONTACT = 'CONTACT',
  ADMIN = 'ADMIN'
}

export const CATEGORIES = [
  "Governança Corporativa",
  "Compliance",
  "Riscos",
  "Estratégia",
  "Conselhos Consultivos",
  "Comitês de Assessoramento",
  "Secretaria de Governança",
  "Auditoria",
  "Pessoas e Cultura"
];