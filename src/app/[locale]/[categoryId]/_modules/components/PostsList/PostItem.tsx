import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { ReactNode } from "react";
const RatingComponent = dynamic(() =>
  import(
    "@/app/[locale]/[categoryId]/_modules/components/PostsList/RatingComponent"
  ).then((mod) => mod.RatingComponent),
);
import { TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";
import dynamic from "next/dynamic";
import Link from "next/link";

export const PostItem = ({
  post,
  rate,
}: {
  post: TDBPost;
  rate: TRatingSchema | null;
}): ReactNode => {
  return (
    <div
      className={
        "rounded border h-20 grid grid-rows-[1fr,25px] items-center justify-items-end p-2  bg-gradient-to-r from-transparent to-green bg-cover bg-left-top"
      }
    >
      <Link href={post.url} target={"_blank"} rel={"noreferrer"}>
        <h4 className={"text-center text-2xl mt-auto"}>{post.name}</h4>
        {rate ? <RatingComponent rate={rate} /> : null}
      </Link>
    </div>
  );
};
