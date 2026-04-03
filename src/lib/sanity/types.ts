export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  type: 'Personal' | 'Private' | 'Professional';
  url?: string;
  role?: string;
  client?: string;
  year?: string;
  overview?: string;
  process?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  toolsUsed?: string[];
  uiSummary?: string;
  figmaImageUrls?: string[];
}
