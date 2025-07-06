import { TPostResources } from "@/db/drizzle/schemas/postResourses";
import { getResources } from "@/server/services/postResources/getPostResources";
import { TAddResource } from "@/server/controllers/postResources/types";
import { addPostResources } from "@/server/services/postResources/addPostResources";

export const getPostResources = async (
  postId: number,
): Promise<TPostResources[] | []> => {
  return await getResources(postId);
};

export const createNewPostResources = async (data: TAddResource[]) => {
  return await Promise.all(
    data.map((res) => addPostResources(res.postId, res.url)),
  );
};
