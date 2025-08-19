import { Text3D } from "@react-three/drei";
import React from "react";
import { useLoader } from "@react-three/fiber";
import { FontLoader } from "three-stdlib";
import { usePathname } from "next/navigation";
import { useTextContent } from "@/components/background/hooks/useTextContent";

export const TextContent = () => {
  const font = useLoader(FontLoader, "/fonts/Agu.json");
  const pathName = usePathname();
  const {
    positionTextLogin,
    positionTitleLogin,
    positionTextRegistration,
    positionTitleRegistration,
    sizeText,
    sizeTitle,
  } = useTextContent();

  if (pathName.endsWith("login")) {
    return (
      <>
        <Text3D
          font={font.data}
          position={positionTitleLogin as [number, number, number]}
          size={sizeTitle}
          curveSegments={2}
          bevelEnabled={true}
          bevelThickness={0.5}
          bevelSize={0.05}
          bevelOffset={0}
          bevelSegments={5}
          smooth={0.1}
          castShadow={true}
        >
          <meshStandardMaterial attach="material" color="white" />
          Login form
        </Text3D>
        <Text3D
          font={font.data}
          position={positionTextLogin as [number, number, number]}
          size={sizeText}
          curveSegments={2}
          bevelEnabled={true}
          bevelThickness={0.5}
          bevelSize={0.05}
          bevelOffset={0}
          bevelSegments={5}
          smooth={0.1}
          castShadow={true} // Текст відкидає тіні
        >
          <meshStandardMaterial attach="material" color="white" />
          {`Only authorized user can 
interact with site infrastructure`}
        </Text3D>
      </>
    );
  }
  if (pathName.includes("registration")) {
    return (
      <>
        <Text3D
          font={font.data}
          position={positionTitleRegistration as [number, number, number]}
          size={sizeTitle}
          curveSegments={2}
          bevelEnabled={true}
          bevelThickness={0.5}
          bevelSize={0.05}
          bevelOffset={0}
          bevelSegments={5}
          smooth={0.1}
          castShadow={true}
        >
          <meshStandardMaterial attach="material" color="white" />
          Registration form
        </Text3D>
        <Text3D
          font={font.data}
          position={positionTextRegistration as [number, number, number]}
          size={sizeText}
          curveSegments={2}
          bevelEnabled={true}
          bevelThickness={0.5}
          bevelSize={0.05}
          bevelOffset={0}
          bevelSegments={5}
          smooth={0.1}
          castShadow={true}
        >
          <meshStandardMaterial attach="material" color="white" />
          {`Only authorized user can 
interact with site infrastructure`}
        </Text3D>
      </>
    );
  }
  return null;
};
