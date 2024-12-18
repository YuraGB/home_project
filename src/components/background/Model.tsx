import { Sky } from "@react-three/drei";
const Ocean = dynamic(() =>
  import("@/components/background/Ocean").then((mod) => mod.Ocean),
);
import { Wall } from "@/components/background/Wall";
import dynamic from "next/dynamic";
import { City } from "@/components/background/City";

export const Model = () => {
  return (
    <>
      <directionalLight
        position={[-100, 90, 550]}
        intensity={0.8}
        castShadow={true}
        shadow-mapSize-width={1024} // Можна використовувати для налаштування розміру карт тіні
        shadow-mapSize-height={1024}
        shadow-radius={1200}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-100, 300, 300, -100]}
        />
      </directionalLight>
      <ambientLight intensity={0.8} />
      <Ocean />
      <Wall />
      <City />
      <Sky distance={10000} rayleigh={0.5} turbidity={5} />
    </>
  );
};
