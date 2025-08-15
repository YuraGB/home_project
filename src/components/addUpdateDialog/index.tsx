'use client';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Description, Dialog } from '@radix-ui/react-dialog';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const AddUpdateDeleteDialog = ({
  children,
  buttonTitle,
  dialogTitle,
  isOpen = false,
  setOpenAction,
}: {
  children: ReactNode;
  dialogTitle: string;
  buttonTitle: string | ReactNode;
  isOpen: boolean;
  setOpenAction: Dispatch<SetStateAction<boolean>>;
}): ReactNode => {
  return (
    <section>
      <Dialog open={isOpen} onOpenChange={setOpenAction}>
        <DialogTrigger asChild>
          <Button variant="outline">{buttonTitle}</Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[725px]"
          aria-description={dialogTitle}
        >
          <Description className="hidden">{dialogTitle}</Description>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 justify-items-end grid-cols-2">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
