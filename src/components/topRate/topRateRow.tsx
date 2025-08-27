"use client";
import { ReactNode } from "react";
import { TPostWithRating } from "@/server/lib/formatPostData";
import { Slider } from "@/components/slider";
import { SwiperSlide } from "swiper/react";
import { PostItem } from "@/modules/post/PostItem";

export const TopRateRow = ({
  posts,
  sliderCount,
}: {
  posts: Array<TPostWithRating>;
  sliderCount: string;
}): ReactNode => {
  console.log("Rendering TopRateRow with key:", sliderCount);
  return (
    <section className={"rate-row h-[130px] relative slider-container"}>
      <Slider
        navigation={{
          prevEl: `.arrow-container.left` + "." + sliderCount,
          nextEl: `.arrow-container.right` + "." + sliderCount,
          disabledClass: "swiper-button-disabled",
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <PostItem key={post.id} post={post} />
          </SwiperSlide>
        ))}
      </Slider>

      <div className={`arrow-container left ` + sliderCount}>
        <div className={`arrow`}></div>
        <div className={`arrow`}></div>
        <div className={`arrow`}></div>
      </div>
      <div className={`arrow-container right ` + sliderCount}>
        <div className={`arrow`}></div>
        <div className={`arrow`}></div>
        <div className={`arrow`}></div>
      </div>
    </section>
  );
};
