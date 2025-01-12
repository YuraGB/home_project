import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/server/controllers/user/userService";
import { NewUser } from "@/app/[locale]/(auth)/registration/_modules/registration_form/hooks/schema/validationSchema";
import { useRouter } from "next/navigation";

export const useApiRegistration = () => {
  const router = useRouter();
  const {
    mutate: addNewUser,
    data: newUser,
    error: errorCreateNewUser,
  } = useMutation({
    mutationFn: async (data: NewUser) => await createUser(data),
    onSuccess: () => router.push("/"),
  });

  return {
    addNewUser,
    newUser,
    errorCreateNewUser,
  };
};
