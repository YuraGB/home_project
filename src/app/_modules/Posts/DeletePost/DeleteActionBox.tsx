import { Button } from "@/components/ui/button";
import { FormattedMessage } from "react-intl";
import { Dispatch, SetStateAction } from "react";
import { useDeletePost } from "@/app/_modules/Posts/hooks/useDeletePost";

export type TDeleteActionBox = {
  postId: number;
  onCloseAction: Dispatch<SetStateAction<boolean>>;
};

export const DeleteActionBox = ({
  postId,
  onCloseAction,
}: TDeleteActionBox) => {
  const { onClickAction, loadingDeletePost } = useDeletePost({
    postId,
    onCloseAction,
  });
  return (
    <section className={"flex w-full p-4 justify-between gap-4"}>
      <Button
        variant={"default"}
        onClick={() => onCloseAction(false)}
        className={"w-full"}
      >
        <FormattedMessage id={"cancel"} defaultMessage={"Cancel"} />
      </Button>
      <Button
        className={"w-full"}
        variant={"destructive"}
        disabled={loadingDeletePost}
        onClick={onClickAction}
      >
        <FormattedMessage id={"delete"} defaultMessage={"Delete"} />
      </Button>
    </section>
  );
};
