import { useHomePage } from "@/app/[locale]/_modules/hooks/useHomePage";
import { ListOfCategories } from "@/app/[locale]/_modules/components/ListOfCategories";
import React, { ReactNode } from "react";
import { AddCategoryBtn } from "@/app/[locale]/_modules/components/AddCategoryBtn";

export default function Home(): ReactNode {
  const pageData = React.use(useHomePage());
  const categories = pageData?.categories ?? [];
  const userId = pageData?.id ?? null;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ListOfCategories categories={categories} />
        <h1>HP</h1>
        <AddCategoryBtn userId={userId} />
      </main>
    </div>
  );
}
