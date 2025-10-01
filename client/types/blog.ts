export interface IBlog {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured: boolean;
  tags: string[];
  views: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}
