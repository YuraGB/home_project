import { ReactNode } from "react";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";

export const CategoryItem = ({
  category,
}: {
  category: TCategory;
}): ReactNode => {
  return (
    <section>
      <h3>{category.name}</h3>
    </section>
  );
};
