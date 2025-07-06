import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { deletePost } from "@/server/services/post/deletePost";
import { deleteRating } from "@/server/services/rating/deleteRating";

export const deleteRelatedSubCatData = (relatedPosts: TDBPost[]): void => {
  Promise.allSettled(
    // Delete related posts
    relatedPosts.map(({ id }) => deletePost(id)),
  )
    // Delete posts rating
    .then((deletedPostsId) =>
      deletedPostsId
        .filter(
          (e): e is PromiseFulfilledResult<number | null> =>
            e.status === "fulfilled" && e.value !== null,
        )
        .map((el) => el.value) // Extract the `value`
        .forEach((id) => {
          if (id !== null) {
            deleteRating(id); // don't await. if error the logger will catch
          }
        }),
    );
};
