import React, { ReactNode } from "react";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import Link from "next/link";
import { ActionBox } from "@/components/actionBox";
import { DeleteCategoryButton } from "@/app/[locale]/_modules/components/CategoryItemActions/DeleteCategory/DeleteCategoryButton";
import { UpdateCategoryButton } from "@/app/[locale]/_modules/components/CategoryItemActions/UpdateCategory/UpdateCategoryButton";

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
          pathname: `/${locale}/${category.id}`,
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
