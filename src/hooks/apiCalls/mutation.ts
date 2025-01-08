import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

type TServiceFn<T, N> = (data: T) => Promise<N | null>;

// generic T, N is required
// T - args for serviceFn
// N - return type for serviceFn
export const useMutationApi = <T, N>(serviceFn: TServiceFn<T, N>) => {
  const { refresh } = useRouter();
  return useMutation({
    mutationFn: serviceFn,
    onSuccess: () => refresh(),
  });
};
