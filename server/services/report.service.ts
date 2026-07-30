import { ReportRepository } from "../repositories/report.repository";

export class ReportService {
  private repository = new ReportRepository();

  async getReport() {
    const [summary, latestOrders, revenueByDate] = await Promise.all([
      this.repository.getSummary(),

      this.repository.getLatestOrders(),

      this.repository.getRevenueByDate(),
    ]);

    return {
      summary,

      latestOrders,

      revenueByDate,
    };
  }
}
