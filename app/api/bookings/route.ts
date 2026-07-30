import { NextRequest } from "next/server";

import { BookingController } from "@/server/controllers/booking.controller";
import { connectDB } from "@/server/database/mongodb";

const controller = new BookingController();

export async function GET(request: NextRequest) {
  await connectDB();
  return controller.getBookings(request);
}

export async function POST(request: NextRequest) {
  return controller.createBooking(request);
}
