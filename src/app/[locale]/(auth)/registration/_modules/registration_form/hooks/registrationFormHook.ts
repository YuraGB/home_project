"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewUser,
  useNewUserValidationSchema,
} from "@/app/[locale]/(auth)/registration/_modules/registration_form/hooks/schema/validationSchema";
import { useApiRegistration } from "@/app/[locale]/(auth)/registration/_modules/api";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

export const useRegistrationForm = () => {
  const formSchema = useNewUserValidationSchema();
  const { addNewUser, newUser, errorCreateNewUser } = useApiRegistration();

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
        redirect: true,
        callbackUrl: "/",
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
