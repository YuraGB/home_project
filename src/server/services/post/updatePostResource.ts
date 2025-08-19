import logger from "@/server/lib/logger";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { postsSchema } from "@/db/drizzle/schemas/postsSchema";
import { usersTable } from "@/db/drizzle/schemas/userSchema";

export const updatePostResource = async ({
  postId,
  apiKey,
}: {
  postId: number;
  apiKey: string;
}): Promise<boolean | null> => {
  const updated = await db
    .update(postsSchema)
    .set({ hasUpdates: true })
    .where(
      and(
        eq(postsSchema.id, postId),
        eq(
          postsSchema.userId,
          db
            .select({ id: usersTable.id })
            .from(usersTable)
            .where(eq(usersTable.apikey, apiKey)),
        ),
      ),
    )
    .returning();

  if (updated.length === 0) {
    logger.error("Post not found or API key invalid");
    throw new Error("Post not found or API key invalid");
  }

  return !!updated[0];
};
