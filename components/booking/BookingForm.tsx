"use client";

import { Button, Checkbox, DatePicker, Form, Input, Spin } from "antd";

import { useCreateBooking } from "@/app/hooks/bookings/useCreateBooking";

import { useServices } from "@/app/hooks/services/useServices";

interface Props {
  onSuccess?: () => void;
}

type FormValues = {
  customerName: string;
  serviceIds: Array<string | number>;
  appointmentAt: { toISOString: () => string } | Date | string;
};

export default function BookingForm({ onSuccess }: Props) {
  const [form] = Form.useForm();

  const { data: services, isLoading } = useServices();

  const {
    mutate,

    isPending,
  } = useCreateBooking();

  const handleSubmit = (values: FormValues) => {
    const appointmentIso =
      typeof values.appointmentAt === "string"
        ? values.appointmentAt
        : values.appointmentAt instanceof Date
          ? values.appointmentAt.toISOString()
          : values.appointmentAt.toISOString();

    mutate(
      {
        customerName: values.customerName,

        serviceIds: values.serviceIds.map(String),

        appointmentAt: appointmentIso,
      },
      {
        onSuccess: () => {
          form.resetFields();

          onSuccess?.();
        },
      },
    );
  };

  return (
    <Spin spinning={isLoading}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Customer Name"
          name="customerName"
          rules={[
            {
              required: true,
              message: "Please enter customer name",
            },
          ]}
        >
          <Input placeholder="Enter customer name" />
        </Form.Item>

        <Form.Item
          label="Services"
          name="serviceIds"
          rules={[
            {
              required: true,
              message: "Please select at least one service",
            },
          ]}
        >
          <Checkbox.Group className="w-full">
            <div className="flex flex-col gap-3">
              {services?.map((service) => (
                <Checkbox key={String(service._id)} value={String(service._id)}>
                  <div className="flex w-full justify-between">
                    <span>{service.name}</span>

                    <span>${service.price}</span>
                  </div>
                </Checkbox>
              ))}
            </div>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          label="Appointment Time"
          name="appointmentAt"
          rules={[
            {
              required: true,
              message: "Please select appointment time",
            },
          ]}
        >
          <DatePicker showTime className="w-full" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isPending} block>
          Create Booking
        </Button>
      </Form>
    </Spin>
  );
}
