"use client";
import { ReactNode } from "react";
import { Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ActionBoxProps = {
  children: ReactNode;
};

export const ActionBox = ({ children }: ActionBoxProps): ReactNode => {
  return (
    <section
      className={
        "absolute left-0 top-0 z-[1] flex flex-col opacity-[0] hover:opacity-[1]"
      }
    >
      <Popover>
        <PopoverTrigger className={"text-[0] p-1"}>
          <Settings
            className={
              "p-1 rounded-[50%] shadow-inner hover:shadow-sm hover:shadow-black"
            }
            size={30}
            strokeWidth={1}
          />
          Open settings
        </PopoverTrigger>
        <PopoverContent className={"w-auto flex justify-between gap-2"}>
          {children}
        </PopoverContent>
      </Popover>
    </section>
  );
};
