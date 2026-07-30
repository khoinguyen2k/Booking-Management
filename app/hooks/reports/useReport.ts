import { useAppQuery } from "@/app/hooks/useAppQuery";
import { getReport } from "@/services/report.service";

export function useReport() {
  return useAppQuery({
    queryKey: ["report"],

    queryFn: getReport,
  });
}
