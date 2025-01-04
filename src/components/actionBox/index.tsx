"use client";
import { ReactNode } from "react";
import { Settings, X } from "lucide-react";
import { useActionBox } from "@/components/actionBox/useActionBox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ActionBoxProps = {
  children: ReactNode;
};

export const ActionBox = ({ children }: ActionBoxProps): ReactNode => {
  const { isOpen, triggerHandler } = useActionBox();

  return (
    <section className={"absolute left-0 top-0 z-[1] flex flex-col"}>
      <Popover open={isOpen}>
        <PopoverTrigger className={"text-[0]"} onClick={triggerHandler}>
          {isOpen ? (
            <X
              className={"p-1 rounded-[50%] hover:bg-accent active:bg-accent"}
              size={30}
              strokeWidth={1}
            />
          ) : (
            <Settings
              className={"p-1 rounded-[50%] hover:bg-accent"}
              size={30}
              strokeWidth={1}
            />
          )}
          Open settings
        </PopoverTrigger>
        <PopoverContent className={"w-auto flex justify-between gap-2"}>
          {children}
        </PopoverContent>
      </Popover>
    </section>
  );
};
