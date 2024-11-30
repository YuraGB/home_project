import { z } from "zod";
import { useIntl } from "react-intl";

export const validationNewUser = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(2),
});

export type NewUser = z.infer<typeof validationNewUser>;

export const useNewUserValidationSchema = () => {
  const { formatMessage } = useIntl();

  // translations for error messages
  const emailErrorMessage = formatMessage({
    defaultMessage: "E-mail should be valid",
    id: "emailErrorMessage",
  });
  const passwordErrorMessage = formatMessage({
    defaultMessage: "Password should be at least 8 characters",
    id: "passwordErrorMessage",
  });
  const usernameErrorMessage = formatMessage({
    defaultMessage: "User name should be longer then 2 characters",
    id: "usernameErrorMessage",
  });

  // validation
  return validationNewUser.merge(
    z.object({
      email: z.string().email({
        message: emailErrorMessage,
      }),
      password: z.string().min(8, {
        message: passwordErrorMessage,
      }),
      username: z.string().min(2, {
        message: usernameErrorMessage,
      }),
    }),
  );
};
