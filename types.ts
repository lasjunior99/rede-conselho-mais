
export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string; // Max 80 words
  specialization: string; // Governança, Compliance, etc.
  photoUrl: string; // Base64 Data URI or URL
  cvUrl?: string; // Base64 Data URI for PDF
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
  imageUrl: string; // Base64 Data URI or URL
}

export interface NewsItem {
  id: string;
  title: string;
  source: string; // e.g., "Mercado", "IBGC", "Internacional"
  date: string;
  summary: string;
  link?: string;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  fileUrl: string; // URL to the PDF
  date: string;
  isGenerated?: boolean; // Flag to indicate if it uses the internal PDF generator
}

export interface MetaConfig {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
}

export interface Metric {
  id: string;
  label: string;
  value: string;
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
