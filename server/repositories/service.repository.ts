import { Service } from "../models/service.model";

export class ServiceRepository {
  async findByIds(ids: string[]) {
    return Service.find({
      _id: {
        $in: ids,
      },

      active: true,
    });
  }

  async findAll() {
    return Service.find({
      active: true,
    });
  }
}
