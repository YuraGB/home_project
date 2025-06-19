import sharp from "sharp";

export function resizeToCover(
  bufferImage: Buffer,
  targetWidth: number = 300,
  targetHeight: number = 100,
  fit: keyof sharp.FitEnum | undefined = "cover",
  position: string = "center",
) {
  // Обробка в стилі object-fit: cover
  return sharp(bufferImage)
    .resize(targetWidth, targetHeight, {
      fit, // відповідає object-fit: cover
      position, // можна змінити: "top", "left", "right", etc.
    })
    .toFormat("webp"); // або "png", "webp", тощо
}
