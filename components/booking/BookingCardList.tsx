"use client";

import { Card, Typography, Pagination } from "antd";

import { BookingDocument } from "@/server/models/booking.model";

import BookingStatusTag from "./BookingStatusTag";

import CheckoutButton from "./CheckoutButton";
import TablePagination from "../TablePagination";

const { Text } = Typography;

interface Props {
  data: BookingDocument[];

  loading: boolean;

  pagination: {
    page: number;

    pageSize: number;

    total: number;
  };

  onPaginationChange: (page: number, pageSize: number) => void;
}

export default function BookingCardList({
  data,

  loading,

  pagination,

  onPaginationChange,
}: Props) {
  return (
    <div className="space-y-4">
      {loading && <div>Loading...</div>}

      {data.map((booking) => (
        <Card key={booking._id}>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Text strong>{booking.customerName}</Text>

              <BookingStatusTag status={booking.status} />
            </div>

            <div>
              <Text type="secondary">Services</Text>

              <div>{booking.services.map((s) => s.name).join(", ")}</div>
            </div>

            <div className="flex justify-between">
              <Text>Price</Text>

              <Text strong>${booking.totalPrice}</Text>
            </div>

            <div>
              <Text type="secondary">Appointment</Text>

              <div>{new Date(booking.appointmentAt).toLocaleString()}</div>
            </div>

            {booking.status === "BOOKED" && (
              <CheckoutButton bookingId={booking._id} />
            )}
          </div>
        </Card>
      ))}

      <TablePagination
        page={pagination.page}

        pageSize={pagination.pageSize}

        total={pagination.total}

        onChange={onPaginationChange}
      />
    </div>
  );
}
