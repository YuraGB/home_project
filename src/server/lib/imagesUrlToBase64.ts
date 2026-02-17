import { resizeToCover } from "../services/image/formatImage";

export const imagesUrlToBase64 = async (
  imagesArray: { original?: string }[],
) => {
  const base64Images = await Promise.all(
    imagesArray.map(async (item) => {
      if (!item.original) return null;

      try {
        const response = await fetch(item.original, {
          headers: {
            "User-Agent": "Mozilla/5.0",
          },
        });

        const contentType = response.headers.get("content-type");

        // ❗ Перевіряємо що це картинка
        if (!contentType || !contentType.startsWith("image/")) {
          console.warn("Not an image:", item.original);
          return null;
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const resizedBuffer = await resizeToCover(buffer).toBuffer();

        return `data:image/webp;base64,${resizedBuffer.toString("base64")}`;
      } catch (e) {
        console.error(`Error processing image: ${item.original}`, e);
        return null;
      }
    }),
  );

  return base64Images.filter(Boolean);
};
