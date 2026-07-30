# 🏨 Booking Management System

Dự án quản lý đặt phòng được xây dựng bằng framework **Next.js** (App Router), sử dụng **TypeScript** và kết nối cơ sở dữ liệu **MongoDB**. Hệ thống tích hợp cả Frontend (Giao diện người dùng) và Backend (API Serverless) trong cùng một mã nguồn (Monorepo).

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

* **Frontend:** Next.js (App Router), React, Tailwind CSS, Context API.
* **Backend:** Next.js Route Handlers (Serverless Functions), Mongoose / MongoDB Driver.
* **Ngôn ngữ & Công cụ:** TypeScript, ESLint, Prettier.
* **Triển khai:** Vercel & MongoDB Atlas.

---

## 📂 Cấu trúc mã nguồn (Project Structure)

Dự án được phân chia rõ ràng giữa tầng giao diện (FE) và tầng xử lý logic/dữ liệu (BE) theo cấu trúc thư mục như sau:

```text
📂 booking-management
├── 📂 app                 # 🌐 TẦNG FRONTEND & ROUTING API (Next.js App Router)
│   ├── 📂 api             # ⚙️ TẦNG BACKEND: Các Route Handlers (API Endpoints)
│   │   ├── 📂 auth        # API xử lý đăng nhập, đăng ký, phân quyền
│   │   └── 📂 bookings    # API xử lý đặt phòng (CRUD: Create, Read, Update, Delete)
│   ├── 📂 (pages)         # Giao diện người dùng (Các trang chính của ứng dụng)
│   │   ├── 📄 layout.tsx  # Giao diện khung cố định (Navbar, Footer, Sidebar)
│   │   └── 📄 page.tsx    # Trang chủ (Homepage)
│   ├── 📄 favicon.ico
│   └── 📄 globals.css     # Cấu hình phong cách giao diện toàn cục (Tailwind)
│
├── 📂 components          # 🎨 TẦNG FRONTEND: Các thành phần giao diện dùng chung
│   ├── 📂 ui              # Các nút (Buttons), biểu mẫu (Inputs), bảng biểu (Tables)
│   └── 📂 booking         # Giao diện hiển thị danh sách phòng, lịch đặt...
│
├── 📂 contexts            # 🧠 TẦNG FRONTEND: Quản lý trạng thái ứng dụng (State Management)
│   └── 📄 AuthContext.tsx # Lưu trữ và chia sẻ thông tin đăng nhập người dùng toàn app
│
├── 📂 providers           # ⚡ TẦNG FRONTEND: Các bộ bọc ứng dụng (Ví dụ: Theme, QueryClient)
│
├── 📂 public              # 🖼️ Lưu trữ tài nguyên tĩnh (Hình ảnh, Icons, Phông chữ)
│
├── 📂 schemas             # 🗃️ CẤU TRÚC CHUNG: Định nghĩa biểu mẫu dữ liệu (Validation)
│   └── 📄 booking.ts      # Xác thực dữ liệu đầu vào bằng Zod hoặc Yup
│
├── 📂 server              # 🖥️ TẦNG BACKEND: Cấu hình hệ thống & Kết nối dữ liệu
│   ├── 📄 db.ts           # Kết nối MongoDB (Tối ưu hóa Serverless connection pooling)
│   └── 📂 models          # Định nghĩa cấu trúc bảng MongoDB (Mongoose Schemas)
│       ├── 📄 User.ts     # Schema thông tin người dùng
│       └── 📄 Booking.ts  # Schema thông tin lịch đặt phòng
│
├── 📂 services            # 🔄 CẦU NỐI FE-BE: Xử lý gọi API từ client lên server
│   ├── 📄 auth.ts         # Hàm thực hiện đăng nhập, đăng xuất qua Axios/Fetch
│   └── 📄 booking.ts      # Hàm gọi API lấy danh sách hoặc đặt phòng mới
│
└── 📄 Cấu hình hệ thống   # tsconfig.json, next.config.ts, package.json, tailwind.config.ts
```

---

## 💻 Chi tiết vận hành hệ thống

### 1. Tầng Frontend (FE)
* **Giao diện động (App Router):** Sử dụng các file `page.tsx` trong thư mục `app` để tự động định tuyến trang không cần cấu hình thư viện ngoài.
* **Tối ưu hóa hiệu năng:** Phân chia rõ ràng giữa **Server Components** (render phía máy chủ để tối ưu SEO) và **Client Components** (sử dụng `'use client'` cho các tương tác người dùng như bấm nút, điền form).
* **Quản lý dữ liệu:** Thư mục `services` chịu trách nhiệm đóng gói các hàm gọi API, giúp tầng giao diện (`components`) sạch sẽ và dễ bảo trì.

### 2. Tầng Backend (BE)
* **Kiến trúc Serverless:** Thư mục `app/api` chứa các hàm xử lý HTTP Request (GET, POST, PUT, DELETE). Khi deploy lên Vercel, các file này tự động biến thành các hàm Serverless chạy độc lập.
* **Kết nối Database an toàn (`server/db.ts`):** Sử dụng cơ chế kết nối có bộ nhớ đệm (Cached Connection). Cơ chế này giúp ngăn chặn tình trạng tràn kết nối (Max Connections Limit) khi ứng dụng tự động mở rộng trên môi trường Vercel Cloud.
* **Mô hình hóa dữ liệu (`server/models`):** Định nghĩa chặt chẽ cấu trúc thực thể bằng Mongoose để đảm bảo tính toàn vẹn dữ liệu trước khi lưu trữ vào MongoDB Atlas.

---

## 🚀 Hướng dẫn chạy dự án ở máy Local

1. **Cài đặt thư viện phụ thuộc:**
   ```bash
   npm install
   ```

2. **Cấu hình biến môi trường:** Tạo file `.env.local` ở thư mục gốc và điền:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/booking_db
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

3. **Khởi chạy môi trường phát triển:**
   ```bash
   npm run dev
   ```
   Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để kiểm tra giao diện.
