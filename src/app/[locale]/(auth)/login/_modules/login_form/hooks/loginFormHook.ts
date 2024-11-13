import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Schema,
  useValidationSchema,
} from "@/app/[locale]/(auth)/login/_modules/login_form/hooks/schema/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useLoginFormHook = (): {
  form: UseFormReturn;
  onSubmit: (values: z.infer<typeof useValidationSchema>) => void;
} => {
  const formSchema = useValidationSchema();
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return {
    form,
    onSubmit,
  };
};
