import AppNavbar from "@/components/Navbar";
import "./globals.css";

import AppProvider from "@/providers/AppProvider";

export const metadata = {
  title: "Booking Management Demo",

  description: "Booking Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        <div className="bg-gray-50 h-full flex flex-col">
          <AppNavbar />

          <main className="flex-1 overflow-auto">
            <div className="p-4 md:p-6 space-y-6 ">
              <AppProvider>{children}</AppProvider>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
