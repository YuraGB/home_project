import React from "react";
import { TextContent } from "@/components/background/TextContent";
import { useWall } from "@/components/background/hooks/useWall";
import { motion } from "framer-motion-3d";

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
