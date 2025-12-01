import { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import * as THREE from "three";
import { Group } from "three";

const { DEG2RAD } = THREE.MathUtils;

export const useCityAnimation = () => {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const cityRef = useRef<Group>(null);
  const { camera } = useThree();
  const path = usePathname();
  const wasAnimated = useRef(false); // animation should be only ones

  useFrame((state, delta) => {
    if (cityRef.current) {
      cityRef.current.rotation.y += delta * 0.01; //  all time rotation
    }
  });

  useEffect(() => {
    if (
      cameraControlRef.current &&
      !path.endsWith("login") &&
      !path.endsWith("registration") &&
      !wasAnimated.current
    ) {
      wasAnimated.current = true;

      //animate the camera to the city on the start
      cameraControlRef.current.rotate(-75 * DEG2RAD, 0, true);
      cameraControlRef.current.rotate(0, 4.3 * DEG2RAD, true);
      cameraControlRef.current.zoom(camera.zoom / 2, true);
      cameraControlRef.current.truck(0, 37, true);

      // make the city up
      cityRef.current?.position.set(-1, -50, 0);
    } else {
      if (path.endsWith("login") || path.endsWith("registration")) {
        // reset city position for auth pages
        cityRef.current?.position.set(-1, -200, 0);
      }
    }
  }, [camera.zoom, path]);

  return {
    cameraControlRef,
    cityRef,
  };
};
