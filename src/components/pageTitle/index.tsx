"use client";
import { ReactNode } from "react";
type PageTitleProps = {
  title: string;
  transitionname?: string;
};

export const PageTitle = ({ title }: PageTitleProps): ReactNode => {
  return (
    <section
      className={
        "flex items-center justify-center p-4 text-2xl w-full border-b"
      }
    >
      <h1 className="nline-block font-bold text-gray-700">{title}</h1>
    </section>
  );
};
