import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewRating } from "@/server/controllers/rating";

export const useAddRating = (id: number) => {
  const queryClient = useQueryClient();
  const {
    mutate: createRating,
    data: newRatingCreated,
    isPending: loadingNewRating,
    error: newRatingError,
  } = useMutation({
    mutationFn: addNewRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rating", id] });
    },
  });

  return {
    createRating,
    newRatingCreated,
    loadingNewRating,
    newRatingError,
  };
};
