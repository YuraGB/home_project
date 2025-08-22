import React, { ReactNode } from "react";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import Link from "next/link";
import dynamic from "next/dynamic";
import { CategoryIcon } from "./CategoryIcon";
import cssStyles from "./styles/category.module.css";

const ActionBox = dynamic(() =>
  import("@/components/actionBox").then((mod) => mod.ActionBox),
);

const DeleteCategoryButton = dynamic(() =>
  import(
    "@/modules/category/components/CategoryItemActions/DeleteCategory/DeleteCategoryButton"
  ).then((mod) => mod.DeleteCategoryButton),
);

const UpdateCategoryButton = dynamic(() =>
  import(
    "@/modules/category/components/CategoryItemActions/UpdateCategory/UpdateCategoryButton"
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
    <section className={cssStyles.card}>
      <ActionBox>
        <UpdateCategoryButton category={category} />
        <DeleteCategoryButton category={category} />
      </ActionBox>

      <Link
        href={{
          pathname: `/${locale}/categories/${category.id}`,
        }}
        prefetch={true}
        className="z-10 flex items-center justify-end p-2 gap-2 text-white rounded-sm hover:text-slate-300 transition-colors duration-300"
      >
        <h3 className="p-5 pb-2 mb-2 w-full border-b-2 border-transparent border-solid flex items-end justify-between gap-2">
          <CategoryIcon
            categoryIconName={category.categoryIcon}
            classes={cssStyles.icon}
          />
          {category.name}
        </h3>
      </Link>
    </section>
  );
};
