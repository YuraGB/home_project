import { ReactNode } from "react";

export const PageTitle = ({ title }: { title: string }): ReactNode => {
  return (
    <section
      className={
        "flex items-center justify-center p-4 text-2xl w-full border-b"
      }
    >
      <h1>{title}</h1>
    </section>
  );
};
