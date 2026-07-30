import { useQueryClient } from "@tanstack/react-query";

import { useAppMutation } from "../useAppMutation";
import { checkoutBooking } from "@/services/booking.service";

export function useCheckout() {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: checkoutBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}
