"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewUser,
  useNewUserValidationSchema,
} from "@/app/[locale]/(auth)/registration/_modules/registration_form/hooks/schema/validationSchema";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useMutationApi } from "@/hooks/apiCalls/mutation";
import { createUser } from "@/server/services/user/userService";
import { TUserSchema } from "@/db/drizzle/schemas/userSchema";

export const useRegistrationForm = () => {
  const {
    mutate: addNewUser,
    data: newUser,
    error: errorCreateNewUser,
  } = useMutationApi<NewUser, TUserSchema | null>(createUser);

  const formSchema = useNewUserValidationSchema();
  const form = useForm<NewUser>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  // catch error during creating new user
  useEffect(() => {
    if (errorCreateNewUser) {
      form.setError(
        "email",
        {
          message: errorCreateNewUser.message,
        },
        {
          shouldFocus: true,
        },
      );
    }
  }, [errorCreateNewUser, form]);

  // sign in and redirect to the home page
  useEffect(() => {
    if (newUser) {
      signIn("credentials", {
        redirect: false,
        id: newUser.id,
        email: newUser.email,
      });
    }
  }, [newUser]);

  const onSubmit = async (values: NewUser) => {
    addNewUser(values);
  };

  return {
    form,
    onSubmit,
  };
};
