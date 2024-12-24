import React from "react";
import { Bradcrmbs } from "@/components/bradcrumbs/Bradcrmbs";
import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";
import { AddPostButton } from "@/app/[locale]/[categoryId]/_modules/components/AddPost/AddPostButton";
import { getSubCategoryPage } from "@/app/[locale]/[categoryId]/subCategory/[subCategoryId]/_modules/hooks/useSubCategory";
import { PostsList } from "@/app/[locale]/[categoryId]/_modules/components/PostsList/PostsList";
import { getAllSubCategories } from "@/server/actions/subCategory/getAllSubCategories";

export default async function SubCategory({
  params,
}: {
  params: Promise<{ subCategoryId: string; categoryId: string }>;
}) {
  const { breadcrumbsData, userId, subCategoryId, posts, rating } =
    await getSubCategoryPage({
      params,
    });
  console.log(rating, posts);
  return (
    <DefaultPageLayout>
      <Bradcrmbs bradcrumbs={breadcrumbsData} />
      <h1>subCategory</h1>
      <article className={"h-full w-full"}>
        <AddPostButton userId={userId} subCategoryId={subCategoryId} />
        <PostsList posts={posts} rating={rating} />
      </article>
    </DefaultPageLayout>
  );
}

export async function generateStaticParams(): Promise<
  { subCategoryId: string }[] | []
> {
  const subCategories = await getAllSubCategories();

  return subCategories.map(({ id }) => ({ subCategoryId: String(id) }));
}
