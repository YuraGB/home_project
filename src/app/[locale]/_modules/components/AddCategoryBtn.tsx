"use client";
import { Dialog } from "@radix-ui/react-dialog";
import { ReactNode, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const AddCategoryForm = dynamic(() =>
  import("@/app/[locale]/_modules/components/AddCategoryForm").then(
    (mod) => mod.AddCategoryForm,
  ),
);
import { FormattedMessage } from "react-intl";
import dynamic from "next/dynamic";

export const AddCategoryBtn = ({
  userId,
}: {
  userId: number | null;
}): ReactNode => {
  const [openDialog, setDialogOpen] = useState<boolean>(false);
  if (!userId) {
    return null;
  }
  return (
    <section>
      <Dialog open={openDialog} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <FormattedMessage
              id={"addCategory"}
              defaultMessage={"Create new category"}
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>
              <FormattedMessage
                id={"newCategoryTitlePopup"}
                defaultMessage={"A new category"}
              />
            </DialogTitle>
            <DialogDescription>
              <FormattedMessage
                id={"addCategoryDescription"}
                defaultMessage={"New category will be in the list"}
              />
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 justify-items-end">
            <AddCategoryForm
              userId={userId}
              onClose={() => setDialogOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};