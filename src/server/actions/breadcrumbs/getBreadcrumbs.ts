import { getCatalogById } from "@/server/actions/catalog/getCategory";
import { db } from "@/db";
import {
  subCategoriesSchema,
  TSubCategory,
} from "@/db/drizzle/schemas/subCategoriesSchema";
import { eq } from "drizzle-orm";
import { categorySchema, TCategory } from "@/db/drizzle/schemas/categorySchema";

export type TBreadcrumbs = {
  sub_categories: TSubCategory | null;
  categories: TCategory | null;
}[];

export const getBreadcrumbs = async ({
  catalogId,
  subCategoryId,
}: {
  catalogId?: number;
  subCategoryId?: number;
}): Promise<TBreadcrumbs | null> => {
  if (catalogId) {
    if (subCategoryId) {
      const results = await db
        .select()
        .from(subCategoriesSchema)
        .leftJoin(categorySchema, eq(categorySchema.id, catalogId))
        .where(eq(subCategoriesSchema.id, subCategoryId));
      // Transform results to match TBreadcrumbs
      const breadcrumbs: TBreadcrumbs = results.map((result) => ({
        sub_categories: result.sub_categories || null,
        categories: result.categories || null,
      }));

      return breadcrumbs;
    }

    const catalog = await getCatalogById(catalogId);

    // Handle the return type for catalog if needed
    return catalog?.map((item) => ({
      sub_categories: null,
      categories: item,
    })) as TBreadcrumbs;
  }

  return null;
};
