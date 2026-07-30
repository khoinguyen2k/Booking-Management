"use client";

import { Table } from "antd";

import type { TableColumnsType, TableProps } from "antd";

interface Props<T> {
  columns: TableColumnsType<T>;

  data: T[];

  loading?: boolean;

  rowKey: string | ((record: T) => string);

  onChange?: TableProps<T>["onChange"];

  scroll?: {
    x?: number;

    y?: number | string;
  };
}

export default function DataTable<T>({
  columns,

  data,

  loading,

  rowKey,

  onChange,

  scroll,
}: Props<T>) {
  return (
    <Table
      columns={columns}

      dataSource={data}

      loading={loading}

      rowKey={rowKey}

      pagination={false}

      sticky

      scroll={scroll}

      onChange={onChange}
    />
  );
}
