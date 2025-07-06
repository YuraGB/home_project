import { z } from "zod";
import { useIntl } from "react-intl";

export const validationNewPost = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
  image: z.string().optional(),
  rating: z.boolean().default(false),
});

export type NewPost = z.infer<typeof validationNewPost>;

export const useNewPostValidationSchema = () => {
  const { formatMessage } = useIntl();

  // translations for error messages
  const postNameError = formatMessage({
    defaultMessage: "The name of the post must be at least 2 characters",
    id: "postName",
  });
  const descriptionErrorMessage = formatMessage({
    defaultMessage: "The description of the post must be set",
    id: "postDescriptionErrorMessage",
  });
  const urlErrorMessage = formatMessage({
    id: "urlErrorMessage",
    defaultMessage: "",
  });

  // validation
  return validationNewPost.merge(
    z.object({
      name: z.string().min(1, {
        message: postNameError,
      }),
      description: z.string().min(1, {
        message: descriptionErrorMessage,
      }),
      url: z.string().url({
        message: urlErrorMessage,
      }),
    }),
  );
};
