import { deleteRating } from "@/server/services/rating/deleteRating";
import { deleteSubCategory } from "@/server/services/subCategory/deleteSubCategory";
import { TCategoryReturnType } from "@/server/services/catalog/getCatalogByUserIDWithData";
import { deletePost } from "@/server/services/post/deletePost";
import logger from "@/server/lib/logger";

export const deleteAllRelations = (relatObj: TCategoryReturnType): void => {
  const { rating = [], sub_categories = [], posts = [], categories } = relatObj;
  const delRats = rating
    ? rating.map(({ id }: { id: number }) => deleteRating(id))
    : [];
  const delSubs = sub_categories
    ? sub_categories.map(({ id }: { id: number }) => deleteSubCategory(id))
    : [];
  const delPosts = posts
    ? posts.map(({ id }: { id: number }) => deletePost(id))
    : [];

  const promises = [delRats, delSubs, delPosts];

  Promise.allSettled(promises).then((results) => {
    logger.info(`The relations of the category:
      -id:${categories.id} 
      -name:${categories.name} 
     were deleted. The relations: 
        - sub category: ${results[1].status};
        - posts: ${results[2].status};
        - ratings: ${results[0].status};`);
  });
};
