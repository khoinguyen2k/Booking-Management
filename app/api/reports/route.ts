import { NextRequest } from "next/server";

import { connectDB } from "@/server/database/mongodb";

import { ReportController } from "@/server/controllers/report.controller";

const controller = new ReportController();

export async function GET(request: NextRequest) {
  await connectDB();

  return controller.getReport(request);
}
