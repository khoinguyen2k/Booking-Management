import { NextRequest } from "next/server";
import { BookingService } from "../services/booking.service";
import {
  createBookingSchema,
  getBookingsSchema,
} from "@/schemas/booking.schema";
import { ApiResponse } from "../lib/response/ApiResponse";
import { handleError } from "../lib/errors/errorHandler";

export class BookingController {
  private bookingService = new BookingService();

  async getBookings(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;

      const query = getBookingsSchema.parse(Object.fromEntries(searchParams));

      const data = await this.bookingService.getBookings(query);

      return ApiResponse.success(data);
    } catch (error: any) {
      return handleError(error);
    }
  }

  async createBooking(request: NextRequest) {
    try {
      const body = await request.json();

      const payload = createBookingSchema.parse(body);

      const booking = await this.bookingService.createBooking(payload);

      return ApiResponse.success(
        booking,

        "Booking created successfully",

        201,
      );
    } catch (error) {
      return handleError(error);
    }
  }
}
