import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { useToast } from "@/contexts/ToastContext";

export function useAppMutation<
  TData = unknown,
  TVariables = unknown,
  TError = any,
>(options: UseMutationOptions<TData, TError, TVariables>) {
  const { success, error } = useToast();

  return useMutation({
    ...options,

    onSuccess: (data, variables, context) => {
      success("Operation successfully");

      options.onSuccess?.(data, variables, context);
    },

    onError: (err, variables, context) => {
      error(err?.message ?? "Something went wrong");

      options.onError?.(err, variables, context);
    },
  });
}
