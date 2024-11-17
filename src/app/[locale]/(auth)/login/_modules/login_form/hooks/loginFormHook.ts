import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Schema,
  useValidationSchema,
} from "@/app/[locale]/(auth)/login/_modules/login_form/hooks/schema/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export const useLoginFormHook = (): {
  form: UseFormReturn;
  onSubmit: (values: z.infer<typeof useValidationSchema>) => void;
} => {
  const formSchema = useValidationSchema();
  const { data: session, status } = useSession();
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    console.log(session, status);
  }, [session, status]);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    return signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return {
    form,
    onSubmit,
  };
};
