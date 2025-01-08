"use client";
import { AddUpdateDeleteDialog } from "@/components/addUpdateDialog";
import { UpdatePostForm } from "@/app/_modules/Posts/UpdatePost/UpdatePostForm";
import { TPostWithRating } from "@/lib/formatPostData";
import { Pencil } from "lucide-react";
import { useState } from "react";

export const UpdatePost = (props: { post: TPostWithRating }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AddUpdateDeleteDialog
      dialogTitle={"Update the post"}
      buttonTitle={<Pencil className={"absolute"} />}
      isOpen={open}
      setOpenAction={setOpen}
    >
      <UpdatePostForm post={props.post} onCloseAction={setOpen} />
    </AddUpdateDeleteDialog>
  );
};
