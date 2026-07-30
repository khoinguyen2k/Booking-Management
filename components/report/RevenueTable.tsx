"use client";

import { Table } from "antd";

interface Props {
  data: any[];
}

export default function RevenueTable({ data }: Props) {
  const columns = [
    {
      title: "Date",

      dataIndex: "_id",
    },

    {
      title: "Revenue",

      dataIndex: "revenue",

      render: (value: number) => `$${value}`,
    },

    {
      title: "Orders",

      dataIndex: "orders",
    },
  ];

  return (
    <Table
      rowKey="_id"

      columns={columns}

      dataSource={data}
      scroll={{
        x: 700,
      }}
      pagination={false}
    />
  );
}
