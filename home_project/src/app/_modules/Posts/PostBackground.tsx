import { ReactNode } from "react";

export const PostBackground = ({
  image,
}: {
  image: string | null;
}): ReactNode => {
  if (!image) return null;
  return (
    <span
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className={"absolute w-full h-full top-0 left-0 z-0"}
    />
  );
};
