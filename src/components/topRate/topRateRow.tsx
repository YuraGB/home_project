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
