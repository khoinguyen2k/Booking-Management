import { useQueryClient } from "@tanstack/react-query";

import { createBooking } from "@/services/booking.service";
import { useAppMutation } from "../useAppMutation";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: createBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}
