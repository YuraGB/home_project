import { ReactNode } from "react";
import { TPostWithRating } from "@/server/lib/formatPostData";
import { PostItem } from "@/app/_modules/Posts/PostItem";
import { Slider } from "@/components/slider";
import { SwiperSlide } from "swiper/react";

export const TopRateRow = ({
  posts,
}: {
  posts: Array<TPostWithRating>;
}): ReactNode => {
  return (
    <section className={"rate-row h-[130px]"}>
      <Slider>
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <PostItem key={post.id} post={post} />
          </SwiperSlide>
        ))}
      </Slider>
    </section>
  );
};
