"use client";
import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const SubCategoryItem = ({
  item,
}: {
  item: TSubCategory | null;
}): ReactNode => {
  const pathName = usePathname();
  if (!item) return null;
  return (
    <div>
      <Link href={`${pathName}/subCategory/${item.id}`}>{item.name}</Link>
    </div>
  );
};
