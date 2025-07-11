import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { getCatalogByUserIdWithData } from "@/server/services/catalog/getCatalogByUserIDWithData";
import { formatPostData } from "@/server/lib/formatPostData";
import { PageTitle } from "@/components/pageTitle";
import { SubCategoryList } from "@/modules/subCategory/components/SubCategoryList/SubCategoryList";
import { PostListLayout } from "@/components/postListLayout";
import React from "react";
import { TParams } from "../hooks/useCategoryPage";
import { Footer } from "./Footer";

export const CategoryPageContent = async ({ params }: TParams) => {
  const { categoryId } = await params;
  const session = await getServerSession(authOptions);

  if (session === null || session?.user === null) {
    return null;
  }

  const pageData = await getCatalogByUserIdWithData(
    Number(session.user.id),
    Number(categoryId)
  );

  if (pageData === null) {
    return null;
  }

  const posts = pageData.posts
    ? formatPostData(pageData.posts, pageData.rating ?? null)
    : null;

  return (
    <>
      <PageTitle title={pageData.categories.name} />
      <article className={"h-full w-full"}>
        <SubCategoryList sub_categories={pageData.sub_categories} />
        <PostListLayout
          posts={posts}
          postListType={pageData.categories.layoutSchema}
        />
      </article>
      <Footer userId={session.user.id} catId={pageData.categories.id} />
    </>
  );
};
