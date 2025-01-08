"use client";
import { Button } from "@/components/ui/button";
import { FormattedMessage } from "react-intl";
import { ReactNode } from "react";
import { Pencil } from "lucide-react";

export const UpdateButton = ({
  updateWhat,
  children,
  className,
}: {
  updateWhat: string;
  children?: ReactNode;
  className?: string;
}): ReactNode => {
  return (
    <Button variant={"ghost"} className={`${className ?? ""} text-[0] border`}>
      <FormattedMessage
        id={"updateButton"}
        defaultMessage={"update the {variable}"}
        values={{ variable: updateWhat }}
      />
      <Pencil className={"absolute"} />
      {children}
    </Button>
  );
};
