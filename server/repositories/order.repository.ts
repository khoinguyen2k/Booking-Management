import Order from "../models/order.model";

export class OrderRepository {
  async create(data: any) {
    return Order.create(data);
  }
}
