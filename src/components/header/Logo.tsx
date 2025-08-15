import Image from 'next/image';
import LogoImage from './assets/Logo.webp';

export const Logo = () => {
  return (
    <Image
      src={LogoImage}
      alt={'logo of the site'}
      width={150}
      height={100}
      loading={'eager'}
      priority={true}
    />
  );
};
