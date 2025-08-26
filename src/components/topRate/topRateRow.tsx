"use client";
import { ReactNode, useRef } from "react";
import { TPostWithRating } from "@/server/lib/formatPostData";
import { Slider } from "@/components/slider";
import { SwiperSlide } from "swiper/react";
import { PostItem } from "@/modules/post/PostItem";

export default function Arrows() {
  return (
    <div className="arrows-wrapper">
      {/* Стрілка вліво */}
      <a href="#" className="arrow-container arrow-left">
        <div className="arrow"></div>
        <div className="arrow"></div>
        <div className="arrow"></div>
      </a>

      {/* Стрілка вправо */}
      <a href="#" className="arrow-container arrow-right">
        <div className="arrow"></div>
        <div className="arrow"></div>
        <div className="arrow"></div>
      </a>
    </div>
  );
}

export const TopRateRow = ({
  posts,
}: {
  posts: Array<TPostWithRating>;
}): ReactNode => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <section className={"rate-row h-[130px] relative slider-container"}>
      <Slider>
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <PostItem key={post.id} post={post} />
          </SwiperSlide>
        ))}
      </Slider>
      {/* Custom Arrows */}
      <div ref={prevRef} className="arrow-container left">
        <div className="arrow"></div>
        <div className="arrow"></div>
        <div className="arrow"></div>
      </div>
      <div ref={nextRef} className="arrow-container right">
        <div className="arrow"></div>
        <div className="arrow"></div>
        <div className="arrow"></div>
      </div>
    </section>
  );
};
