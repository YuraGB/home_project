import React, { useMemo } from "react";
import { useWallTextures } from "@/components/background/hooks/useWallTextures";
import { useWallAnimation } from "@/components/background/hooks/useWallAnimation";
import { useViewPort } from "@/hooks/useWindowSize";

export const useWall = () => {
  const textures = useWallTextures();
  const { position, rotation } = useWallAnimation();
  const viewPort = useViewPort();

  let size = [270, 120, 10] as [width: number, height: number, depth: number];

  const material = useMemo(
    () => (
      <meshStandardMaterial
        {...textures}
        displacementScale={0.01}
        roughness={10}
        metalness={0.5}
      />
    ),
    [textures],
  );

  if (viewPort === "mobile") {
    size = [100, 120, 10];
  }

  console.log(viewPort, size);

  return { material, position, rotation, size };
};
