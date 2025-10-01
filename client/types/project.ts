export interface IProject {
  id: number;
  title: string;
  thumbnail?: string;
  liveUrl?: string;
  gitRepo?: string;
  createdAt: Date;
  updatedAt: Date;
}
