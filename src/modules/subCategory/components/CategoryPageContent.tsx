import { PageTitle } from "@/components/pageTitle";
import { SubCategoryList } from "@/modules/subCategory/components/SubCategoryList/SubCategoryList";
import { PostListLayout } from "@/components/postListLayout";
import React from "react";
import { TParams } from "../hooks/useCategoryPage";
import { Footer } from "./Footer";
import { getCategoryData } from "@/modules/category/hooks/useCategoryData";

export const CategoryPageContent = async ({ params }: TParams) => {
  const { categoryId } = await params;

  if (!categoryId) {
    return null;
  }

  const pageData = await getCategoryData(categoryId);
  console.log("pageData", pageData);
  console.log("categoryId", categoryId);
  if (pageData === null) {
    return null;
  }

  const { posts, categories, sub_categories, userId } = pageData;

  return (
    <>
      <PageTitle title={categories.name} transitionname={`category-name`} />
      <article className={"h-full w-full"}>
        <SubCategoryList sub_categories={sub_categories} />
        <PostListLayout posts={posts} postListType={categories.layoutSchema} />
      </article>
      <Footer userId={userId} catId={pageData.categories.id} />
    </>
  );
};
