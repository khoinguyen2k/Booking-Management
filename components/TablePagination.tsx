"use client";

import { Pagination } from "antd";

interface Props {
  page: number;

  pageSize: number;

  total: number;

  onChange: (page: number, pageSize: number) => void;
}

export default function TablePagination({
  page,

  pageSize,

  total,

  onChange,
}: Props) {
  return (
    <div className="flex justify-end border-t px-4 py-3 bg-white sticky bottom-0 z-20">
      <Pagination
        current={page}

        pageSize={pageSize}

        total={total}

        showSizeChanger

        showTotal={(total) => `Total ${total}`}

        onChange={(page, pageSize) => onChange(page, pageSize)}
      />
    </div>
  );
}
