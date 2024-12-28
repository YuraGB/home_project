import { ReactNode } from "react";
const RatingComponent = dynamic(() =>
  import(
    "@/app/[locale]/[categoryId]/_modules/components/PostsList/RatingComponent"
  ).then((mod) => mod.RatingComponent),
);
import dynamic from "next/dynamic";
import Link from "next/link";
import { TPostWithRating } from "@/lib/formatPostData";

export const PostItem = ({
  post,
  className,
  style,
}: {
  post: TPostWithRating;
  className?: string;
  style?: { [key: string]: string | number };
}): ReactNode => {
  return (
    <div
      style={style}
      className={`rounded border h-20 grid w-[300px] grid-rows-[1fr,25px] items-center justify-items-end p-2  bg-gradient-to-r from-transparent to-green bg-cover bg-left-top ${className}`}
    >
      <Link href={post.url} target={"_blank"} rel={"noreferrer"}>
        <h4 className={"text-center text-2xl mt-auto"}>{post.name}</h4>
      </Link>
      {post.rate ? <RatingComponent rate={post.rate} /> : null}
    </div>
  );
};
