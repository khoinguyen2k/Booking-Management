import { Booking, BookingStatus } from "@/server/models/booking.model";

import type { IService } from "@/server/models/service.model";

export async function seedBookings(serviceCatalog: IService[]) {
  await Booking.deleteMany({});

  const customers = [
    "Nguyen",
    "An",
    "Linh",
    "Hoa",
    "Long",
    "Minh",
    "Vy",
    "Trang",
    "Tuan",
    "Phuong",
  ];

  const employees = ["Anna", "David", "Lucy", "John"];

  const bookings = [];

  for (let i = 0; i < 100; i++) {
    const numberOfServices = Math.floor(Math.random() * 3) + 1;

    const services = Array.from(
      {
        length: numberOfServices,
      },
      () => {
        const service =
          serviceCatalog[Math.floor(Math.random() * serviceCatalog.length)];

        return {
          serviceId: service._id,

          name: service.name,

          price: service.price,
        };
      },
    );

    const totalPrice = services.reduce(
      (total, service) => total + service.price,
      0,
    );

    bookings.push({
      customerName: customers[Math.floor(Math.random() * customers.length)],

      employeeName: employees[Math.floor(Math.random() * employees.length)],

      services,

      totalPrice,

      appointmentAt: new Date(
        Date.now() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
      ),

      status: BookingStatus.BOOKED,

      orderId: null,
    });
  }

  await Booking.insertMany(bookings);

  console.log(`✅ Seeded ${bookings.length} bookings`);
}
