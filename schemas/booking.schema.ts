import { BookingStatus } from "@/server/models/booking.model";
import { z } from "zod";

export const getBookingsSchema = z.object({
  page: z.coerce.number().default(1),

  pageSize: z.coerce.number().default(10),

  search: z.string().optional(),

  status: z.enum(["BOOKED", "COMPLETED", "CANCELLED"]).optional(),

  sortBy: z.string().optional(),

  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type getBookingsSchemaType = z.infer<typeof getBookingsSchema>;

export const checkoutSchema = z.object({
  id: z.string().min(1, "Booking id is required"),
});

export type checkoutSchemaType = z.infer<typeof checkoutSchema>;

export const createBookingSchema = z.object({
  customerName: z.string().min(2, "Customer name required"),

  serviceIds: z.array(z.string()).min(1, "Select at least one service"),

  appointmentAt: z.string().datetime(),
});

export type createBookingSchemaType = z.infer<typeof createBookingSchema>;
