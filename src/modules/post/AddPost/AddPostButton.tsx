"use client";
import { ReactNode, useState } from "react";
import { FormattedMessage } from "react-intl";

import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { AddUpdateDeleteDialog } from "@/components/addUpdateDialog";
const AddPostForm = dynamic(() =>
  import("@/modules/post/AddPost/AddPostForm").then((mod) => mod.AddPostForm),
);

export const AddPostButton = ({
  subCategoryId,
  categoryId,
}: {
  categoryId?: number;
  subCategoryId?: number;
}): ReactNode => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <AddUpdateDeleteDialog
      dialogTitle={"Create new post"}
      buttonTitle={
        <FormattedMessage
          id={"addNewPostBtn"}
          defaultMessage={"Create new post"}
        />
      }
      isOpen={open}
      setOpenAction={setOpen}
    >
      <AddPostForm
        userId={session?.user.id}
        categoryId={categoryId}
        subCategoryId={subCategoryId}
        onClose={() => setOpen(false)}
      />
    </AddUpdateDeleteDialog>
  );
};
