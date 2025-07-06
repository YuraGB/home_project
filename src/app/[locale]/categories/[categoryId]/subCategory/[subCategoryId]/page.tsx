import React from "react";
import { Bradcrmbs } from "@/components/bradcrumbs/Bradcrmbs";
import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";
import { getAllSubCategories } from "@/server/services/subCategory/getAllSubCategories";
import { PostListLayout } from "@/components/postListLayout";
import { PageTitle } from "@/components/pageTitle";
import { getSubCategoryPage } from "@/modules/subCategory/hooks copy/useSubCategory";
import { AddPostButton } from "@/modules/post/AddPost/AddPostButton";

export default async function SubCategory({
  params,
}: {
  params: Promise<{ subCategoryId: string; categoryId: string }>;
}) {
  const { breadcrumbsData, posts, subCategoryId, sub_category, categoryId } =
    await getSubCategoryPage({
      params,
    });

  if (!sub_category) {
    return null;
  }
  return (
    <DefaultPageLayout>
      <Bradcrmbs bradcrumbs={breadcrumbsData} />
      <PageTitle title={sub_category.name} />
      <article className={"h-full w-full max-w-full pt-4"}>
        <AddPostButton subCategoryId={subCategoryId} categoryId={categoryId} />
        <PostListLayout
          posts={posts}
          postListType={sub_category.layoutSchema}
        />
      </article>
    </DefaultPageLayout>
  );
}

//SSG
export async function generateStaticParams(): Promise<
  { subCategoryId: string }[] | []
> {
  const subCategories = await getAllSubCategories();

  return subCategories.map(({ id }) => ({ subCategoryId: String(id) }));
}
