import {
  createBookingSchemaType,
  getBookingsSchemaType,
} from "@/schemas/booking.schema";

import { AppError } from "../lib/errors/AppError";

import { BookingRepository } from "../repositories/booking.repository";

import { ServiceRepository } from "../repositories/service.repository";

export class BookingService {
  private bookingRepository = new BookingRepository();

  private serviceRepository = new ServiceRepository();

  async getBookings(query: getBookingsSchemaType) {
    return this.bookingRepository.findAll(query);
  }

  async createBooking(data: createBookingSchemaType) {
    const appointmentAt = new Date(data.appointmentAt);

    if (Number.isNaN(appointmentAt.getTime())) {
      throw new AppError("Invalid appointment time", 400);
    }

    const services = await this.serviceRepository.findByIds(data.serviceIds);

    if (services.length !== data.serviceIds.length) {
      throw new AppError("One or more services do not exist", 400);
    }

    const bookingServices = services.map((service) => ({
      serviceId: service._id,

      name: service.name,

      price: service.price,

      duration: service.duration,
    }));

    const totalPrice = bookingServices.reduce(
      (total, service) => total + service.price,
      0,
    );

    return this.bookingRepository.create({
      customerName: data.customerName.trim(),

      services: bookingServices,

      totalPrice,

      appointmentAt,

      status: "BOOKED",
    });
  }
}
