import { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import * as THREE from "three";
import { useMotionValue, useSpring } from "framer-motion";

const { DEG2RAD } = THREE.MathUtils;

export const useCityAnimation = () => {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const { camera } = useThree();
  const path = usePathname();
  const wasAnimated = useRef(false); // animation should be only ones

  const xPosition = useMotionValue(-1); // x-axis motion value
  const yPositionStart = useMotionValue(-200); // y-axis motion value
  const zPosition = useMotionValue(0); // Initial z-axis position
  const yPositionEnd = useSpring(yPositionStart, {
    stiffness: 20,
  });

  useEffect(() => {
    if (
      cameraControlRef.current &&
      !path.endsWith("login") &&
      !path.endsWith("registration") &&
      !wasAnimated.current
    ) {
      wasAnimated.current = true;

      //animate the camera
      cameraControlRef.current.rotate(-75 * DEG2RAD, 0, true);
      cameraControlRef.current.rotate(0, 2 * DEG2RAD, true);
      cameraControlRef.current.zoom(-camera.zoom / 2, true);
      cameraControlRef.current.truck(0, 37, true);

      // make the city up
      yPositionStart.set(-53);
    }
  }, [camera.zoom, path, yPositionStart]);

  const position = [xPosition, yPositionEnd, zPosition] as unknown as [
    x: number,
    y: number,
    z: number,
  ];

  return {
    cameraControlRef,
    position,
  };
};
