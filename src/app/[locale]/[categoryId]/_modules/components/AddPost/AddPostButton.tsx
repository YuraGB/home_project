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
import { useSession } from "next-auth/react";
const AddPostForm = dynamic(() =>
  import(
    "@/app/[locale]/[categoryId]/_modules/components/AddPost/AddPostForm"
  ).then((mod) => mod.AddPostForm),
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
    <section>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
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
          </DialogHeader>
          <div className="grid gap-4 py-4 justify-items-end">
            <AddPostForm
              userId={session?.user.id}
              categoryId={categoryId}
              subCategoryId={subCategoryId}
              onClose={() => setOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
