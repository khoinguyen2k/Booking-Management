import { NextRequest } from "next/server";

import { ReportService } from "../services/report.service";

import { ApiResponse } from "../lib/response/ApiResponse";

import { handleError } from "../lib/errors/errorHandler";

export class ReportController {
  private reportService = new ReportService();

  async getReport(request: NextRequest) {
    try {
      const data = await this.reportService.getReport();

      return ApiResponse.success(data, "Get report successfully");
    } catch (error) {
      return handleError(error);
    }
  }
}
