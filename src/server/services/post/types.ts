export type TFindPost = {
  [key in "categoryId" | "subCategoryId"]: number;
};
export type TCreatePostData = {
  name: string;
  description: string;
  url: string;
  image?: string;
  categoryId?: number;
  subCategoryId?: number;
};
