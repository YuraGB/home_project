import {
  NewPost,
  useNewPostValidationSchema,
} from "@/app/_modules/Posts/hooks/schema/validationSchemaAddPost";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { TPropsAddForm } from "@/app/[locale]/[categoryId]/_modules/components/types";
import { useRouter } from "next/navigation";
import { useMutationApi } from "@/hooks/apiCalls/mutation";
import { TCreatePostData } from "@/server/services/post/types";
import { createNewPost } from "@/server/services/post/postService";
import { TPostWithRating } from "@/server/actions/post/addNewPostWithRating";
import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { useIntl } from "react-intl";

export const useAddPost = ({
  categoryId,
  subCategoryId,
  userId,
  onClose,
}: TPropsAddForm) => {
  const { toast } = useToast();
  const router = useRouter();
  const { locale } = useIntl();

  const {
    data: newPost,
    isPending: loadingNewPost,
    mutate: createPost,
    error: errorCreateNewPost,
  } = useMutationApi<
    TCreatePostData & { rating: boolean } & { locale: string },
    TPostWithRating | TDBPost | undefined
  >(createNewPost);

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
  };
};
