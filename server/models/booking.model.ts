import { InferSchemaType, Schema, model, models } from "mongoose";

export enum BookingStatus {
  BOOKED = "BOOKED",
  ORDER_CREATED = "ORDER_CREATED",
  CANCELLED = "CANCELLED",
}

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    duration: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const BookingSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    employeeName: {
      type: String,
      required: true,
      trim: true,
    },

    services: {
      type: [ServiceSchema],
      default: [],
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

    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export type BookingDocument = InferSchemaType<typeof BookingSchema>;

export const Booking =
  models.Booking || model("Booking", BookingSchema);