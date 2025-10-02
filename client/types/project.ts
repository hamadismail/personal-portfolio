export interface IProject {
  id: number;
  title: string;
  description: string;

  thumbnail?: string;
  liveUrl?: string;
  gitRepo?: string;

  tags: string[];
  techStack: string[];
  features: string[];

  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
