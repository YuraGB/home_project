import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface WallTextures {
  aoMap: THREE.Texture;
  bumpMap: THREE.Texture;
  map: THREE.Texture;
  displacementMap: THREE.Texture;
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
  metalnessMap: THREE.Texture;
}

export const useWallTextures = (): WallTextures => {
  return useTexture({
    aoMap: "/textures/wall/ambientOcclusion.png",
    bumpMap: "/textures/wall/bump.png",
    map: "/textures/wall/col.png",
    displacementMap: "/textures/wall/disp.png",
    normalMap: "/textures/wall/normal.png",
    roughnessMap: "/textures/wall/gloss.png",
    metalnessMap: "/textures/wall/reflection.png",
  });
};
