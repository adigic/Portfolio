export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  type: 'Personal' | 'Private' | 'Professional';
  url?: string;
}
