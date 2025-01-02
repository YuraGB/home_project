"use client";
import { useMutation } from "@tanstack/react-query";
import { updatePostData } from "@/server/services/post/postService";
import { TUpdatePostData } from "@/server/services/post/types";
import { useRouter } from "next/navigation";

export const useUpdatePostApi = () => {
  const { refresh } = useRouter();
  const {
    mutate: updatePost,
    data: updatedPost,
    error: errorUpdatePost,
    isPending: loadingUpdatePost,
  } = useMutation({
    mutationFn: async (data: TUpdatePostData & { rating: boolean }) =>
      await updatePostData({ ...data }),
    onSuccess: () => refresh(),
  });

  return {
    errorUpdatePost,
    updatedPost,
    loadingUpdatePost,
    updatePost,
  };
};
