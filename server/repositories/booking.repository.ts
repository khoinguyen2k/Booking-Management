import { Booking } from "../models/booking.model";

import { getBookingsSchemaType } from "@/schemas/booking.schema";

export class BookingRepository {
  async findAll(query: getBookingsSchemaType) {
    const {
      page,

      pageSize,

      sortBy = "createdAt",

      sortOrder = "desc",

      search,

      status,
    } = query;

    const skip = (page - 1) * pageSize;

    const filter: any = {};

    // Search customer name

    if (search) {
      filter.customerName = {
        $regex: search,

        $options: "i",
      };
    }

    // Filter status

    if (status) {
      filter.status = status;
    }

    const sort: any = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const [items, total] = await Promise.all([
      Booking.find(filter)

        .sort(sort)

        .skip(skip)

        .limit(pageSize)

        .lean(),

      Booking.countDocuments(filter),
    ]);

    return {
      items,

      pagination: {
        page,

        pageSize,

        total,

        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async findById(id: string) {
    return Booking.findById(id);
  }

  async update(id: string, data: any) {
    return Booking.findByIdAndUpdate(
      id,

      data,

      {
        new: true,
      },
    );
  }

  async create(data: any) {
    return Booking.create(data);
  }
}
