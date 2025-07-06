import { ReactNode } from "react";
import { DragAndDropProvider } from "@/context/DragAndDropProvider";
import { DragEndEvent } from "@dnd-kit/core";

export const DndWrapper = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const handler = (event: DragEndEvent) => {
    console.log(event);
  };

  return (
    <DragAndDropProvider handler={handler}>{children}</DragAndDropProvider>
  );
};
