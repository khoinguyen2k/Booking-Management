import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  name: string;

  price: number;

  duration: number;

  active: boolean;
}

const ServiceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Service =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
