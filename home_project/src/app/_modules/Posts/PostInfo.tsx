import { TPostWithRating } from "@/lib/formatPostData";
import { ReactNode } from "react";
import Link from "next/link";

type TPostInfo = {
  post: TPostWithRating;
  children: ReactNode;
};
export const PostInfo = ({ post, children }: TPostInfo): ReactNode => {
  return (
    <div
      className={`z-[2] h-full relative bg-gradient-to-r from-transparent to-[#484848] py-1 px-2 items-center bg-green`}
    >
      <Link
        href={post.url}
        target={"_blank"}
        rel={"noreferrer"}
        className={"z-[1] mt-auto"}
      >
        <h4
          className={
            "text-left text-gold text-2xl mt-auto truncate w-40 text-left"
          }
        >
          {post.name}
        </h4>
        <p>{post.description}</p>
      </Link>

      {children}
    </div>
  );
};
