import { CheckoutController } from "@/server/controllers/checkout.controller";
import { connectDB } from "@/server/database/mongodb";

const controller = new CheckoutController();

export async function POST(
  request: Request,

  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  await connectDB();
  const { id } = await params;
  return controller.checkout(id);
}
