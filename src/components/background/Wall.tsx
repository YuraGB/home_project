import React from "react";
import { TextContent } from "@/components/background/TextContent";
import { useWall } from "@/components/background/hooks/useWall";
import { motion } from "framer-motion-3d";

/**
 * This is heavy component
 * possible because the Loaders -> textures/fonts
 * was removed but don't deleted.
 * Possible to resolve the issue in the future
 * @constructor
 */

export const Wall: React.FC = () => {
  const { material, position, rotation, size } = useWall();
  return (
    <motion.group position={position} rotation={rotation}>
      <mesh receiveShadow={true} castShadow={true}>
        <boxGeometry args={size} />
        {material}
      </mesh>
      <TextContent />
    </motion.group>
  );
};
