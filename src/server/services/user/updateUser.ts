import { TUserSchema, usersTable } from '@/db/drizzle/schemas/userSchema';
import logger from '@/server/lib/logger';
import { getUserByEmail } from './getUserByEmail';
import { eq } from 'drizzle-orm';
import { db } from '@/db';

/**
 * Updates a user's information in the database.
 * @param email - The email of the user to update.
 * @param updates - An object containing the fields to update.
 * @returns The updated user object.
 * @throws Error if the user is not found or if the update fails.
 */
export const updateUser = async (
  email: string,
  updates: Partial<TUserSchema>,
) => {
  const user = await getUserByEmail(email);

  if (!user) {
    logger.error(`User with email: ${email} not found`);
    throw new Error('User not found');
  }

  try {
    const [user] = await db
      .update(usersTable)
      .set(updates)
      .where(eq(usersTable.email, email))
      .returning();

    if (!user) {
      logger.error(`Failed to update user with email: ${email}`);
      throw new Error('User not found or update failed');
    }
    return user;
  } catch (error) {
    logger.error(`Failed to update user with email: ${email}`, error);
    throw new Error('Failed to update user, please try again later');
  }
};
