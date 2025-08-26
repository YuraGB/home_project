"use client";
import { ReactNode } from "react";
import { TPostWithRating } from "@/server/lib/formatPostData";
import { Slider } from "@/components/slider";
import { SwiperSlide } from "swiper/react";
import { PostItem } from "@/modules/post/PostItem";

export const TopRateRow = ({
  posts,
}: {
  posts: Array<TPostWithRating>;
}): ReactNode => {
  return (
    <section className={"rate-row h-[130px] relative slider-container"}>
      <Slider
        navigation={{
          prevEl: ".arrow-container.left",
          nextEl: ".arrow-container.right",
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <PostItem key={post.id} post={post} />
          </SwiperSlide>
        ))}
      </Slider>

      <div className="arrow-container left">
        <div className="arrow"></div>
        <div className="arrow"></div>
        <div className="arrow"></div>
      </div>
      <div className="arrow-container right">
        <div className="arrow"></div>
        <div className="arrow"></div>
        <div className="arrow"></div>
      </div>
    </section>
  );
};
