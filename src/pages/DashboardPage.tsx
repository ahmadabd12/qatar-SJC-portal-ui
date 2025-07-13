import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Upload,
  Activity,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  const stats = [
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

  const chartData = [
    { name: "Jan", documents: 65, approved: 58, rejected: 7 },
    { name: "Feb", documents: 89, approved: 82, rejected: 7 },
    { name: "Mar", documents: 93, approved: 85, rejected: 8 },
    { name: "Apr", documents: 125, approved: 115, rejected: 10 },
    { name: "May", documents: 156, approved: 142, rejected: 14 },
    { name: "Jun", documents: 187, approved: 168, rejected: 19 },
  ];

  // const pieData = [
  //   { name: "Approved", value: 85, color: "#10B981" },
  //   { name: "Pending", value: 10, color: "#F59E0B" },
  //   { name: "Rejected", value: 5, color: "#EF4444" },
  // ];
  const pieData =
    i18n.language === "ar"
      ? [
          { name: "تمت الموافقة", value: 85, color: "#911235" },
          { name: "قيد الانتظار", value: 10, color: "#2e314e" },
          { name: "مرفوض", value: 5, color: "#efdcaf" },
        ]
      : [
          { name: "Approved", value: 85, color: "#911235" },
          { name: "Pending", value: 10, color: "#2e314e" },
          { name: "Rejected", value: 5, color: "#efdcaf" },
        ];

  const recentActivities = [
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "approve":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "upload":
        return <Upload className="h-4 w-4 text-blue-500" />;
      case "reprocess":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("dashboard.title")}
          </h1>
          <p className="text-gray-600 mt-1">
            {i18n.language === "ar"
              ? `مرحبًا بعودتك، ${user?.name}`
              : `Welcome back, ${user?.name}`}
          </p>
        </div>
        <Button className="bg-maroon-800 hover:bg-indigo-800 text-white">
          {t("dashboard.uploadDocument")}
          <Upload className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.name}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm ${
                        stat.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {i18n.language === "ar"
                        ? `${stat.change} عن الشهر الماضي`
                        : `${stat.change} from last month`}
                    </p>
                  </div>
                  <div>
                    <Icon className={`h-10 w-10 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <TrendingUp className="h-5 w-5 text-maroon-800" />
              {i18n.language === "ar" ? (
                <span>اتجاهات معالجة المستندات</span>
              ) : (
                <span>Document Processing Trends</span>
              )}
            </CardTitle>
            <CardDescription>
              {i18n.language === "ar"
                ? "إحصائيات معالجة المستندات الشهرية"
                : "Monthly document processing statistics"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* <Bar dataKey="approved" fill="#10B981" name="Approved" />
                <Bar dataKey="rejected" fill="#EF4444" name="Rejected" /> */}
                <Bar dataKey="approved" fill="#911235" name="Approved" />
                <Bar dataKey="rejected" fill="#efdcaf" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {i18n.language === "ar"
                ? "توزيع حالة المستندات"
                : "Document Status Distribution"}
            </CardTitle>
            <CardDescription>
              {i18n.language === "ar"
                ? "الحالة الحالية لجميع المستندات"
                : "Current status of all documents"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 rtl:space-x-reverse mt-4">
              {pieData.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {entry.name}: {entry.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Activity className="h-5 w-5 text-maroon-800" />
            <span>{t("dashboard.recentActivity")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 rtl:space-x-reverse p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    <span className="text-maroon-800">{activity.user}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.document}
                  </p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
