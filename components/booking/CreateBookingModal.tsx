"use client";

import { useState } from "react";

import { Button, Modal } from "antd";

import BookingForm from "./BookingForm";
import { PlusOutlined } from "@ant-design/icons";

export default function CreateBookingModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        icon={<PlusOutlined />}
      >
        Create Booking
      </Button>

      <Modal
        title="Create Booking"
        open={open}
        destroyOnClose
        footer={null}
        width={600}
        onCancel={() => setOpen(false)}
      >
        <BookingForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}
