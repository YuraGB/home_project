"use client";
import { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

export const Background = (): ReactNode => {
  return (
    <article className={"z-[-1] fixed w-full h-dvh top-0 left-0"}>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        {/*<Box position={[-1.2, 0, 0]} />*/}
        {/*<Box position={[1.2, 0, 0]} />*/}
        {/*<Suspense fallback={"Loading"}>*/}
        {/*  <Model />*/}
        {/*</Suspense>*/}
      </Canvas>
    </article>
  );
};
