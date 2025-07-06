import React, { ReactNode, Suspense } from "react";
import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";
import { ActionWrapper } from "@/modules/category/components/ActionWrapper";
import { ListOfCategories } from "@/modules/category/components/ListOfCategories";

export type TLocaleParams = { params: Promise<{ locale: string }> };

// export const experimental_ppr = true;

export default function Home({ params }: Readonly<TLocaleParams>): ReactNode {
  return (
    <DefaultPageLayout>
      <Suspense fallback={"Loading"}>
        <ActionWrapper />
      </Suspense>
      <Suspense fallback={"Loading"}>
        <ListOfCategories params={params} />
      </Suspense>
    </DefaultPageLayout>
  );
}
