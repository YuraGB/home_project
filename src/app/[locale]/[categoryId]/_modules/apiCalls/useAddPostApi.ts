"use client";
import { useMutation } from "@tanstack/react-query";
import { createNewPost } from "@/server/services/post/postService";
import { TCreatePostData } from "@/server/services/post/types";
import { useRouter } from "next/navigation";
import { useIntl } from "react-intl";

export const useAddPostApi = () => {
  const { refresh } = useRouter();
  const { locale } = useIntl();
  const {
    mutate: createPost,
    data: newPost,
    error: errorCreateNewPost,
    isPending: loadingNewPost,
  } = useMutation({
    mutationFn: async (data: TCreatePostData & { rating: boolean }) =>
      await createNewPost({ ...data, locale }),
    onSuccess: () => refresh(),
  });

  return {
    createPost,
    newPost,
    errorCreateNewPost,
    loadingNewPost,
  };
};
