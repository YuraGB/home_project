"use server";
import { getUserByEmail } from "@/server/services/user/getUserByEmail";
import { generateApiKeyCrypto, generatePassword } from "@/server/lib/crypto";
import { createNewUser } from "@/server/services/user/newUser";
import logger from "@/server/lib/logger";
import { NewUser } from "@/modules/auth/registrayion/registration_form/hooks/schema/validationSchema";
import { updateUser } from "@/server/services/user/updateUser";

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

export const getApiKey = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    logger.error(`There is no such user with email: ${email}`);
    throw new Error("User not found");
  }

  return user.apikey;
};

export const generateApiKey = async (email: string) => {
  const apiKey = generateApiKeyCrypto();

  if (!apiKey) {
    logger.error(`Failed to generate API key for user with email: ${email}`);
    throw new Error("Failed to generate API key, please try again later");
  }

  try {
    const user = await updateUser(email, { apikey: apiKey });

    if (!user) {
      logger.error(
        `Failed to save user with email: ${email} and API key: ${apiKey}`,
      );
      throw new Error("User not found or update failed");
    }

    return user;
  } catch (e) {
    logger.error((e as Error).stack);
    throw new Error("Failed to save API key, please try again later");
  }
};

export const deleteApiKey = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    logger.error(`There is no such user with email: ${email}`);
    throw new Error("User not found");
  }

  if (!user.apikey) {
    logger.warn(`User with email: ${email} does not have an API key to delete`);
    return;
  }

  user.apikey = null;

  // try {
  //   await user.save();
  // } catch (e) {
  //   logger.error((e as Error).stack);
  //   throw new Error("Failed to delete API key, please try again later");
  // }
};
