"use client";

import { useState } from "react";

import { Typography } from "antd";

import { useBookings } from "../hooks/bookings/useBooking";

import { useTableQuery } from "../hooks/useTableQuery";

import { useIsMobile } from "../hooks/useIsMobile";

import CreateBookingModal from "@/components/booking/CreateBookingModal";

import BookingFilter from "@/components/booking/BookingFilter";

import BookingTable from "@/components/booking/BookingTable";

import BookingCardList from "@/components/booking/BookingCardList";

const { Title } = Typography;

export default function BookingPage() {
  const isMobile = useIsMobile();

  const {
    query,

    setQuery,

    handlePaginationChange,

    handleTableChange,
  } = useTableQuery({
    pageSize: 10,
  });

  const [filter, setFilter] = useState({
    search: "",

    status: undefined,
  });

  const {
    data,

    isLoading,
  } = useBookings({
    ...query,

    search: filter.search,

    status: filter.status,
  });

  const handleFilterChange = (value: any) => {
    setFilter(value);

    setQuery((prev) => ({
      ...prev,

      page: 1,
    }));
  };

  const pagination = {
    page: query.page,

    pageSize: query.pageSize,

    total: data?.pagination?.total ?? 0,
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-30 bg-white border-b pb-4 pt-4">
        <div className="flex items-center justify-between">
          <Title
            level={2}

            className="!mb-0"
          >
            Booking Management
          </Title>

          <CreateBookingModal />
        </div>

        <div className="mt-4">
          <BookingFilter
            value={filter}

            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="flex-1 mt-6">
        {isMobile ? (
          <BookingCardList
            data={data?.items ?? []}

            loading={isLoading}

            pagination={pagination}

            onPaginationChange={handlePaginationChange}
          />
        ) : (
          <BookingTable
            data={data?.items ?? []}

            loading={isLoading}

            pagination={pagination}

            onPaginationChange={handlePaginationChange}

            onTableChange={handleTableChange}
          />
        )}
      </div>
    </div>
  );
}
