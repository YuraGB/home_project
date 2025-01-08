import { ReactNode, Suspense } from "react";

import dynamic from "next/dynamic";
import { TPostWithRating } from "@/lib/formatPostData";
import { UpdatePost } from "@/app/_modules/Posts/UpdatePost/UpdatePost";
import { PostInfo } from "@/app/_modules/Posts/PostInfo";
import { DeletePost } from "@/app/_modules/Posts/DeletePost";

const ActionBox = dynamic(() =>
  import("@/components/actionBox").then((mod) => mod.ActionBox),
);

const PostBackground = dynamic(() =>
  import("@/app/_modules/Posts/PostBackground").then(
    (mod) => mod.PostBackground,
  ),
);
const RatingComponent = dynamic(() =>
  import("@/app/_modules/Rating/RatingComponent").then(
    (mod) => mod.RatingComponent,
  ),
);

export const PostItem = ({
  post,
  className,
  style,
}: {
  post: TPostWithRating;
  className?: string;
  style?: { [key: string]: string | number };
}): ReactNode => {
  const hasImage = !!post.image;
  const wrapperClass: string = `${hasImage ? "hovered" : ""} max-w-[300px] min-w-[300px] h-[100px] relative items-center justify-items-end  bg-gradient-to-r from-transparent to-[#484848] bg-cover bg-left-top`;

  return (
    <div
      className={`rounded border overflow-hidden  ${className ?? ""}`}
      style={style}
    >
      <div className={wrapperClass}>
        <ActionBox>
          <DeletePost post={post} />
          <UpdatePost post={post} />
        </ActionBox>

        <PostInfo post={post}>
          <Suspense fallback={null}>
            {post.rate ? <RatingComponent rate={post.rate} /> : null}
          </Suspense>
        </PostInfo>

        <Suspense fallback={null}>
          <PostBackground image={post.image} />
        </Suspense>
      </div>
    </div>
  );
};
