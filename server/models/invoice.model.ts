import { Schema, model, models } from "mongoose";

const InvoiceSchema = new Schema(
    {
        bookingId: Schema.Types.ObjectId,

        subtotal: Number,

        discount: Number,

        tax: Number,

        total: Number,

        paidAt: Date
    },
    {
        timestamps: true
    }
);

export const Invoice =
    models.Invoice || model("Invoice", InvoiceSchema);