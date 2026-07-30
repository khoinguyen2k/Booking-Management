"use client";

import { Card, Space, Spin } from "antd";

import { useReport } from "@/app/hooks/reports/useReport";
import SummaryCards from "@/components/report/SummaryCards";
import LatestOrdersTable from "@/components/report/LatestOrdersTable";
import RevenueTable from "@/components/report/RevenueTable";

export default function DashboardPage() {
  const { data, isLoading } = useReport();

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Spin />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <Space wrap direction="vertical" size="large" className="w-full mt-6">
        <SummaryCards summary={data?.summary} />

        <Card title="Latest Orders">
          <LatestOrdersTable data={data?.latestOrders ?? []} />
        </Card>

        <Card title="Revenue By Date">
          <RevenueTable data={data?.revenueByDate ?? []} />
        </Card>
      </Space>
    </div>
  );
}
