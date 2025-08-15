import React, { ReactNode } from 'react';
import { TCategory } from '@/db/drizzle/schemas/categorySchema';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { CategoryIcon } from './CategoryIcon';

const ActionBox = dynamic(() =>
  import('@/components/actionBox').then((mod) => mod.ActionBox),
);

const DeleteCategoryButton = dynamic(() =>
  import(
    '@/modules/category/components/CategoryItemActions/DeleteCategory/DeleteCategoryButton'
  ).then((mod) => mod.DeleteCategoryButton),
);

const UpdateCategoryButton = dynamic(() =>
  import(
    '@/modules/category/components/CategoryItemActions/UpdateCategory/UpdateCategoryButton'
  ).then((mod) => mod.UpdateCategoryButton),
);

export const CategoryItem = ({
  category,
  locale,
}: {
  category: TCategory;
  locale: string;
}): ReactNode => {
  if (!category.id) return null;

  return (
    <section className="rounded relative bg-gradient-to-r from-transparent to-[#7392b3]">
      <ActionBox>
        <UpdateCategoryButton category={category} />
        <DeleteCategoryButton category={category} />
      </ActionBox>

      <Link
        href={{
          pathname: `/${locale}/categories/${category.id}`,
        }}
        prefetch={true}
        className="flex items-center justify-end p-2 gap-2 text-white border border-darkGold border-solid mb-2 rounded-sm hover:bg-darkGold hover:text-white transition-colors duration-300"
      >
        <h3 className="p-5 pb-2 mb-2 w-full border-b-2 border-white border-solid flex items-end justify-between gap-2">
          <CategoryIcon categoryIconName={category.categoryIcon} />
          {category.name}
        </h3>
      </Link>
    </section>
  );
};
