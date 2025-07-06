import dynamic from "next/dynamic";
import React from "react";

const City2 = dynamic(() =>
  import("@/components/background/City2").then((mod) => mod.City2),
);

export const Model = () => {
  return (
    <>
      <City2 />
    </>
  );
};
