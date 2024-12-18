import { useGLTF, CameraControls } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import { useCityAnimation } from "@/components/background/hooks/useCityAnimation";
import { motion } from "framer-motion-3d";

export const City = () => {
  const { nodes, materials } = useGLTF("/city_model.glb");
  const { cameraControlRef, position } = useCityAnimation();
  return (
    <motion.group
      dispose={null}
      rotation={[-0.02, 0, -0.01]}
      position={position}
      scale={3}
    >
      <CameraControls ref={cameraControlRef} />
      <group rotation={[-Math.PI / 2, 0, 0.1]} scale={0.073}>
        {/* Cast the nodes to THREE.Mesh to access geometry */}
        <mesh
          geometry={(nodes.Object_2 as THREE.Mesh).geometry} // Casting to THREE.Mesh
          material={materials.CityEngineMaterial2}
        />
        <mesh
          geometry={(nodes.Object_3 as THREE.Mesh).geometry} // Casting to THREE.Mesh
          material={materials.CityEngineMaterial2}
        />
        <mesh
          geometry={(nodes.Object_4 as THREE.Mesh).geometry} // Casting to THREE.Mesh
          material={materials.CityEngineMaterial2}
        />
        <mesh
          geometry={(nodes.Object_5 as THREE.Mesh).geometry} // Casting to THREE.Mesh
          material={materials.CityEngineMaterial2}
        />
      </group>
    </motion.group>
  );
};

useGLTF.preload("/city_model.glb");
