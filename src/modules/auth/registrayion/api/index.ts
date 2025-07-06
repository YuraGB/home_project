import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/server/controllers/user/userService";
import { useRouter } from "next/navigation";
import { NewUser } from "../registration_form/hooks/schema/validationSchema";

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
