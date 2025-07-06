import {
  NewPost,
  useNewPostValidationSchema,
} from "@/modules/post/hooks/schema/validationSchemaAddPost";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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

  const setImage = (imgUrl: string) => form.setValue("image", imgUrl);
  const imageExist = form.watch("image");

  const { imagesArray, loadingImages, onBlurTitleAction } =
    useAddImage(imageExist);

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

  return {
    loadingNewPost,
    onSubmit,
    form,
    onBlurTitleAction,
    imagesArray,
    setImage,
    imageExist,
    loadingImages,
  };
};
