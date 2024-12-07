import React from "react";
import {
  getCategoryPage,
  TParams,
} from "@/app/[locale]/[categoryId]/_modules/hooks/useCategoryPage";
import { SubCategoryList } from "@/app/[locale]/[categoryId]/_modules/components/SubCategoryList/SubCategoryList";
import { PostsList } from "@/app/[locale]/[categoryId]/_modules/components/PostsList/PostsList";
import { AddPostButton } from "@/app/[locale]/[categoryId]/_modules/components/AddPost/AddPostButton";
import { AddSubCategoryButton } from "@/app/[locale]/[categoryId]/_modules/components/AddSubCategory/AddSubCategoryButton";
import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";

export default async function CategoryPage(props: TParams) {
  const { posts, categories, sub_category, userId, rating } =
    await getCategoryPage(props);
  if (!categories?.id) return null;

  return (
    <DefaultPageLayout>
      <h1>{categories.name}</h1>
      <article>
        <SubCategoryList sub_categories={sub_category} />
        <PostsList posts={posts} rating={rating} />
      </article>
      <footer>
        <AddPostButton userId={userId} categoryId={categories.id} />
        <AddSubCategoryButton userId={userId} categoryId={categories.id} />
      </footer>
    </DefaultPageLayout>
  );
}
