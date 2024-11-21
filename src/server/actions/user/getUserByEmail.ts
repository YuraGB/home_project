"use server";
import { db } from "@/db";
import { usersTable } from "@/db/drizzle/schemas/userSchema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    console.log("fire");
    return user;
  } catch (error) {
    console.error("findUserByEmail", error);
    return null;
  }
};
