"use server";
import { db } from "@/db";
import { usersTable } from "@/db/drizzle/schemas/userSchema";
import { eq } from "drizzle-orm";
import { User } from "next-auth";
import logger from "@/lib/logger";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return user;
  } catch (error) {
    console.error("findUserByEmail", error);
    logger.error((error as Error).stack);
    return null;
  }
};
