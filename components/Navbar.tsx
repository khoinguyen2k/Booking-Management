"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { Layout, Menu } from "antd";

const items = [
  {
    key: "/bookings",

    label: <Link href="/bookings">Bookings</Link>,
  },

  {
    key: "/dashboard",

    label: <Link href="/dashboard">Dashboard</Link>,
  },
];

export default function AppNavbar() {
  const pathname = usePathname();

  return (
    <Layout.Header className="flex items-center bg-white border-b p-4! !md:p-6 ">
      <div className="text-xl font-bold mr-8">Booking Demo</div>

      <Menu
        mode="horizontal"

        selectedKeys={[pathname]}

        items={items}

        className="flex-1"
      />
    </Layout.Header>
  );
}
