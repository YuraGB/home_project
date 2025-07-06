import { AddPostButton } from "@/modules/post/AddPost/AddPostButton";
import { AddSubCategoryButton } from "@/modules/subCategory/components/AddSubCategory/AddSubCategoryButton";
import React from "react";

export const Footer = ({
  catId,
  userId,
}: {
  catId: number;
  userId: number;
}) => {
  return (
    <footer className={"flex gap-2 justify-center items-center w-full py-4"}>
      <AddPostButton categoryId={catId} />
      <AddSubCategoryButton userId={userId} categoryId={catId} />
    </footer>
  );
};
