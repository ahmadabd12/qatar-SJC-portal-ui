import { useTranslation } from "react-i18next";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

export function useStatsData() {
  const { t } = useTranslation();
  return [
    {
      name: t("dashboard.totalDocuments"),
      value: "1,247",
      change: "+12%",
      icon: FileText,
      color: "text-maroon-800",
    },
    {
      name: t("dashboard.pendingReview"),
      value: "23",
      change: "-5%",
      icon: Clock,
      color: "text-maroon-800",
    },
    {
      name: t("dashboard.approved"),
      value: "1,156",
      change: "+8%",
      icon: CheckCircle,
      color: "text-maroon-800",
    },
    {
      name: t("dashboard.rejected"),
      value: "68",
      change: "+2%",
      icon: XCircle,
      color: "text-maroon-800",
    },
  ];
}
