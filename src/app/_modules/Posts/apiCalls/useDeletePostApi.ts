import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { deletePostData } from "@/server/services/post/postService";

export const useDeletePostApi = () => {
  const { refresh } = useRouter();
  const {
    mutate: deletePost,
    data: deletedPost,
    error: errorDeletePost,
    isPending: loadingDeletePost,
  } = useMutation({
    mutationFn: async (postId: number) => await deletePostData(postId),
    onSuccess: () => refresh(),
  });

  return {
    errorDeletePost,
    deletedPost,
    loadingDeletePost,
    deletePost,
  };
};
