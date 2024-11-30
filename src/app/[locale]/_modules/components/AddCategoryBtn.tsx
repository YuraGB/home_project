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
import { AddCategoryForm } from "@/app/[locale]/_modules/components/AddCategoryForm";

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
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you`&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
