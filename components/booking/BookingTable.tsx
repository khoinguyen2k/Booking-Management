"use client";

import type { TableColumnsType, TableProps } from "antd";

import { BookingDocument } from "@/server/models/booking.model";

import DataTable from "../DataTable";

import TablePagination from "../TablePagination";

import BookingStatusTag from "./BookingStatusTag";

import CheckoutButton from "./CheckoutButton";

interface Props {
  data: BookingDocument[];

  loading: boolean;

  pagination: {
    page: number;

    pageSize: number;

    total: number;
  };

  onPaginationChange: (page: number, pageSize: number) => void;

  onTableChange?: TableProps<BookingDocument>["onChange"];
}

export default function BookingTable({
  data,

  loading,

  pagination,

  onPaginationChange,

  onTableChange,
}: Props) {
  const columns: TableColumnsType<BookingDocument> = [
    {
      title: "Customer",

      dataIndex: "customerName",

      key: "customerName",

      width: 150,

      fixed: "left",
    },

    {
      title: "Services",

      key: "services",

      width: 250,

      render: (_, record) =>
        record.services.map((service) => service.name).join(", "),
    },

    {
      title: "Time",

      dataIndex: "appointmentAt",

      key: "appointmentAt",

      width: 180,

      sorter: true,

      render: (value) => new Date(value).toLocaleString(),
    },

    {
      title: "Price",

      dataIndex: "totalPrice",

      key: "totalPrice",

      width: 120,

      sorter: true,

      render: (value) => `$${value}`,
    },

    {
      title: "Status",

      dataIndex: "status",

      key: "status",

      width: 120,

      render: (status) => <BookingStatusTag status={status} />,
    },

    {
      title: "Action",

      key: "action",

      width: 120,

      fixed: "right",

      align: "center",

      render: (_, record) =>
        record.status === "BOOKED" ? (
          <CheckoutButton bookingId={record._id} />
        ) : null,
    },
  ];

  return (
    <div className="flex flex-col">
      <DataTable
        columns={columns}

        data={data}

        loading={loading}

        rowKey="_id"

        onChange={onTableChange}

        scroll={{
          x: 1000,
        }}
      />

      <TablePagination
        page={pagination.page}

        pageSize={pagination.pageSize}

        total={pagination.total}

        onChange={onPaginationChange}
      />
    </div>
  );
}
