import { useTranslation } from "react-i18next";
export function useRecentActivities() {
  const { i18n } = useTranslation();
  return [
    {
      id: 1,
      user: "أحمد المنصوري",
      action: i18n.language === "ar" ? "وافق على المستند" : "approved document",
      document: "القضية رقم 2024/045",
      time: i18n.language === "ar" ? "منذ دقيقتين" : "2 minutes ago",
      type: "approve",
    },
    {
      id: 2,
      user: "مريم القحطاني",
      action: i18n.language === "ar" ? "رفع مستند" : "uploaded document",
      document: "القضية رقم 2024/046",
      time: i18n.language === "ar" ? "منذ 15 دقيقة" : "15 minutes ago",
      type: "upload",
    },
    {
      id: 3,
      user: "محمد العلي",
      action:
        i18n.language === "ar" ? "طلب إعادة المعالجة" : "requested reprocess",
      document: "القضية رقم 2024/043",
      time: i18n.language === "ar" ? "منذ ساعة" : "1 hour ago",
      type: "reprocess",
    },
  ];
}
