"use client";
import React, { ReactNode, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { Ocean } from "@/components/background/Ocean";
import { Sky } from "@react-three/drei";

const Model = dynamic(() =>
  import("@/components/background/Model").then((mod) => mod.Model),
);

export const Background = (): ReactNode => {
  return (
    <article className={"z-[-1] min-h-[700px] fixed w-full h-dvh top-0 left-0"}>
      <Canvas
        performance={{ min: 0.5 }}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 10, 300] }}
        shadows={true}
        className={"z-[-1]"}
      >
        <directionalLight
          position={[-100, 90, 550]}
          intensity={0.8}
          castShadow={true}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-radius={1200}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-100, 300, 300, -100]}
          />
        </directionalLight>
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          <Ocean />
          <Model />
        </Suspense>
        <Sky distance={10000} rayleigh={0.5} turbidity={5} />
        <fog attach="fog" args={["#aabbcc", 200, 400]} />
      </Canvas>
    </article>
  );
};
