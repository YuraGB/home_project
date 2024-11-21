"use server";
import { db } from "@/db";
import { usersTable } from "@/db/drizzle/schemas/userSchema";

export const createNewUser = async (user) => {
  try {
    const [createdUser] = await db
      .insert(usersTable)
      .values(user)
      .returning() // Specify columns
      .execute();

    return createdUser;
  } catch (error) {
    console.error("createdUser", error);
    return null;
  }
};
