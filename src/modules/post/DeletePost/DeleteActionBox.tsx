import { Dispatch, SetStateAction } from "react";
import { useDeletePost } from "@/modules/post/hooks/useDeletePost";
import { DeleteAction } from "@/components/DeleteAction";

export type TDeleteActionBox = {
  postId: number;
  onCloseAction: Dispatch<SetStateAction<boolean>>;
};

export const DeletePostActionBox = ({
  postId,
  onCloseAction,
}: TDeleteActionBox) => {
  const { onClickAction, loadingDeletePost } = useDeletePost({
    postId,
    onCloseAction,
  });
  return (
    <DeleteAction
      disabled={loadingDeletePost}
      onClickAction={onClickAction}
      onCloseAction={onCloseAction}
    />
  );
};
