import React, { ReactNode } from "react";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import Link from "next/link";
import dynamic from "next/dynamic";

const ActionBox = dynamic(() =>
  import("@/components/actionBox").then((mod) => mod.ActionBox),
);
const DeleteCategoryButton = dynamic(() =>
  import(
    "@/app/[locale]/_modules/components/CategoryItemActions/DeleteCategory/DeleteCategoryButton"
  ).then((mod) => mod.DeleteCategoryButton),
);
const UpdateCategoryButton = dynamic(() =>
  import(
    "@/app/[locale]/_modules/components/CategoryItemActions/UpdateCategory/UpdateCategoryButton"
  ).then((mod) => mod.UpdateCategoryButton),
);

export const CategoryItem = ({
  category,
  locale,
}: {
  category: TCategory;
  locale: string;
}): ReactNode => {
  if (!category.id) return null;
  return (
    <section className={"rounded bg-green relative"}>
      <ActionBox>
        <UpdateCategoryButton category={category} />
        <DeleteCategoryButton category={category} />
      </ActionBox>

      <Link
        href={{
          pathname: `/${locale}/categories/${category.id}`,
        }}
        prefetch={true}
        className={
          "flex  items-center justify-center p-2 gap-2 text-gold border border-gold border-solid mb-2"
        }
      >
        <h3>{category.name}</h3>
      </Link>
    </section>
  );
};
