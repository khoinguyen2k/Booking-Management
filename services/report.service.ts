import { api } from "@/app/lib/axios";

export async function getReport() {
  const response = await api.get("/reports");

  return response.data.data;
}
