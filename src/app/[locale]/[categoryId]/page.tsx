import React from "react";
import {
  getCategoryPage,
  TParams,
} from "@/app/[locale]/[categoryId]/_modules/hooks/useCategoryPage";
import { SubCategoryList } from "@/app/[locale]/[categoryId]/_modules/components/SubCategoryList/SubCategoryList";
import { AddPostButton } from "@/app/_modules/Posts/AddPost/AddPostButton";
import { AddSubCategoryButton } from "@/app/[locale]/[categoryId]/_modules/components/AddSubCategory/AddSubCategoryButton";
import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";
import { Bradcrmbs } from "@/components/bradcrumbs/Bradcrmbs";
import { PageTitle } from "@/components/pageTitle";
import { getAllCategories } from "@/server/actions/catalog/getAllCategories";
import { PostListLayout } from "@/components/postListLayout";

export default async function CategoryPage(props: TParams) {
  const { posts, categories, sub_category, userId, breadcrumbsData } =
    await getCategoryPage(props);

  if (!categories?.id) return null;

  return (
    <DefaultPageLayout>
      <Bradcrmbs bradcrumbs={breadcrumbsData} />
      <PageTitle title={categories.name} />
      <article className={"h-full w-full"}>
        <SubCategoryList sub_categories={sub_category} />
        <PostListLayout posts={posts} postListType={categories.layoutSchema} />
      </article>
      <footer className={"flex gap-2 justify-center items-center w-full"}>
        <AddPostButton categoryId={categories.id} />
        <AddSubCategoryButton userId={userId} categoryId={categories.id} />
      </footer>
    </DefaultPageLayout>
  );
}

//SSG
export async function generateStaticParams(): Promise<
  { categoryId: string }[] | []
> {
  const categories = await getAllCategories();

  return categories.map(({ id }) => ({ categoryId: String(id) }));
}
