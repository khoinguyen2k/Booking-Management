import mongoose from "mongoose";
import { connectDB } from "./mongodb";
import { Booking, BookingStatus } from "../models/booking.model";

async function seed() {
  try {
    await connectDB();

    console.log("Connected MongoDB");

    await Booking.deleteMany();

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

    const employees = [
      "Anna",
      "David",
      "Lucy",
      "John",
    ];

    const serviceCatalog = [
      {
        name: "Hair Cut",
        price: 200,
        duration: 30,
      },
      {
        name: "Hair Wash",
        price: 80,
        duration: 15,
      },
      {
        name: "Hair Color",
        price: 500,
        duration: 120,
      },
      {
        name: "Spa",
        price: 700,
        duration: 90,
      },
      {
        name: "Nail",
        price: 250,
        duration: 45,
      },
    ];

    const bookings = [];

    for (let i = 0; i < 100; i++) {
      const numberOfServices = Math.floor(Math.random() * 3) + 1;

      const services = Array.from({ length: numberOfServices }, () => {
        return serviceCatalog[
          Math.floor(Math.random() * serviceCatalog.length)
        ];
      });

      bookings.push({
        customerName:
          customers[Math.floor(Math.random() * customers.length)],

        employeeName:
          employees[Math.floor(Math.random() * employees.length)],

        services,

        appointmentAt: new Date(
          Date.now() +
            Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000
        ),

        status: BookingStatus.BOOKED,

        orderId: null,
      });
    }

    await Booking.insertMany(bookings);

    console.log(`Seeded ${bookings.length} bookings`);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();