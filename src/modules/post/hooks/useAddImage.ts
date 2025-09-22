import { FieldValues, UseFormReturn } from "react-hook-form";
import { useGetTitleImages } from "./useGetTitleImages";
import { useCallback } from "react";
import { toast } from "@/hooks/use-toast";

export const useAddImage = <T extends FieldValues = FieldValues>(
  form: UseFormReturn<T>,
  imageExist?: string,
) => {
  const { getTitleImagesAction, imagesArray, loadingImages } =
    useGetTitleImages();

  /**
   * This function is used to load images based on the title input.
   * It checks if an image already exists, and if not, it fetches images related to the title.
   * If the title input is empty, it does not fetch any images.
   */
  const loadImageAction = useCallback(() => {
    // Get the title from the form
    const titleExist = form.getValues(
      "name" as unknown as import("react-hook-form").Path<T>,
    );
    // If image already exists, do not fetch images again
    if (imageExist) return;
    // If title exists, fetch images related to the title
    if (titleExist) {
      getTitleImagesAction(titleExist);
    } else {
      // If no title is provided, show a toast notification
      // to inform the user that they need to enter a title to fetch images.
      // This is important to prevent unnecessary API calls when the title is empty.
      //todo translation
      toast({
        variant: "destructive",
        title: "No title provided",
        description: "Please enter a title to fetch images.",
      });
    }
  }, [form, getTitleImagesAction, imageExist, toast]);

  return {
    imagesArray,
    loadingImages,
    getTitleImagesAction,
    loadImageAction,
  };
};
