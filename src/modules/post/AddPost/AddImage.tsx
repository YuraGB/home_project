"use client";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

export const AddImage = ({
  listImages,
  setImage,
  loadingImages = false,
  imageExist,
}: {
  listImages?: string[] | null;
  setImage: (imgUrl: string) => void;
  imageExist?: string;
  loadingImages?: boolean;
}): ReactNode => {
  if (loadingImages) {
    return (
      <section className="flex flex-col mx-[15px] items-center justify-center align-middle">
        <h3 className="font-bold w-full pt-6 px-2">
          <FormattedMessage
            id={"loadingImages"}
            defaultMessage={"Loading images..."}
          />
        </h3>
        <LoaderCircle className={"animate-spin"} />
      </section>
    );
  }

  if (!listImages || listImages.length === 0) {
    return null;
  }

  return (
    <section className="absolute w-[calc(50%-30px)] h-[calc(100%-50px)] overflow-hidden left-0 top-10 flex flex-col mx-[15px]">
      <h3 className="font-bold w-full pt-6 px-2">Choose image</h3>
      <p className="px-2 text-sm">This image will be as poster for the title</p>
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
