import { z } from "zod";
import { useIntl } from "react-intl";

export const useValidationSchema = () => {
  const { formatMessage } = useIntl();

  const emailErrorMessage = formatMessage({
    defaultMessage: "E-mail should be valid",
    id: "emailErrorMessage",
  });
  const passwordErrorMessage = formatMessage({
    defaultMessage: "Password should be at least 8 characters",
    id: "passwordErrorMessage",
  });

  return z.object({
    email: z.string().email({
      message: emailErrorMessage,
    }),
    password: z.string().min(8, {
      message: passwordErrorMessage,
    }),
  });
};

export type Schema = z.infer<typeof useValidationSchema>;
