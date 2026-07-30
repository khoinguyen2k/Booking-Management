import { Invoice } from "../models/invoice.model";

export class InvoiceRepository {
  async create(data: any) {
    return Invoice.create(data);
  }
}
