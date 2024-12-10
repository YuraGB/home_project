"use client";
import { ReactNode, useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormattedMessage } from "react-intl";

import dynamic from "next/dynamic";
const AddPostForm = dynamic(() =>
  import(
    "@/app/[locale]/[categoryId]/_modules/components/AddPost/AddPostForm"
  ).then((mod) => mod.AddPostForm),
);

export const AddPostButton = ({
  userId,
  categoryId,
}: {
  userId: number;
  categoryId: number;
}): ReactNode => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <section>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <FormattedMessage
              id={"addNewPostBtn"}
              defaultMessage={"Create new post"}
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>
              <FormattedMessage
                id={"newPostDialogTitle"}
                defaultMessage={"The new post"}
              />
            </DialogTitle>
            {/*<DialogDescription>*/}
            {/*  <FormattedMessage*/}
            {/*    id={"addCategoryDescription"}*/}
            {/*    defaultMessage={"New category will be in the list"}*/}
            {/*  />*/}
            {/*</DialogDescription>*/}
          </DialogHeader>
          <div className="grid gap-4 py-4 justify-items-end">
            <AddPostForm
              userId={userId}
              categoryId={categoryId}
              onClose={() => setOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
