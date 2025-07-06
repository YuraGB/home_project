"use client";
import React, { ReactNode, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import dynamic, { DynamicOptions } from "next/dynamic";

const Model = dynamic(
  () => import("@/components/background/Model").then((mod) => mod.Model),
  {
    suspense: true,
    ssr: false,
  } as unknown as DynamicOptions<unknown>,
);
const Sky = dynamic(() => import("@react-three/drei").then((mod) => mod.Sky), {
  suspense: true,
  ssr: false,
} as unknown as DynamicOptions<unknown>);
const Ocean = dynamic(
  () => import("@/components/background/Ocean").then((mod) => mod.Ocean),
  { suspense: true } as unknown as DynamicOptions<unknown>,
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
          <Sky
            distance={450000}
            sunPosition={[5, 1, 8]}
            mieCoefficient={0.005}
            mieDirectionalG={1}
            rayleigh={0.31}
            turbidity={8}
            inclination={0}
            azimuth={0.25}
          />
          <Ocean />
          <Model />
        </Suspense>

        <fog attach="fog" args={["#aabbcc", 200, 400]} />
      </Canvas>
    </article>
  );
};
