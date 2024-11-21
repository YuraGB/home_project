import { z } from "zod";
import { useIntl } from "react-intl";

export const validationNewUser = ({
  emailErrorMessage = "E-mail should be valid",
  passwordErrorMessage = "Password should be at least 8 characters",
  usernameErrorMessage = "User name should be longer then 2 characters",
}) =>
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
  });

export type NewUser = z.infer<typeof validationNewUser>;

export const useNewUserValidationSchema = (): NewUser => {
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
  return validationNewUser({
    usernameErrorMessage,
    emailErrorMessage,
    passwordErrorMessage,
  });
};
