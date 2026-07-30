import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { useToast } from "@/contexts/ToastContext";

export function useAppMutation<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown,
>(options: UseMutationOptions<TData, TError, TVariables, TContext>) {
  const { success, error } = useToast();

  const getErrorMessage = (e: unknown): string => {
    if (!e) return "Something went wrong";
    if (typeof e === "string") return e;
    if (typeof e === "object" && e !== null && "message" in e) {
      const maybeMessage = (e as { message?: unknown }).message;
      if (typeof maybeMessage === "string") return maybeMessage;
    }
    return "Something went wrong";
  };

  return useMutation({
    ...options,

    onSuccess: (data, variables, context) => {
      success("Operation successfully");

      if (options.onSuccess) {
        (options.onSuccess as unknown as (...args: unknown[]) => void)(
          data,
          variables,
          context,
        );
      }
    },

    onError: (err, variables, context) => {
      error(getErrorMessage(err));

      if (options.onError) {
        (options.onError as unknown as (...args: unknown[]) => void)(
          err,
          variables,
          context,
        );
      }
    },
  });
}
