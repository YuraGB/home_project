"use client";
import { Button } from "@/components/ui/button";
import { FormattedMessage } from "react-intl";
import { ReactNode } from "react";
import { Trash2 } from "lucide-react";

export const DeleteButton = ({
  deleteWhat,
  children,
  className,
}: {
  deleteWhat: string;
  children?: ReactNode;
  className?: string;
}): ReactNode => {
  return (
    <Button variant={"ghost"} className={`${className ?? ""} text-[0] border`}>
      <FormattedMessage
        id={"deleteButton"}
        defaultMessage={"delete the {variable}"}
        values={{ variable: deleteWhat }}
      />
      <Trash2 className={"absolute"} />
      {children}
    </Button>
  );
};
