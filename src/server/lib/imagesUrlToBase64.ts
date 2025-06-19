import { resizeToCover } from "../services/ai/formatImage";
import { downloadImageInBuffer } from "./doanloadImageInBuffer";

export const imagesUrlToBase64 = async (
  imagesArray: { original: string }[],
) => {
  const base64Images = await Promise.all(
    imagesArray.map(async (item) => {
      if ("original" in item && typeof item.original === "string") {
        try {
          const buffer = await downloadImageInBuffer(item.original);
          if (buffer) {
            const resizedBuffer = await resizeToCover(buffer.image).toBuffer();
            return `data:image/webp;base64,${resizedBuffer.toString("base64")}`;
          }
        } catch (e) {
          console.error(`Error processing image: ${item.original}`, e);
        }
      }
      return null;
    }),
  );

  return base64Images.filter((image) => image !== null);
};
