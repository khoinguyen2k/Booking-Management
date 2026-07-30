import { BookingDocument } from "@/server/models/booking.model";
import { useAppQuery } from "../useAppQuery";
import { getBookings } from "@/services/booking.service";
import { getBookingsSchemaType } from "@/schemas/booking.schema";

interface BookingResponse {
  items: BookingDocument[];

  pagination: {
    page: number;

    pageSize: number;

    total: number;
  };
}

export function useBookings(params: getBookingsSchemaType) {
  return useAppQuery<BookingResponse>({
    queryKey: ["bookings", params],

    queryFn: () => getBookings(params),

    staleTime: 1000 * 60 * 5,
  });
}
