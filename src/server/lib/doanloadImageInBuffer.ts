import axios from "axios";

export const downloadImageInBuffer = async (
  imageUrl: string,
): Promise<{ image: Buffer; contentType: string } | null> => {
  try {
    const response = await axios.get<ArrayBuffer>(imageUrl, {
      responseType: "arraybuffer",
    });

    return {
      image: Buffer.from(response.data),
      contentType: response.headers["content-type"] || "image/jpeg",
    };
  } catch (err) {
    console.warn(`Не вдалося завантажити зображення: ${imageUrl}`, err);
    return null; // пропускаємо, якщо помилка
  }
};
