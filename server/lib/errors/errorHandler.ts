import z, { ZodError } from "zod";

import { AppError } from "./AppError";

import { ApiResponse } from "../response/ApiResponse";

export function handleError(error: unknown) {
  // Zod validation error

  if (error instanceof z.ZodError) {
    return ApiResponse.error(
      "Validation failed",

      400,

      error.flatten(),
    );
  }

  // Business error

  if (error instanceof AppError) {
    return ApiResponse.error(
      error.message,

      error.statusCode,
    );
  }

  // Unknown error

  console.error(error);

  return ApiResponse.error(
    "Internal Server Error",

    500,
  );
}
