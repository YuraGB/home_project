import { downloadImageInBuffer } from "./doanloadImageInBuffer";

/**
 * Завантажує зображення по URL та конвертує в Base64 Data URL.
 */
export const convertImageToBase64 = async (
  imageUrl: string,
): Promise<string | null> => {
  try {
    const image = await downloadImageInBuffer(imageUrl);
    if (image === null) {
      return null; // якщо не вдалося завантажити зображення
    }
    return `data:${image.contentType};base64,${image.image.toString("base64")}`;
  } catch (err) {
    console.warn(`Не вдалося завантажити: ${imageUrl}`, err);
    return null; // пропускаємо, якщо помилка
  }
};
