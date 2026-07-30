import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PAID", "CANCELLED"],
      default: "PAID",
    },
  },
  {
    timestamps: true,
  },
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
