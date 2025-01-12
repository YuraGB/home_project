import { getBreadcrumbs } from "@/server/services/breadcrumbs/getBreadcrumbs";

export const breadcrumbsService = async ({
  catalogId,
  subCategoryId,
}: {
  catalogId?: number | string;
  subCategoryId?: number | string;
}) => {
  const object = {
    catalogId: catalogId ? Number(catalogId) : undefined,
    subCategoryId: subCategoryId ? Number(subCategoryId) : undefined,
  };

  const data = await getBreadcrumbs(object);

  if (data) {
    return data.reduce(
      (acc, currentValue) => {
        if (currentValue.categories) {
          acc.unshift({
            name: currentValue.categories.name,
            url: currentValue.categories.id,
          });
        }

        if (currentValue.sub_categories) {
          acc.push({
            name: currentValue.sub_categories.name,
            url: currentValue.sub_categories.id,
          });
        }

        return acc;
      },
      [] as { name: string; url: number }[],
    );
  }
};
