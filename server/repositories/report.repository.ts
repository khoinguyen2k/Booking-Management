import Order from "../models/order.model";

export class ReportRepository {
  async getSummary(from?: Date, to?: Date) {
    const match: any = {
      status: "PAID",
    };

    this.applyDateFilter(match, from, to);

    const result = await Order.aggregate([
      {
        $match: match,
      },

      {
        $group: {
          _id: null,

          revenue: {
            $sum: "$total",
          },

          orders: {
            $sum: 1,
          },

          averageOrder: {
            $avg: "$total",
          },
        },
      },
    ]);

    return (
      result[0] || {
        revenue: 0,
        orders: 0,
        averageOrder: 0,
      }
    );
  }

  async getLatestOrders() {
    return Order.find({
      status: "PAID",
    })
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .populate({
        path: "bookingId",
        select: "customerName services appointmentAt",
      })
      .lean();
  }

  async getRevenueByService() {
    return Order.aggregate([
      {
        $match: {
          status: "PAID",
        },
      },

      {
        $lookup: {
          from: "bookings",

          localField: "bookingId",

          foreignField: "_id",

          as: "booking",
        },
      },

      {
        $unwind: "$booking",
      },

      {
        $unwind: "$booking.services",
      },

      {
        $group: {
          _id: "$booking.services.name",

          quantity: {
            $sum: 1,
          },

          revenue: {
            $sum: "$booking.services.price",
          },
        },
      },

      {
        $sort: {
          revenue: -1,
        },
      },
    ]);
  }

  async getRevenueByDate(from?: Date, to?: Date) {
    const match: any = {
      status: "PAID",
    };

    this.applyDateFilter(match, from, to);

    return Order.aggregate([
      {
        $match: match,
      },

      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",

              date: "$createdAt",
            },
          },

          revenue: {
            $sum: "$total",
          },

          orders: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  }

  private applyDateFilter(
    match: any,

    from?: Date,

    to?: Date,
  ) {
    if (!from && !to) {
      return;
    }

    match.createdAt = {};

    if (from) {
      match.createdAt.$gte = from;
    }

    if (to) {
      match.createdAt.$lte = to;
    }
  }
}
