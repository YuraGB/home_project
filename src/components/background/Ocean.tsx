import * as THREE from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { useThree, useLoader, useFrame } from "@react-three/fiber";
import { Water } from "three-stdlib";
import { Mesh } from "three";

// This function will simulate the black water surface
export const Ocean = () => {
  const waterRef = useRef<Mesh>(null);
  const meshRef = useRef<Mesh>(null);
  const gl = useThree((state) => state.gl); // Get WebGLRenderer instance
  useEffect(() => console.log("Ocean is loaded"), []);
  // Water normals for simulating waves
  const waterNormals = useLoader(THREE.TextureLoader, "/water.jpeg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  // Plane geometry for the water surface
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);

  // Configuration for the water material
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x000000, // Make the water black
      distortionScale: 3.7,
      fog: true,
      // @ts-expect-error damn
      format: gl.encoding,

      scale: 1, // Scale of the distortion (set to 1 for normal scale)
    }),
    [waterNormals, gl],
  );

  useEffect(() => {
    if (meshRef.current && !waterRef.current) {
      const water = new Water(geom, config);
      waterRef.current = water;
      meshRef.current.add(water);
    }
  }, [geom, config]);

  useFrame((state, delta) => {
    if (waterRef.current) {
      //@ts-expect-error damn2
      waterRef.current.material.uniforms.time.value += delta / 4; // Update the water's time for animation
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation-x={-Math.PI / 2}
      rotation-z={-0.2}
      position={[0, -50, 10]}
    >
      <meshBasicMaterial />
    </mesh>
  );
};
