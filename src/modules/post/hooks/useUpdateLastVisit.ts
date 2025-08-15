import { useMutationApi } from '@/hooks/apiCalls/mutation';
import { updateLastVisitedPost } from '@/server/controllers/post/postService';

export const useUpdateLastVisit = () => {
  const {
    data: success,
    isPending: loadingUpdate,
    mutate: updateVisit,
    error: errorUpdateVisit,
  } = useMutationApi<number, boolean | undefined>(updateLastVisitedPost);

  return {
    success,
    loadingUpdate,
    updateVisit,
    errorUpdateVisit,
  };
};
