"use client";
import { ReactNode } from "react";
import { DndWrapper } from "@/components/dragAndDrop";

export const TopRateLayout = ({
  topRate = 5,
  children,
}: {
  topRate?: number;
  children: ReactNode;
}): ReactNode => {
  return (
    <article className={`grid grid-rows-${topRate}`}>
      <DndWrapper>{children}</DndWrapper>
    </article>
  );
};
