import React, { ReactNode } from "react";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import Link from "next/link";

export const CategoryItem = ({
  category,
  locale,
}: {
  category: TCategory;
  locale: string;
}): ReactNode => {
  if (!category.id) return null;
  return (
    <section>
      <Link
        href={{
          pathname: `/${locale}/${category.id}`,
        }}
        prefetch={false}
        className={
          "flex rounded-sm items-center justify-center p-2 gap-2 border-2 border-grey border-solid mb-2"
        }
      >
        <h3>{category.name}</h3>
      </Link>
    </section>
  );
};
