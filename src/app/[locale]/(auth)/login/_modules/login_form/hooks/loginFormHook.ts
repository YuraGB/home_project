import { FieldValues, useForm, UseFormReturn } from "react-hook-form";

import { useValidationSchema } from "@/app/[locale]/(auth)/login/_modules/login_form/hooks/schema/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession, signIn } from "next-auth/react";
import { RefObject, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export const useLoginFormHook = (): {
  form: UseFormReturn;
  onSubmit: (values: FieldValues) => void;
  loading: RefObject<boolean>;
} => {
  const router = useRouter();
  const isLoading = useRef<boolean>(false);
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
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, session, status]);

  const onSubmit = async (values: FieldValues) => {
    isLoading.current = true;
    const resp = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (resp?.error) {
      isLoading.current = false;
      toast({
        title: "Error",
        variant: "destructive",
        description: resp.error,
      });
      form.setError("root.serverError", { type: "400", message: resp.error });
    }
  };

  return {
    form,
    onSubmit,
    loading: isLoading,
  };
};
