"use client";

import { useState } from "react";

export interface TableQuery {
  page: number;

  pageSize: number;

  sortBy?: string;

  sortOrder?: "asc" | "desc";
}

export function useTableQuery(initial?: Partial<TableQuery>) {
  const [query, setQuery] = useState<TableQuery>({
    page: 1,

    pageSize: 10,

    sortBy: "createdAt",

    sortOrder: "desc",

    ...initial,
  });

  const handlePaginationChange = (
    page: number,

    pageSize: number,
  ) => {
    setQuery((prev) => ({
      ...prev,

      page,

      pageSize,
    }));
  };

  const handleTableChange = (
    pagination: any,

    filters: any,

    sorter: any,
  ) => {
    setQuery((prev) => ({
      ...prev,

      page: 1,

      pageSize: pagination.pageSize ?? prev.pageSize,

      sortBy: sorter.field ?? prev.sortBy,

      sortOrder: sorter.order === "ascend" ? "asc" : "desc",
    }));
  };

  return {
    query,

    setQuery,

    handlePaginationChange,

    handleTableChange,
  };
}
