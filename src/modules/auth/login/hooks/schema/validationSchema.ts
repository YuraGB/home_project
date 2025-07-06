import {
  baseObjectInputType,
  baseObjectOutputType,
  objectUtil,
  z,
  ZodObject,
  ZodString,
  ZodTypeAny,
} from "zod";
import { useIntl } from "react-intl";

export const useValidationSchema = (): ZodObject<
  {
    password: ZodString;
    email: ZodString;
  },
  "strip",
  ZodTypeAny,
  {
    [k in keyof objectUtil.addQuestionMarks<
      baseObjectOutputType<{
        password: ZodString;
        email: ZodString;
      }>
    >]: objectUtil.addQuestionMarks<
      baseObjectOutputType<{ password: ZodString; email: ZodString }>
    >[k];
  },
  {
    [k_1 in keyof baseObjectInputType<{
      password: ZodString;
      email: ZodString;
    }>]: baseObjectInputType<{
      password: ZodString;
      email: ZodString;
    }>[k_1];
  }
> => {
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

  // validation
  return z.object({
    email: z.string().email({
      message: emailErrorMessage,
    }),
    password: z.string().min(8, {
      message: passwordErrorMessage,
    }),
  });
};
