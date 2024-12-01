import { useHomePage } from "@/app/[locale]/_modules/hooks/useHomePage";
import { ListOfCategories } from "@/app/[locale]/_modules/components/ListOfCategories";
import React, { ReactNode } from "react";
import { AddCategoryBtn } from "@/app/[locale]/_modules/components/AddCategoryBtn";

type TParams = { params: Promise<{ locale: string }> };

export default function Home({ params }: Readonly<TParams>): ReactNode {
  const pageData = React.use(useHomePage());
  const categories = pageData?.categories ?? [];
  const userId = pageData?.id ?? null;
  const { locale } = React.use(params);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ListOfCategories categories={categories} locale={locale} />
        <AddCategoryBtn userId={userId} />
      </main>
    </div>
  );
}
