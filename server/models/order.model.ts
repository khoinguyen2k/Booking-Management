import { InferSchemaType, Schema, model, models } from "mongoose";

export enum OrderStatus {
  DRAFT = "DRAFT",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

const OrderItemSchema = new Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    unitPrice: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const OrderSchema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    employeeName: {
      type: String,
      required: true,
    },

    items: {
      type: [OrderItemSchema],
      default: [],
    },

    subtotal: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.DRAFT,
    },
  },
  {
    timestamps: true,
  }
);

export type OrderDocument = InferSchemaType<typeof OrderSchema>;

export const Order =
  models.Order || model("Order", OrderSchema);