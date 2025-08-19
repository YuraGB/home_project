"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { useMutationApi } from "@/hooks/apiCalls/mutation";
import { createUser } from "@/server/controllers/user/userService";
import { TUserSchema } from "@/db/drizzle/schemas/userSchema";
import { useRouter } from "next/navigation";
import { NewUser, useNewUserValidationSchema } from "./schema/validationSchema";

export const useRegistrationForm = () => {
  const isLoading = useRef<boolean>(false);
  const {
    mutate: addNewUser,
    data: newUser,
    error: errorCreateNewUser,
  } = useMutationApi<NewUser, TUserSchema | null>(createUser);

  const router = useRouter();
  const { data: session, status } = useSession();

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
      isLoading.current = false;
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
      isLoading.current = false;
      signIn("credentials", {
        redirect: false,
        id: newUser.id,
        email: newUser.email,
      });
    }
  }, [newUser]);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, session, status]);

  const onSubmit = async (values: NewUser) => {
    isLoading.current = true;
    addNewUser(values);
  };

  return {
    form,
    onSubmit,
    loading: isLoading,
  };
};
