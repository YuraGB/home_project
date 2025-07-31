import { ReactNode } from 'react';
import { TopRatedIcon } from './categoryIcons/TopRated';
import { EducationIcon } from './categoryIcons/EducationIcon';

export const CategoryIcon = ({
  categoryIconName,
}: {
  categoryIconName?: string | null;
}): ReactNode => {
  switch (categoryIconName) {
    case 'topRated':
      return <TopRatedIcon className="size-8 text-current" />;
    case 'education':
      return <EducationIcon className="size-8" />;
    default:
      return null;
  }
};
