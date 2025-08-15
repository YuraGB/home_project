'use server';
import { db } from '@/db';
import { TUserSchema, usersTable } from '@/db/drizzle/schemas/userSchema';
import { eq } from 'drizzle-orm';
import logger from '@/server/lib/logger';

export const getUserByEmail = async (
  email: string,
): Promise<TUserSchema | null> => {
  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return user;
  } catch (error) {
    console.error('findUserByEmail', error);
    logger.error((error as Error).stack);
    return null;
  }
};
