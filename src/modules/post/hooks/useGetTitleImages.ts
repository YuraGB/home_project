import { useMutationApi } from "@/hooks/apiCalls/mutation";
import { getTitleImages } from "@/server/services/image/getTitleImages";

export const useGetTitleImages = () => {
  const {
    data: imagesArray,
    isPending: loadingImages,
    mutate: getTitleImagesAction,
    error: errorGettingImages,
  } = useMutationApi<string, string[] | null>(getTitleImages);

  return {
    imagesArray,
    loadingImages,
    getTitleImagesAction,
    errorGettingImages,
  };
};
