"use server";
import axios from "axios";

type UploadResult = string | null;

const FREEIMAGE_API_URL = "https://freeimage.host/api/1/upload";
const FORMAT = "json";

/**
 * Отримує чистий base64 з рядка, який може містити префікс `data:image/...;base64,`
 * @param input рядок base64 з префіксом
 * @returns чистий base64 рядок
 */
const getBase64Payload = (input: string): string => {
  const matches = input.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
  if (matches) return matches[2];
  return input; // fallback: припускаємо, що це вже чистий base64
};

/**
 * Завантажує base64-зображення на freeimage.host
 * @param base64Image рядок base64 з префіксом `data:image/...;base64,`
 * @param apiKey твій API ключ
 */
export const uploadBase64Image = async (
  base64String: string,
): Promise<UploadResult> => {
  try {
    const imageData = getBase64Payload(base64String);

    if (!imageData) {
      throw new Error("Неправильний формат base64-зображення");
    }

    const formData = new URLSearchParams();
    formData.append("key", process.env.FREE_IMAGE_CLOUD_API_KEY!);
    formData.append("action", "upload");
    formData.append("source", imageData);
    formData.append("format", FORMAT);

    const response = await axios.post(FREEIMAGE_API_URL, formData.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.data.status_code === 200) {
      return response.data.image.url;
    } else {
      console.error("Upload error:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Axios error:", error);
    return null;
  }
};
