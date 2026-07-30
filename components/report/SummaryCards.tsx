"use client";

import { Row, Col, Card, Statistic } from "antd";

interface Props {
  summary?: {
    revenue: number;

    completedOrders: number;

    averageOrder: number;
  };
}

export default function SummaryCards({ summary }: Props) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <Statistic
            title="Revenue"

            value={summary?.revenue ?? 0}

            prefix="$"
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={8}>
        <Card>
          <Statistic
            title="Completed Orders"

            value={summary?.completedOrders ?? 0}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={8}>
        <Card>
          <Statistic
            title="Average Order"

            value={summary?.averageOrder ?? 0}

            prefix="$"
          />
        </Card>
      </Col>
    </Row>
  );
}
