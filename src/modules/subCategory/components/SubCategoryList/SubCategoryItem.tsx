"use client";
import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import classes from "@/modules/subCategory/styles/subCategory.module.css";

const ActionBox = dynamic(() =>
  import("@/components/actionBox").then((mod) => mod.ActionBox),
);
const UpdateSubCategoryButton = dynamic(() =>
  import(
    "@/modules/subCategory/components/UpdateSubCategory/UpdateSubCategoryButton"
  ).then((mod) => mod.UpdateSubCategoryButton),
);
const DeleteSubCategoryButton = dynamic(() =>
  import(
    "@/modules/subCategory/components/DeleteSubCategory/DeleteSubCategory"
  ).then((mod) => mod.DeleteSubCategoryButton),
);

export const SubCategoryItem = ({
  item,
}: {
  item: TSubCategory | null;
}): ReactNode => {
  const pathName = usePathname();
  if (!item) return null;
  return (
    <div className={classes.card}>
      <ActionBox>
        <UpdateSubCategoryButton subCategory={item} />
        <DeleteSubCategoryButton subCategory={item} />
      </ActionBox>

      <Link
        href={`${pathName}/subCategory/${item.id}`}
        className={"text-gold absolute flex"}
        prefetch={true}
      >
        <span className="inline-block font-serif text-gold">{item.name}</span>
      </Link>
    </div>
  );
};
