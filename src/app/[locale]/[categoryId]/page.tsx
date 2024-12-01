import React, { ReactNode } from "react";
import {
  TParams,
  useCategoryPage,
} from "@/app/[locale]/[categoryId]/_modules/hooks/useCategoryPage";
import { SubCategoryList } from "@/app/[locale]/[categoryId]/_modules/components/SubCategoryList/SubCategoryList";
import { PostsList } from "@/app/[locale]/[categoryId]/_modules/components/PostsList/PostsList";

export default function CategoryPage(props: TParams): ReactNode {
  const { posts, categories, sub_category } = React.use(useCategoryPage(props));

  if (!categories?.id) return null;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>{categories.name}</h1>
        <SubCategoryList sub_categories={sub_category} />
        <PostsList posts={posts} />
      </main>
    </div>
  );
}
