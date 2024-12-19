import React from "react";
import { CameraControls, useGLTF } from "@react-three/drei";
import { useCityAnimation } from "@/components/background/hooks/useCityAnimation";
import { motion } from "framer-motion-3d";
import * as THREE from "three";

export function City2() {
  const { nodes, materials } = useGLTF("/models/mirrors_age/scene.gltf");
  const { cameraControlRef, position, cityRef } = useCityAnimation();
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error */}
      <motion.group dispose={null} position={position} scale={3} ref={cityRef}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <CameraControls ref={cameraControlRef} />
          <mesh
            geometry={(nodes.Object_2 as THREE.Mesh).geometry}
            material={materials["Ocean.004"]}
          />
          <mesh
            geometry={(nodes.Object_3 as THREE.Mesh).geometry}
            material={materials[".051"]}
          />
          <mesh
            geometry={(nodes.Object_4 as THREE.Mesh).geometry}
            material={materials[".052"]}
          />
          <mesh
            geometry={(nodes.Object_5 as THREE.Mesh).geometry}
            material={materials[".053"]}
          />
          <mesh
            geometry={(nodes.Object_6 as THREE.Mesh).geometry}
            material={materials[".054"]}
          />
          <mesh
            geometry={(nodes.Object_7 as THREE.Mesh).geometry}
            material={materials[".055"]}
          />
          <mesh
            geometry={(nodes.Object_8 as THREE.Mesh).geometry}
            material={materials[".056"]}
          />
          <mesh
            geometry={(nodes.Object_9 as THREE.Mesh).geometry}
            material={materials[".057"]}
          />
          <mesh
            geometry={(nodes.Object_10 as THREE.Mesh).geometry}
            material={materials[".058"]}
          />
          <mesh
            geometry={(nodes.Object_11 as THREE.Mesh).geometry}
            material={materials[".059"]}
          />
          <mesh
            geometry={(nodes.Object_12 as THREE.Mesh).geometry}
            material={materials[".060"]}
          />
          <mesh
            geometry={(nodes.Object_13 as THREE.Mesh).geometry}
            material={materials[".061"]}
          />
          <mesh
            geometry={(nodes.Object_14 as THREE.Mesh).geometry}
            material={materials[".062"]}
          />
          <mesh
            geometry={(nodes.Object_15 as THREE.Mesh).geometry}
            material={materials[".062"]}
          />
          <mesh
            geometry={(nodes.Object_16 as THREE.Mesh).geometry}
            material={materials[".062"]}
          />
          <mesh
            geometry={(nodes.Object_17 as THREE.Mesh).geometry}
            material={materials[".062"]}
          />
          <mesh
            geometry={(nodes.Object_18 as THREE.Mesh).geometry}
            material={materials[".062"]}
          />
          <mesh
            geometry={(nodes.Object_19 as THREE.Mesh).geometry}
            material={materials[".063"]}
          />
          <mesh
            geometry={(nodes.Object_20 as THREE.Mesh).geometry}
            material={materials[".064"]}
          />
          <mesh
            geometry={(nodes.Object_21 as THREE.Mesh).geometry}
            material={materials[".065"]}
          />
          <mesh
            geometry={(nodes.Object_22 as THREE.Mesh).geometry}
            material={materials[".066"]}
          />
          <mesh
            geometry={(nodes.Object_23 as THREE.Mesh).geometry}
            material={materials[".067"]}
          />
          <mesh
            geometry={(nodes.Object_24 as THREE.Mesh).geometry}
            material={materials[".068"]}
          />
          <mesh
            geometry={(nodes.Object_25 as THREE.Mesh).geometry}
            material={materials[".069"]}
          />
          <mesh
            geometry={(nodes.Object_26 as THREE.Mesh).geometry}
            material={materials[".070"]}
          />
          <mesh
            geometry={(nodes.Object_27 as THREE.Mesh).geometry}
            material={materials[".071"]}
          />
          <mesh
            geometry={(nodes.Object_28 as THREE.Mesh).geometry}
            material={materials[".072"]}
          />
          <mesh
            geometry={(nodes.Object_29 as THREE.Mesh).geometry}
            material={materials[".073"]}
          />
          <mesh
            geometry={(nodes.Object_30 as THREE.Mesh).geometry}
            material={materials[".074"]}
          />
          <mesh
            geometry={(nodes.Object_31 as THREE.Mesh).geometry}
            material={materials[".075"]}
          />
          <mesh
            geometry={(nodes.Object_32 as THREE.Mesh).geometry}
            material={materials[".076"]}
          />
          <mesh
            geometry={(nodes.Object_33 as THREE.Mesh).geometry}
            material={materials[".077"]}
          />
          <mesh
            geometry={(nodes.Object_34 as THREE.Mesh).geometry}
            material={materials[".078"]}
          />
          <mesh
            geometry={(nodes.Object_35 as THREE.Mesh).geometry}
            material={materials[".079"]}
          />
          <mesh
            geometry={(nodes.Object_36 as THREE.Mesh).geometry}
            material={materials[".080"]}
          />
          <mesh
            geometry={(nodes.Object_37 as THREE.Mesh).geometry}
            material={materials[".081"]}
          />
          <mesh
            geometry={(nodes.Object_38 as THREE.Mesh).geometry}
            material={materials[".082"]}
          />
          <mesh
            geometry={(nodes.Object_39 as THREE.Mesh).geometry}
            material={materials[".083"]}
          />
          <mesh
            geometry={(nodes.Object_40 as THREE.Mesh).geometry}
            material={materials[".084"]}
          />
          <mesh
            geometry={(nodes.Object_41 as THREE.Mesh).geometry}
            material={materials[".085"]}
          />
          <mesh
            geometry={(nodes.Object_42 as THREE.Mesh).geometry}
            material={materials[".086"]}
          />
          <mesh
            geometry={(nodes.Object_43 as THREE.Mesh).geometry}
            material={materials[".087"]}
          />
          <mesh
            geometry={(nodes.Object_44 as THREE.Mesh).geometry}
            material={materials[".088"]}
          />
          <mesh
            geometry={(nodes.Object_45 as THREE.Mesh).geometry}
            material={materials[".089"]}
          />
          <mesh
            geometry={(nodes.Object_46 as THREE.Mesh).geometry}
            material={materials[".090"]}
          />
          <mesh
            geometry={(nodes.Object_47 as THREE.Mesh).geometry}
            material={materials[".091"]}
          />
          <mesh
            geometry={(nodes.Object_48 as THREE.Mesh).geometry}
            material={materials[".092"]}
          />
          <mesh
            geometry={(nodes.Object_49 as THREE.Mesh).geometry}
            material={materials[".093"]}
          />
          <mesh
            geometry={(nodes.Object_50 as THREE.Mesh).geometry}
            material={materials[".094"]}
          />
          <mesh
            geometry={(nodes.Object_51 as THREE.Mesh).geometry}
            material={materials[".095"]}
          />
          <mesh
            geometry={(nodes.Object_52 as THREE.Mesh).geometry}
            material={materials[".096"]}
          />
          <mesh
            geometry={(nodes.Object_53 as THREE.Mesh).geometry}
            material={materials[".096"]}
          />
          <mesh
            geometry={(nodes.Object_54 as THREE.Mesh).geometry}
            material={materials[".097"]}
          />
          <mesh
            geometry={(nodes.Object_55 as THREE.Mesh).geometry}
            material={materials[".098"]}
          />
          <mesh
            geometry={(nodes.Object_56 as THREE.Mesh).geometry}
            material={materials[".099"]}
          />
          <mesh
            geometry={(nodes.Object_57 as THREE.Mesh).geometry}
            material={materials["glass.001"]}
          />
        </group>
      </motion.group>
    </>
  );
}

useGLTF.preload("/models/mirrors_age/scene.gltf");
