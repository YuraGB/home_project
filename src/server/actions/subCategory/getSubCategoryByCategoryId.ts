import { db } from "@/db";
import { subCategoriesSchema } from "@/db/drizzle/schemas/subCategoriesSchema";
import { eq } from "drizzle-orm";
import { postsSchema } from "@/db/drizzle/schemas/postsSchema";
import logger from "@/lib/logger";
import { ratingTable } from "@/db/drizzle/schemas/ratingSchema";
import { TSubReturnType } from "@/server/actions/subCategory/types";
import { formatDataHelper } from "@/server/actions/subCategory/formatHelper";

export const getSubCategoryById = async (
  id: number,
): Promise<TSubReturnType | [] | null> => {
  try {
    const results = await db
      .select()
      .from(subCategoriesSchema)
      .leftJoin(postsSchema, eq(postsSchema.subCategoryId, id))
      .leftJoin(ratingTable, eq(ratingTable.postId, postsSchema.id))
      .where(eq(subCategoriesSchema.id, id));

    return formatDataHelper(results);
  } catch (e) {
    logger.error((e as Error).stack);
    return [];
  }
};
