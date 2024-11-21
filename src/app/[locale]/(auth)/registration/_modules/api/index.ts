import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/server/services/user/userService";
import { NewUser } from "@/app/[locale]/(auth)/registration/_modules/registration_form/hooks/schema/validationSchema";

export const useApiRegistration = () => {
  const {
    mutate: addNewUser,
    data: newUser,
    error: errorCreateNewUser,
  } = useMutation({
    mutationFn: async (data: NewUser) => await createUser(data),
  });

  return {
    addNewUser,
    newUser,
    errorCreateNewUser,
  };
};
