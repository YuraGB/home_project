"use client";
import { TPostWithRating } from "@/server/lib/formatPostData";
import { ReactNode } from "react";
import Link from "next/link";
import { useUpdateLastVisit } from "./hooks/useUpdateLastVisit";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

type TPostInfo = {
  post: TPostWithRating;
  children: ReactNode;
};
export const PostInfo = ({ post, children }: TPostInfo): ReactNode => {
  const { updateVisit } = useUpdateLastVisit();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={
            "z-[2] h-full relative bg-gradient-to-r from-transparent to-[#484848] py-1 px-2 items-center bg-green grid hover:brightness-110 hover:scale-105 transition-all duration-300 cursor-pointer  content-around"
          }
        >
          <Link
            href={post.url}
            target={"_blank"}
            rel={"noreferrer"}
            className={"z-[1] mt-auto"}
            onClick={() => updateVisit(post.id)}
            prefetch={true}
          >
            <h4
              className={
                "text-left text-gold text-2xl mt-auto truncate w-40 text-left"
              }
            >
              {post.name}
            </h4>
            {post.lastVisited ? (
              <p>Visited: {new Date(post.lastVisited).toLocaleDateString()}</p>
            ) : null}
          </Link>

          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{post.name}</p>
      </TooltipContent>
    </Tooltip>
  );
};
