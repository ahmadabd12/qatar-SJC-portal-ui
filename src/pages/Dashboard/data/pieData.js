import { useTranslation } from "react-i18next";
export function usePieData() {
  const { i18n } = useTranslation();
  return i18n.language === "ar"
    ? [
        { name: "تمت الموافقة", value: 85, color: "#efdcaf" },
        { name: "قيد الانتظار", value: 10, color: "#2e314e" },
        { name: "مرفوض", value: 5, color: "#911235" },
      ]
    : [
        { name: "Approved", value: 85, color: "#efdcaf" },
        { name: "Pending", value: 10, color: "#2e314e" },
        { name: "Rejected", value: 5, color: "#911235" },
      ];
}
// const pieData = [
//   { name: "Approved", value: 85, color: "#10B981" },
//   { name: "Pending", value: 10, color: "#F59E0B" },
//   { name: "Rejected", value: 5, color: "#EF4444" },
// ];
