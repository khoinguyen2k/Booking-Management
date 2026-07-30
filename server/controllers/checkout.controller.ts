import { checkoutSchema } from "@/schemas/booking.schema";

import { ApiResponse } from "../lib/response/ApiResponse";

import { handleError } from "../lib/errors/errorHandler";
import { CheckoutService } from "../services/checkout,service";

export class CheckoutController {
  private checkoutService = new CheckoutService();

  async checkout(id: string) {
    try {
      const params = checkoutSchema.parse({
        id,
      });

      const result = await this.checkoutService.execute(params.id);

      return ApiResponse.success(result, "Checkout successfully");
    } catch (error) {
      return handleError(error);
    }
  }
}
