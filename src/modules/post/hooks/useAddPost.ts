import {
  NewPost,
  useNewPostValidationSchema,
} from "@/modules/post/hooks/schema/validationSchemaAddPost";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutationApi } from "@/hooks/apiCalls/mutation";
import { TCreatePostData } from "@/server/controllers/post/types";
import { createNewPost } from "@/server/controllers/post/postService";
import { TPostWithRating } from "@/server/services/post/addNewPostWithRating";
import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { useIntl } from "react-intl";
import { useAddImage } from "./useAddImage";
import { TPropsAddForm } from "@/modules/subCategory/components/types";

export const useAddPost = ({
  categoryId,
  subCategoryId,
  userId,
  onClose,
}: TPropsAddForm) => {
  const { toast } = useToast();
  const router = useRouter();
  const { locale } = useIntl();

  const formSchema = useNewPostValidationSchema();
  const form = useForm<NewPost>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      image: "",
      rating: false,
    },
  });
  const imageExist = form.watch("image");

  const setImage = (imgUrl: string) => form.setValue("image", imgUrl);

  const { imagesArray, loadingImages, getTitleImagesAction } = useAddImage();

  /**
   * This function is used to load images based on the title input.
   * It checks if an image already exists, and if not, it fetches images related to the title.
   * If the title input is empty, it does not fetch any images.
   */
  const loadImageAction = useCallback(() => {
    // Get the title from the form
    const titleExist = form.getValues("name");
    // If image already exists, do not fetch images again
    if (imageExist) return;
    // If title exists, fetch images related to the title
    if (titleExist) {
      getTitleImagesAction(titleExist);
    } else {
      // If no title is provided, show a toast notification
      // to inform the user that they need to enter a title to fetch images.
      // This is important to prevent unnecessary API calls when the title is empty.
      //todo translation
      toast({
        variant: "destructive",
        title: "No title provided",
        description: "Please enter a title to fetch images.",
      });
    }
  }, [form, getTitleImagesAction, imageExist, toast]);

  const {
    data: newPost,
    isPending: loadingNewPost,
    mutate: createPost,
    error: errorCreateNewPost,
  } = useMutationApi<
    TCreatePostData & { rating: boolean } & { locale: string },
    TPostWithRating | TDBPost | undefined
  >(createNewPost);

  useEffect(() => {
    if (errorCreateNewPost) {
      //todo translation
      toast({
        variant: "destructive",
        title: "New post not created",
        description: "There was a problem with creating new post.",
      });
    }
  }, [errorCreateNewPost, toast]);

  useEffect(() => {
    if (!!newPost) {
      onClose();
    }
  }, [onClose, newPost]);

  const onSubmit = (values: NewPost) => {
    if (userId) {
      createPost({
        userId,
        categoryId,
        subCategoryId,
        locale,
        ...values,
      });
    } else {
      router.push("/login");
    }
  };

  const showAddImageButton = !imageExist && !loadingImages;

  return {
    loadingNewPost,
    onSubmit,
    form,
    loadImageAction,
    imagesArray,
    setImage,
    imageExist,
    loadingImages,
    showAddImageButton,
  };
};
