"use client";
import { TPostWithRating } from "@/lib/formatPostData";
import { useState } from "react";
import { AddUpdateDialog } from "@/components/addUpdateDialog";
import { Trash2 } from "lucide-react";
import { DeleteActionBox } from "@/app/_modules/Posts/DeletePost/DeleteActionBox";

export const DeletePost = (props: { post: TPostWithRating }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AddUpdateDialog
      dialogTitle={"Delete the post"}
      buttonTitle={<Trash2 className={"absolute"} />}
      isOpen={open}
      setOpenAction={setOpen}
    >
      <DeleteActionBox postId={props.post.id} onCloseAction={setOpen} />
    </AddUpdateDialog>
  );
};
