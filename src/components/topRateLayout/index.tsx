"use client";
import { ReactNode } from "react";
import { DndWrapper } from "@/components/dragAndDrop";

export const TopRateLayout = ({
  children,
}: {
  topRate?: number;
  children: ReactNode;
}): ReactNode => {
  return (
    <article className={"mt-4"}>
      <DndWrapper>{children}</DndWrapper>
    </article>
  );
};
