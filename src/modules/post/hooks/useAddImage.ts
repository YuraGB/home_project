import { useGetTitleImages } from "./useGetTitleImages";

export const useAddImage = (imageExist: string | undefined) => {
  const { getTitleImagesAction, imagesArray, loadingImages } =
    useGetTitleImages();

  const onBlurTitleAction = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (!target.value || imageExist) return;

    getTitleImagesAction(target.value);
  };

  return {
    imagesArray,
    loadingImages,
    onBlurTitleAction,
  };
};
