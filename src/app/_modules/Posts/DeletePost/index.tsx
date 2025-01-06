"use client";
import { TPostWithRating } from "@/lib/formatPostData";
import { useState } from "react";
import { AddUpdateDeleteDialog } from "@/components/addUpdateDialog";
import { Trash2 } from "lucide-react";
import { DeletePostActionBox } from "@/app/_modules/Posts/DeletePost/DeleteActionBox";

export const DeletePost = (props: { post: TPostWithRating }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AddUpdateDeleteDialog
      dialogTitle={"Delete the post"}
      buttonTitle={<Trash2 className={"absolute"} />}
      isOpen={open}
      setOpenAction={setOpen}
    >
      <DeletePostActionBox postId={props.post.id} onCloseAction={setOpen} />
    </AddUpdateDeleteDialog>
  );
};
