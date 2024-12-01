import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { ReactNode } from "react";

export const PostItem = ({ post }: { post: TDBPost }): ReactNode => {
  return <div>{post.name}</div>;
};
