"use client";
import Image from "next/image";
import { ReactNode } from "react";

export const AddImage = ({
  listImages,
  setImage,
  imageExist,
}: {
  listImages: string[];
  setImage: (imgUrl: string) => void;
  imageExist?: string;
}): ReactNode => {
  return (
    <section className="absolute w-[calc(50%-30px)] h-[calc(100%-50px)] overflow-hidden bg-gray-100 left-0 top-10 flex flex-col mx-[15px]">
      <h3 className="font-bold w-full pt-6 px-2">Choose image</h3>
      <p className="px-2 text-sm text-gray-500">
        This image will be as poster for the title
      </p>
      <section className="relative flex justify-center  left-0 w-full  flex gap-2 p-2  overflow-auto flex flex-wrap">
        {listImages.map((itemUrl) => {
          return (
            <Image
              key={itemUrl}
              alt="image"
              src={itemUrl}
              width={300}
              height={100}
              style={{
                objectFit: "cover",
                cursor: "pointer",
                height: "100px",
              }}
              loading="lazy"
              onClick={() => {
                setImage(itemUrl);
              }}
              className={
                imageExist === itemUrl
                  ? "border border-solid border-emerald-600 border-2"
                  : ""
              }
            />
          );
        })}
      </section>
    </section>
  );
};
