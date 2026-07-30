"use client";

import { Input, Select, Space } from "antd";

interface Props {
  value: {
    search: string;

    status?: string;
  };

  onChange: (value: any) => void;
}

export default function BookingFilter({
  value,

  onChange,
}: Props) {
  return (
    <Space wrap>
      <Input.Search
        placeholder="Search customer"

        allowClear

        style={{
          width: 300,
        }}

        value={value.search}

        onChange={(event) => {
          onChange({
            ...value,

            search: event.target.value,

            page: 1,
          });
        }}
      />

      <Select
        placeholder="Filter status"

        allowClear

        style={{
          width: 160,
        }}

        value={value.status}

        options={[
          {
            label: "Booked",
            value: "BOOKED",
          },

          {
            label: "Completed",
            value: "COMPLETED",
          },
        ]}

        onChange={(status) => {
          onChange({
            ...value,

            status,

            page: 1,
          });
        }}
      />
    </Space>
  );
}
