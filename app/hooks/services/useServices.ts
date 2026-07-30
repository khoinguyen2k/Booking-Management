import { getServices } from "@/services/service.service";
import { useAppQuery } from "../useAppQuery";

export function useServices() {
  return useAppQuery({
    queryKey: ["services"],

    queryFn: getServices,
  });
}
