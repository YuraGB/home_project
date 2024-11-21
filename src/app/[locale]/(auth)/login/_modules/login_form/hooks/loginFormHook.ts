import { FieldValues, useForm, UseFormReturn } from "react-hook-form";

import { useValidationSchema } from "@/app/[locale]/(auth)/login/_modules/login_form/hooks/schema/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

// type TLoginFormValues = {
//   email: string | undefined;
//   password: string | undefined;
// };

export const useLoginFormHook = (): {
  form: UseFormReturn;
  onSubmit: (values: FieldValues) => void;
} => {
  const formSchema = useValidationSchema();
  const { data: session, status } = useSession();
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    console.log(session, status);
  }, [session, status]);

  const onSubmit = (values: FieldValues) => {
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
