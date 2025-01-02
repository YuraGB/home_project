import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useDeletePostApi } from "@/app/_modules/Posts/apiCalls/useDeletePostApi";
import { TDeleteActionBox } from "@/app/_modules/Posts/DeletePost/DeleteActionBox";

export const useDeletePost = ({ postId, onCloseAction }: TDeleteActionBox) => {
  const { toast } = useToast();
  const { loadingDeletePost, errorDeletePost, deletedPost, deletePost } =
    useDeletePostApi();

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
      deletePost(postId);
    }
  };

  return {
    onClickAction,
    loadingDeletePost,
  };
};
