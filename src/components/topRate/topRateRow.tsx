"use client";
import { ReactNode } from "react";
import { TPostWithRating } from "@/server/lib/formatPostData";
import { Slider } from "@/components/slider";
import { SwiperSlide } from "swiper/react";
import { PostItem } from "@/modules/post/PostItem";
import classes from "@/components/topRate/style/topRated.module.css";

export const TopRateRow = ({
  posts,
}: {
  posts: Array<TPostWithRating>;
}): ReactNode => {
  return (
    <section className={"rate-row h-[130px] relative slider-container"}>
      <Slider
        navigation={{
          prevEl: `.${classes.container}.${classes.left}`,
          nextEl: `.${classes.container}.${classes.right}`,
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <PostItem key={post.id} post={post} />
          </SwiperSlide>
        ))}
      </Slider>

      <div className={`${classes.container} ${classes.left}`}>
        <div className={`${classes.arrow}`}></div>
        <div className={`${classes.arrow}`}></div>
        <div className={`${classes.arrow}`}></div>
      </div>
      <div className={`${classes.container} ${classes.right}`}>
        <div className={`${classes.arrow}`}></div>
        <div className={`${classes.arrow}`}></div>
        <div className={`${classes.arrow}`}></div>
      </div>
    </section>
  );
};
