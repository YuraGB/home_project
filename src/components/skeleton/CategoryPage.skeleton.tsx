import { PageTitle } from "../pageTitle";
import { PostListLayoutSkeleton } from "./PostListLayout.skeleton";
import { SubCategoryListSkeleton } from "./SubCategoryList.skeleton";

export const CategoryPageSkeleton = () => {
  return (
    <>
      <PageTitle title={"Loading..."} transitionname={"category-name"} />
      <article className={"h-full w-full"}>
        <SubCategoryListSkeleton />
        <PostListLayoutSkeleton />
      </article>
    </>
  );
};
