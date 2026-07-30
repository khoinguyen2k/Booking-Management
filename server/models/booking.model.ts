import mongoose, { Schema, Document } from "mongoose";

export enum BookingStatus {
  BOOKED = "BOOKED",

  COMPLETED = "COMPLETED",

  CANCELLED = "CANCELLED",
}

interface BookingService {
  serviceId: string;

  name: string;

  price: number;
}

export interface BookingDocument extends Document {
  customerName: string;

  services: BookingService[];

  totalPrice: number;

  appointmentAt: Date;

  status: BookingStatus;

  orderId?: string;

  completedAt?: Date;
}

const BookingSchema = new Schema<BookingDocument>(
  {
    customerName: {
      type: String,
      required: true,
    },

    services: [
      {
        serviceId: String,

        name: String,

        price: Number,
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    appointmentAt: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.BOOKED,
    },

    orderId: String,

    completedAt: Date,
  },
  {
    timestamps: true,
  },
);

export const Booking =
  mongoose.models.Booking ||
  mongoose.model<BookingDocument>("Booking", BookingSchema);
