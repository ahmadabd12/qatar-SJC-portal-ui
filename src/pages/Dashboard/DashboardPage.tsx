import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import {
//   FileText,
//   Clock,
//   CheckCircle,
//   XCircle,
//   Upload,
//   Activity,
//   TrendingUp,
//   AlertTriangle,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
import { useStatsData } from "./data/statsData";
import { useChartData } from "./data/chartData";
import { usePieData } from "./data/pieData";
import { useRecentActivities } from "./data/recentActivities";
import RecentActivity from "../../components/RecentActivity";
import ChartOne from "@/components/ChartOne";
import PieChartComponent from "@/components/PieChart";
import StatsGrid from "@/components/StatsGrid";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const stats = useStatsData();
  const pieData = usePieData();
  const recentActivities = useRecentActivities();
  const chartData = useChartData();
  // const getActivityIcon = (type: string) => {
  //   switch (type) {
  //     case "approve":
  //       return <CheckCircle className="h-4 w-4 text-green-500" />;
  //     case "upload":
  //       return <Upload className="h-4 w-4 text-blue-500" />;
  //     case "reprocess":
  //       return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  //     default:
  //       return <Activity className="h-4 w-4 text-gray-500" />;
  //   }
  // };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("dashboard.title")}
          </h1>
          <p className="text-gray-600 mt-1">
            {t("dashboard.welcomeMessage")}, {user?.name}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={stats} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartOne chartData={chartData} />
        <PieChartComponent pieData={pieData} />
      </div>

      {/* Recent Activity */}
      <RecentActivity recentActivities={recentActivities} />
    </div>
  );
};

export default DashboardPage;
