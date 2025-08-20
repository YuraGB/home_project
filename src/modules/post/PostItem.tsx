import { ReactNode, Suspense } from "react";

import dynamic from "next/dynamic";
import { TPostWithRating } from "@/server/lib/formatPostData";
import { PostInfo } from "@/modules/post/PostInfo";

const DeletePost = dynamic(() =>
  import("@/modules/post/DeletePost").then((mod) => mod.DeletePost),
);
const UpdatePost = dynamic(() =>
  import("@/modules/post/UpdatePost/UpdatePost").then((mod) => mod.UpdatePost),
);
const ActionBox = dynamic(() =>
  import("@/components/actionBox").then((mod) => mod.ActionBox),
);
const PostBackground = dynamic(() =>
  import("@/modules/post/PostBackground").then((mod) => mod.PostBackground),
);
const RatingComponent = dynamic(() =>
  import("@/modules/rating/RatingComponent").then((mod) => mod.RatingComponent),
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
      className={`relative rounded border overflow-hidden  ${className ?? ""} ${post.hasUpdates ? "hasUpdates pulse" : ""}`}
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
