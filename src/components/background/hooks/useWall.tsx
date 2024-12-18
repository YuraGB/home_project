import React, { useMemo } from "react";
import { useWallTextures } from "@/components/background/hooks/useWallTextures";
import { useWallAnimation } from "@/components/background/hooks/useWallAnimation";

export const useWall = () => {
  const textures = useWallTextures();
  const { position, rotation } = useWallAnimation();

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

  return { material, position, rotation };
};
