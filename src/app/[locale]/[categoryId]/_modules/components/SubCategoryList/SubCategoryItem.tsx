"use client";
import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ActionBox } from "@/components/actionBox";
import { UpdateSubCategoryButton } from "@/app/[locale]/[categoryId]/_modules/components/UpdateSubCategory/UpdateSubCategoryButton";
import { DeleteSubCategoryButton } from "@/app/[locale]/[categoryId]/_modules/components/DeleteSubCategory/DeleteSubCategory";

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
        " relative border h-[100px] px-2 w-[200px] max-w-[200px] rounded items-center flex justify-center bg-gradient-to-r from-green from-80%  to-lightGreen to-95%"
      }
    >
      <ActionBox>
        <UpdateSubCategoryButton subCategory={item} />
        <DeleteSubCategoryButton subCategory={item} />
      </ActionBox>

      <Link href={`${pathName}/subCategory/${item.id}`} className={"text-gold"}>
        {item.name}
      </Link>
    </div>
  );
};
