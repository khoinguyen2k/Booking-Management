import { ServiceController } from "@/server/controllers/service.controller";
import { connectDB } from "@/server/database/mongodb";

const controller = new ServiceController();

export async function GET() {
  await connectDB();
  return controller.getServices();
}
