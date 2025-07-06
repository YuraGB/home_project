"use client";
import { SubCategoryItem } from "@/modules/subCategory/components/SubCategoryList/SubCategoryItem";
import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import { ReactNode } from "react";
import { Slider } from "@/components/slider";
import { SwiperSlide } from "swiper/react";

export const SubCategoryList = ({
  sub_categories,
}: {
  sub_categories: TSubCategory[] | null;
}): ReactNode => {
  if (!sub_categories?.length) return null;
  const listOfSubCategories = sub_categories.map((item) => (
    <SwiperSlide key={item.id}>
      <SubCategoryItem item={item} />
    </SwiperSlide>
  ));

  return (
    <section className={"border-b relative max-w-full py-4 subCategory-slider"}>
      <Slider config={{ speed: 5000 }}>{listOfSubCategories}</Slider>
    </section>
  );
};
