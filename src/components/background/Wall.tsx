"use client";
import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    wall2_Material_u1_v1: THREE.MeshStandardMaterial;
  };
};

export function Model() {
  const { nodes, materials } = useGLTF(
    "/models/brick_wall_united_kingdom.glb",
  ) as GLTFResult;
  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.wall2_Material_u1_v1}
        position={[0, -10, -4]}
        rotation={[3.118, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/brick_wall_united_kingdom.glb");
