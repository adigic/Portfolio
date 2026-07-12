
export interface ProjectImage {
  asset?: {
    url?: string;
    metadata?: { dimensions?: { width?: number; height?: number } };
  };
  hotspot?: { x?: number; y?: number; height?: number; width?: number };
  crop?: Record<string, unknown>;
  _type: 'image';
}

export interface ProjectUXImage {
  image?: ProjectImage;
  title?: string;
  description?: string;
  aspect?: 'square' | 'landscape' | 'portrait';
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  cardImage?: ProjectImage;
  foundationImage?: ProjectImage;
  uxImages?: ProjectUXImage[];
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
}
