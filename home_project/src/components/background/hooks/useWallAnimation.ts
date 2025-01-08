import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

// Hook to return the position as a MotionValue<Vector3>
export const useWallAnimation = () => {
  const pathName = usePathname();

  const xRotation = useMotionValue(0);
  const yRotation = useMotionValue(0);
  const zRotation = useMotionValue(0);
  const yRotationEnd = useSpring(yRotation, {
    stiffness: 20,
  });

  // Create motion values for each axis
  const xPosition = useMotionValue(0); // x-axis motion value
  const yPositionStart = useMotionValue(-500); // y-axis motion value
  const zPosition = useMotionValue(200); // Initial z-axis position
  const yPositionEnd = useSpring(yPositionStart, {
    stiffness: 20,
  }); // Animated y-axis position

  useEffect(() => {
    if (pathName.endsWith("login")) {
      yRotation.set(-0.02);
    }
    if (pathName.endsWith("registration")) {
      yRotation.set(0.02);
    }

    if (!pathName.endsWith("registration") || !pathName.endsWith("login")) {
      yPositionStart.set(-200);
    }

    if (pathName.endsWith("registration") || pathName.endsWith("login")) {
      yPositionStart.set(15); // Set y position when the component mounts
    }
  }, [pathName, yPositionStart, yRotation]);

  // Combine the x, y, and z motion values into an array for position
  const position = [xPosition, yPositionEnd, zPosition] as unknown as [
    x: number,
    y: number,
    z: number,
  ];

  // Combine the x, y, and z motion values into an array for rotation
  const rotation = [xRotation, yRotationEnd, zRotation] as unknown as [
    x: number,
    y: number,
    z: number,
  ];

  return {
    position, // Return the array of motion values for position
    rotation, // Return the array of motion values for rotation
  };
};
