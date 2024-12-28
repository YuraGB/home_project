import { ReactNode } from "react";
import { TPostWithRating } from "@/lib/formatPostData";
import { PostItem } from "@/app/[locale]/[categoryId]/_modules/components/PostsList/PostItem";

export const TopRateRow = ({
  posts,
}: {
  posts: Array<TPostWithRating>;
}): ReactNode => {
  const isSlider = posts.length > 3;

  return (
    <section className={"flex flex-row gap-2 py-2 rate-row h-[100px]"}>
      <div
        className={`flex w-full gap-2 relative overflow-hidden align-items-center ${isSlider ? "sliderAutoRun" : ""}`}
      >
        {posts.map((post, index) => (
          <PostItem
            key={post.id}
            post={post}
            className={isSlider ? "absolute autoRun" : ""}
            style={
              isSlider
                ? {
                    "--position": index,
                    "--quantity": posts.length,
                  }
                : {}
            }
          />
        ))}
      </div>
    </section>
  );
};
