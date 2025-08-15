import sharp from 'sharp';
import axios from 'axios';

const FREEIMAGE_API_URL = 'https://freeimage.host/api/1/upload';
const FORMAT = 'json';
const API_KEY = process.env.FREE_IMAGE_CLOUD_API_KEY!;

/**
 * Extracts the base64 payload from a data URL.
 * @param input - The data URL string.
 * @returns The base64 payload or the original input if it doesn't match the expected format.
 */
const getBase64Payload = (input: string): string => {
  const matches = input.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
  return matches ? matches[2] : input;
};

/**
 * Uploads a base64 image to the host and returns the image URL.
 * @param base64String - The base64 encoded image string.
 * @returns A promise that resolves to the uploaded image URL or null if the upload fails.
 */
export const uploadBase64Image = async (base64String: string) => {
  try {
    const imageData = getBase64Payload(base64String);

    const buffer = Buffer.from(imageData, 'base64');

    const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();

    const webpBase64 = webpBuffer.toString('base64');

    const formData = new URLSearchParams();
    formData.append('key', API_KEY);
    formData.append('action', 'upload');
    formData.append('source', webpBase64);
    formData.append('format', FORMAT);

    const response = await axios.post(FREEIMAGE_API_URL, formData.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (response.data.status_code === 200) {
      return response.data.image.url;
    } else {
      console.error('Upload error:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Axios error:', error);
    return null;
  }
};
