import { Sky } from "@react-three/drei";
import { Ocean } from "@/components/background/Ocean";

import dynamic from "next/dynamic";

const City2 = dynamic(() =>
  import("@/components/background/City2").then((mod) => mod.City2),
);
const Wall = dynamic(() =>
  import("@/components/background/Wall").then((mod) => mod.Wall),
);

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
      {/*<City />*/}
      <City2 />
      <Sky distance={10000} rayleigh={0.5} turbidity={5} />
    </>
  );
};
