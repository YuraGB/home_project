import { getPostsByEntityId } from "@/server/actions/post/getAllPostsByEntityId";
import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { TCreatePostData, TFindPost } from "@/server/services/post/types";
import {
  creatingPostValidationData,
  postValidationSchema,
} from "@/server/services/post/validationSchemas";
import { addNewPost } from "@/server/actions/post/addNewPost";

class PostService {
  public async getPosts(data: TFindPost): Promise<TDBPost[] | null> {
    const entry = Object.entries(data)[0];

    if (!entry) {
      throw new Error("No search criteria provided");
    }

    postValidationSchema.parse(data);

    return await getPostsByEntityId(entry);
  }

  public async createPost(data: TCreatePostData) {
    const validatedData = creatingPostValidationData.parse(data);

    return await addNewPost(validatedData);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PostService();
