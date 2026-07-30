import { ServiceRepository } from "../repositories/service.repository";

export class ServiceService {
  private serviceRepository = new ServiceRepository();

  async getServices() {
    return this.serviceRepository.findAll();
  }
}
