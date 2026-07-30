"use client";

import { useCheckout } from "@/app/hooks/bookings/useCheckout";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

export default function CheckoutButton({ bookingId }: { bookingId: string }) {
  const { mutate, isPending } = useCheckout();

  return (
    <Popconfirm
      title="Confirm checkout?"

      onConfirm={() => mutate(bookingId)}
    >
      <Button
        type="primary"

        loading={isPending}
        icon={<CheckOutlined />}
      >
        Checkout
      </Button>
    </Popconfirm>
  );
}
