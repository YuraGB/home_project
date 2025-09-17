import Image from "next/image";
import LogoImage from "./assets/Logo.webp";

export const Logo = () => {
  return (
    <Image
      src={LogoImage}
      alt={"The Favly logo"}
      width={150}
      height={100}
      priority={true}
      fetchPriority="high"
    />
  );
};
