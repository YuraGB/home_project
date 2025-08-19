"use client";
import { TPostWithRating } from "@/server/lib/formatPostData";
import { ReactNode } from "react";
import Link from "next/link";
import { useUpdateLastVisit } from "./hooks/useUpdateLastVisit";

type TPostInfo = {
  post: TPostWithRating;
  children: ReactNode;
};
export const PostInfo = ({ post, children }: TPostInfo): ReactNode => {
  const { updateVisit } = useUpdateLastVisit();
  return (
    <div
      className={
        "z-[2] h-full relative bg-gradient-to-r from-transparent to-[#484848] py-1 px-2 items-center bg-green"
      }
    >
      <Link
        href={post.url}
        target={"_blank"}
        rel={"noreferrer"}
        className={"z-[1] mt-auto"}
        onClick={() => updateVisit(post.id)}
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
