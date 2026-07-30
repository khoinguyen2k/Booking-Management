"use client";

import { Table } from "antd";

interface Props {
  data: any[];
}

export default function LatestOrdersTable({ data }: Props) {
  const columns = [
    {
      title: "Customer",

      key: "customer",

      render: (_: any, record: any) => record.bookingId?.customerName,
    },

    {
      title: "Services",

      key: "services",

      render: (_: any, record: any) =>
        record.bookingId?.services?.map((s: any) => s.name).join(", "),
    },

    {
      title: "Total",

      dataIndex: "total",

      render: (value: number) => `$${value}`,
    },

    {
      title: "Date",

      dataIndex: "createdAt",

      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <Table
      rowKey="_id"

      columns={columns}

      dataSource={data}

      pagination={false}

      scroll={{
        x: 700,
      }}
    />
  );
}
