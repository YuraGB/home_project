"use server";
import { getUserByEmail } from "@/server/services/user/getUserByEmail";
import { generatePassword } from "@/server/lib/crypto";
import { createNewUser } from "@/server/services/user/newUser";
import logger from "@/server/lib/logger";
import { NewUser } from "@/modules/auth/registrayion/registration_form/hooks/schema/validationSchema";

export const createUser = async (data: NewUser) => {
  const { email, password, username } = data;
  const isUserNew = await getUserByEmail(email);

  if (isUserNew) {
    logger.error(`There is no such user with email: ${email}`);
    throw new Error("The user with such email already exist");
  }

  const { salt, hash } = generatePassword(password);
  try {
    return await createNewUser({
      username,
      salt,
      hash,
      email,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    logger.error((e as Error).stack);
    throw new Error("The problem with saving new user, please try again later");
  }
};
