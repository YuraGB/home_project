import { type ReactNode } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

type TPropsDragAndDrop = {
  handler: (event: DragEndEvent) => void;
  children: ReactNode;
};
export const DragAndDropProvider = ({
  handler,
  children,
}: TPropsDragAndDrop): ReactNode => {
  return <DndContext onDragEnd={handler}>{children}</DndContext>;
};
