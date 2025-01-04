"use client";
import React, { ReactNode, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { Ocean } from "@/components/background/Ocean";

const Model = dynamic(() =>
  import("@/components/background/Model").then((mod) => mod.Model),
);

export const Background = (): ReactNode => {
  return (
    <article className={"z-[-1] min-h-[700px] fixed w-full h-dvh top-0 left-0"}>
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 10, 300] }}
        shadows={true}
        className={"z-[-1]"}
      >
        <Suspense fallback={null}>
          <Ocean />
          <Model />
        </Suspense>
        <fog attach="fog" args={["#aabbcc", 200, 400]} />
      </Canvas>
    </article>
  );
};
