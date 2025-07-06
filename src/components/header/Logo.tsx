import Image from "next/image";
import LogoImage from "./assets/Logo.webp";

export const Logo = () => {
  return (
    <Image
      src={LogoImage}
      alt={"logo of the site"}
      width={100}
      height={50}
      loading={"eager"}
    />
  );
};
