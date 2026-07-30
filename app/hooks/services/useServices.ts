import { getServices } from "@/services/service.service";
import { useAppQuery } from "../useAppQuery";
import type { IService } from "@/server/models/service.model";

export function useServices() {
  return useAppQuery<IService[]>({
    queryKey: ["services"],

    queryFn: getServices,
  });
}
