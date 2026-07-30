import { AppError } from "../lib/errors/AppError";

import { BookingRepository } from "../repositories/booking.repository";

import { OrderRepository } from "../repositories/order.repository";

import { InvoiceRepository } from "../repositories/invoice.repository";

export class CheckoutService {
  private bookingRepository = new BookingRepository();

  private orderRepository = new OrderRepository();

  private invoiceRepository = new InvoiceRepository();

  async execute(bookingId: string) {
    // 1. Find booking

    const booking = await this.bookingRepository.findById(bookingId);

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    // 2. Validate status

    if (booking.status !== "BOOKED") {
      throw new AppError("Booking already completed", 400);
    }

    // 3. Calculate subtotal

    const subtotal = booking.services.reduce((total, service) => {
      return total + service.price;
    }, 0);

    if (subtotal <= 0) {
      throw new AppError("Invalid booking price", 400);
    }

    // 4. Calculate money

    const discount = 0;

    const tax = subtotal * 0.1;

    const total = subtotal - discount + tax;

    // 5. Create Order

    const order = await this.orderRepository.create({
      bookingId: booking._id,

      subtotal,

      discount,

      tax,

      total,

      status: "PAID",
    });

    // 6. Create Invoice

    const invoice = await this.invoiceRepository.create({
      orderId: order._id,

      total,

      paidAt: new Date(),
    });

    // 7. Update Booking

    await this.bookingRepository.update(
      bookingId,

      {
        status: "COMPLETED",

        completedAt: new Date(),

        orderId: order._id,
      },
    );

    return {
      orderId: order._id,

      invoiceId: invoice._id,

      subtotal,

      tax,

      total,
    };
  }
}
