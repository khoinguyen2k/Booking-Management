import { BookingStatus } from "@/server/models/booking.model";
import { Tag } from "antd";

interface Props {
  status: BookingStatus;
}

export default function BookingStatusTag({ status }: Props) {
  return <Tag color={status === "BOOKED" ? "blue" : "green"}>{status}</Tag>;
}
