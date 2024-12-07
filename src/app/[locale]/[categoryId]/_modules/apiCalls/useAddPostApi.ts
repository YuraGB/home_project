"use client";
import { useMutation } from "@tanstack/react-query";
import { createNewPost } from "@/server/services/post/postService";
import { TCreatePostData } from "@/server/services/post/types";
import { useRouter } from "next/navigation";

export const useAddPostApi = () => {
  const { refresh } = useRouter();
  const {
    mutate: createPost,
    data: newPost,
    error: errorCreateNewPost,
    isPending: loadingNewPost,
  } = useMutation({
    mutationFn: async (data: TCreatePostData & { rating: boolean }) =>
      await createNewPost(data),
    onSuccess: () => refresh(),
  });

  return {
    createPost,
    newPost,
    errorCreateNewPost,
    loadingNewPost,
  };
};
