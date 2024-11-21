"use server";
import { NewUser } from "@/app/[locale]/(auth)/registration/_modules/registration_form/hooks/schema/validationSchema";
import { getUserByEmail } from "@/server/actions/user/getUserByEmail";
import { generatePassword } from "@/lib/crypto";
import { createNewUser } from "@/server/actions/user/newUser";

export const createUser = async (data: NewUser) => {
  const { email, password, username } = data;
  const isUserNew = await getUserByEmail(email);

  if (isUserNew) {
    throw new Error("The user with such email already exist");
  }

  const { salt, hash } = generatePassword(password);
  try {
    return await createNewUser({
      name: username,
      salt,
      hash,
      email,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new Error("The problem with saving new user, please try it later");
  }
};
