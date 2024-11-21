"use client";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//

import { useNewUserValidationSchema } from "@/app/[locale]/(auth)/registration/_modules/registration_form/hooks/schema/validationSchema";
import { useApiRegistration } from "@/app/[locale]/(auth)/registration/_modules/api";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

export const useRegistrationForm = (): {
  form: UseFormReturn;
  onSubmit: (values: FieldValues) => void;
} => {
  const formSchema = useNewUserValidationSchema();
  const { addNewUser, newUser, errorCreateNewUser } = useApiRegistration();

  const form = useForm<FieldValues>({
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

  const onSubmit = async (values: FieldValues) => {
    addNewUser(values);
  };

  return {
    form,
    onSubmit,
  };
};
