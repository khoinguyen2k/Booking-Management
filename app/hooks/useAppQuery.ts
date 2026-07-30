import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { AxiosError } from "axios";

import { useToast } from "@/contexts/ToastContext";

export function useAppQuery<TData = unknown, TError = AxiosError>(
  options: UseQueryOptions<TData, TError>,
) {
  const { error: showError } = useToast();

  return useQuery({
    ...options,

    throwOnError: false,

    meta: {
      onError: (error: TError) => {
        let message = "Something went wrong";
        if (error) {
          if (typeof error === "string") message = error;
          else if (
            typeof error === "object" &&
            error !== null &&
            "message" in error
          ) {
            const m = (error as { message?: unknown }).message;
            if (typeof m === "string") message = m;
          }
        }

        showError(message);
      },
    },
  });
}
