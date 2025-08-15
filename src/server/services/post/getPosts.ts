import { db } from '@/db';
import { postsSchema, TDBPost } from '@/db/drizzle/schemas/postsSchema';
import { usersTable } from '@/db/drizzle/schemas/userSchema';
import logger from '@/server/lib/logger';
import { eq } from 'drizzle-orm';

/**
 * Retrieves all posts from the database based on the provided API key.
 * @param apiKey - The API key to authenticate the request.
 * @returns A promise that resolves to an array of posts or null if no posts are found.
 */
export const getAllPostsService = async (
  apiKey: string,
): Promise<TDBPost[] | null> => {
  try {
    const [user] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.apikey, apiKey));

    if (!user) {
      return null;
    }

    const result = await db
      .select()
      .from(postsSchema)
      .where(eq(postsSchema.userId, user.id));

    return result;
  } catch (error) {
    logger.error('Error fetching all posts:', error);
    return null;
  }
};
