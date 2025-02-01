"use server";
import { db } from "@/db";
import { TUserSchema, usersTable } from "@/db/drizzle/schemas/userSchema";
import { z } from "zod";
import logger from "@/server/lib/logger";

const userToCreateValidation = z.object({
  salt: z.string(),
  hash: z.string(),
  email: z.string().email(),
  username: z.string(),
});

type TUserToSave = z.infer<typeof userToCreateValidation>;

export const createNewUser = async (
  user: TUserToSave,
): Promise<TUserSchema | null> => {
  try {
    const newUserData = userToCreateValidation.parse(user);
    const [createdUser] = await db
      .insert(usersTable)
      .values(newUserData)
      .returning() // Specify columns
      .execute();

    return createdUser;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    logger.error(`Error with creating user: ${JSON.stringify(user)}`);
    return null;
  }
};
