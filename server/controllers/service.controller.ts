import { ServiceService } from "../services/service.service";

import { ApiResponse } from "../lib/response/ApiResponse";

import { handleError } from "../lib/errors/errorHandler";

export class ServiceController {
  private serviceService = new ServiceService();

  async getServices() {
    try {
      const result = await this.serviceService.getServices();

      return ApiResponse.success(result);
    } catch (error) {
      return handleError(error);
    }
  }
}
