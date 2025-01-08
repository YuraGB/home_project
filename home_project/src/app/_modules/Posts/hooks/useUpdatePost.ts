"use client";
import {
  NewPost,
  useNewPostValidationSchema as useUpdatePostValidationSchema,
} from "@/app/_modules/Posts/hooks/schema/validationSchemaAddPost";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { TPropsUpdateForm } from "@/app/_modules/Posts/UpdatePost/UpdatePostForm";
import { useMutationApi } from "@/hooks/apiCalls/mutation";
import { updatePostData } from "@/server/services/post/postService";
import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { TUpdatePostData } from "@/server/services/post/types";
import { useIntl } from "react-intl";

export const useUpdatePost = ({ post, onCloseAction }: TPropsUpdateForm) => {
  const { toast } = useToast();
  const { locale } = useIntl();

  const {
    isPending: loadingUpdatePost,
    error: errorUpdatePost,
    data: updatedPost,
    mutate: updatePostAction,
  } = useMutationApi<
    TUpdatePostData & { locale: string },
    TDBPost | null | undefined
  >(updatePostData);

  const formSchema = useUpdatePostValidationSchema();
  const form = useForm<NewPost>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: post.name ?? "",
      description: post.description ?? "",
      url: post.url ?? "",
      image: post.image ?? "",
      rating: !!post.rate,
    },
  });

  useEffect(() => {
    if (errorUpdatePost) {
      //todo translation
      toast({
        variant: "destructive",
        title: "New post not created",
        description: "There was a problem with creating new post.",
      });
    }
  }, [errorUpdatePost, toast]);

  useEffect(() => {
    if (!!updatedPost) {
      onCloseAction(false);
    }
  }, [onCloseAction, updatedPost]);

  const onSubmit = (values: NewPost) => {
    if (post.id) {
      updatePostAction({
        ...post,
        ...values,
        locale,
      });
    }
  };

  return {
    loadingUpdatePost,
    onSubmit,
    form,
  };
};
