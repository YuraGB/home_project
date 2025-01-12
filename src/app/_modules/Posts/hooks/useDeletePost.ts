import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { TDeleteActionBox } from "@/app/_modules/Posts/DeletePost/DeleteActionBox";
import { deletePostData } from "@/server/controllers/post/postService";
import { useMutationApi } from "@/hooks/apiCalls/mutation";

export const useDeletePost = ({ postId, onCloseAction }: TDeleteActionBox) => {
  const { toast } = useToast();
  const {
    isPending: loadingDeletePost,
    error: errorDeletePost,
    data: deletedPost,
    mutate: deletePostAction,
  } = useMutationApi<number, number | null>(deletePostData);

  useEffect(() => {
    if (errorDeletePost) {
      //todo translation
      toast({
        variant: "destructive",
        title: "New post not created",
        description: "There was a problem with creating new post.",
      });
    }
  }, [errorDeletePost, toast]);

  useEffect(() => {
    if (!!deletedPost) {
      onCloseAction(false);
    }
  }, [deletedPost, onCloseAction]);

  const onClickAction = () => {
    if (postId) {
      deletePostAction(postId);
    }
  };

  return {
    onClickAction,
    loadingDeletePost,
  };
};
