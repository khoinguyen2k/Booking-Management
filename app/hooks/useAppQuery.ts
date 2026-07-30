import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { AxiosError } from "axios";

import { useToast } from "@/contexts/ToastContext";

export function useAppQuery<TData = unknown, TError = AxiosError>(
  options: UseQueryOptions<TData, TError>,
) {
  const { showError } = useToast();

  return useQuery({
    ...options,

    throwOnError: false,

    meta: {
      onError: (error: TError) => {
        const message = (error as any)?.message ?? "Something went wrong";

        showError(message);
      },
    },
  });
}
