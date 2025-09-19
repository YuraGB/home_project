"use client";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
const Background3D = dynamic(
  () => import("./Background3D").then((module) => module.Background3D),
  { ssr: false },
);

export const Background = (): ReactNode => {
  return (
    <article
      className={`z-[-1] min-h-[700px] fixed w-full h-dvh top-0 left-0 background-placeholder`}
    >
      <Background3D />
    </article>
  );
};
