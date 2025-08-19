import { useGetTitleImages } from "./useGetTitleImages";

export const useAddImage = () => {
  const { getTitleImagesAction, imagesArray, loadingImages } =
    useGetTitleImages();

  return {
    imagesArray,
    loadingImages,
    getTitleImagesAction,
  };
};
