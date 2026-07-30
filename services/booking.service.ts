import { api } from "@/app/lib/axios";
import {
  createBookingSchemaType,
  getBookingsSchemaType,
} from "@/schemas/booking.schema";

export async function getBookings(params: getBookingsSchemaType) {
  const response = await api.get("/bookings", {
    params,
  });

  return response.data.data;
}

export async function checkoutBooking(bookingId: string) {
  const response = await api.post(`/bookings/${bookingId}/checkout`);

  return response.data.data;
}

export async function createBooking(data: createBookingSchemaType) {
  const response = await api.post("/bookings", data);

  return response.data.data;
}
