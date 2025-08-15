import { TDBPost } from '@/db/drizzle/schemas/postsSchema';

export type TFindPost = {
  [key in 'categoryId' | 'subCategoryId']: number;
};
export type TCreatePostData = {
  name: string;
  description: string;
  url: string;
  image?: string;
  categoryId?: number;
  subCategoryId?: number;
  userId: number;
};

export type TUpdatePostData = Omit<TDBPost, 'createdAt' | 'lastVisited'> & {
  rating: boolean;
};
