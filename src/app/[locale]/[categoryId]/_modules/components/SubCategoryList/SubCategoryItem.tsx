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
    <div
      className={
        "border h-[100px] px-2 w-[200px] max-w-[200px] rounded items-center flex justify-center bg-gradient-to-r from-green from-80%  to-lightGreen to-95%"
      }
    >
      <Link href={`${pathName}/subCategory/${item.id}`} className={"text-gold"}>
        {item.name}
      </Link>
    </div>
  );
};
