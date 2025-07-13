import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Progress } from "../components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  FileText,
  Users,
  AlertTriangle,
  TrendingUp,
  Settings,
  Database,
  Activity,
  RefreshCw,
  Download,
  Shield,
  Clock,
} from "lucide-react";

const documentStats = [
  { name: "Jan", total: 120, approved: 95, rejected: 15 },
  { name: "Feb", total: 135, approved: 110, rejected: 12 },
  { name: "Mar", total: 145, approved: 125, rejected: 8 },
  { name: "Apr", total: 160, approved: 140, rejected: 10 },
  { name: "May", total: 175, approved: 155, rejected: 12 },
  { name: "Jun", total: 190, approved: 170, rejected: 8 },
];
const aiScoreDistribution = [
  { range: "0-20%", count: 5, color: "#f59e42" }, // yellow-600 (gradient: #f59e42)
  { range: "21-40%", count: 12, color: "#911235" }, // maroon-800
  { range: "41-60%", count: 18, color: "#3730a3" }, // indigo-800
  { range: "61-80%", count: 45, color: "#a5b4fc" }, // indigo-300 (gradient)
  { range: "81-100%", count: 120, color: "#efdcaf" }, // yellow-600
];
// const aiScoreDistribution = [
//   { range: "0-20%", count: 5, color: "#b5800a" },
//   { range: "21-40%", count: 12, color: "#2e314ecc" },
//   { range: "41-60%", count: 18, color: "#d97706" },
//   { range: "61-80%", count: 45, color: "#65a30dcc" },
//   { range: "81-100%", count: 120, color: "#911235cc" },
// ];
// const aiScoreDistribution = [
//   { range: "0-20%", count: 5, color: "#dc2626" },
//   { range: "21-40%", count: 12, color: "#ea580c" },
//   { range: "41-60%", count: 18, color: "#d97706" },
//   { range: "61-80%", count: 45, color: "#65a30d" },
//   { range: "81-100%", count: 120, color: "#16a34a" },
// ];

const reviewerPerformance = [
  {
    name: "أحمد محمد",
    reviewed: 45,
    avgTime: "2.3h",
    approved: 40,
    rejected: 5,
  },
  {
    name: "فاطمة علي",
    reviewed: 52,
    avgTime: "1.8h",
    approved: 48,
    rejected: 4,
  },
  {
    name: "محمد خالد",
    reviewed: 38,
    avgTime: "2.7h",
    approved: 35,
    rejected: 3,
  },
  {
    name: "Sarah Johnson",
    reviewed: 41,
    avgTime: "2.1h",
    approved: 37,
    rejected: 4,
  },
];

const systemErrors = [
  {
    id: 1,
    type: "Integration Failure",
    message: "Failed to connect to external document system",
    timestamp: "2024-01-10 14:30",
    status: "active",
  },
  {
    id: 2,
    type: "AI Processing Error",
    message: "Timeout during document redaction process",
    timestamp: "2024-01-10 13:15",
    status: "resolved",
  },
  {
    id: 3,
    type: "Storage Warning",
    message: "Blob storage approaching capacity limit",
    timestamp: "2024-01-10 12:00",
    status: "active",
  },
];

const AdminPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");

  const retryOperation = (errorId: number) => {
    console.log("Retrying operation for error:", errorId);
  };

  const exportReport = () => {
    console.log("Exporting admin report...");
  };

  return (
    <div className="space-y-6" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {i18n.language === "ar" ? "لوحة الإدارة" : t("admin.title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {i18n.language === "ar"
              ? "إدارة النظام وتحليلات شاملة"
              : "Comprehensive system management and analytics"}
          </p>
        </div>
        <Button
          onClick={exportReport}
          className="bg-indigo-800 hover:bg-indigo-800/90 text-white"
        >
          {i18n.language === "ar" ? "تصدير التقرير" : "Export Report"}
          <Download className="h-4 w-4 mr-2" />
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <TabsList className={`grid w-full grid-cols-4`}>
          <TabsTrigger value="overview">
            {i18n.language === "ar" ? "نظرة عامة" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {i18n.language === "ar" ? "التقارير" : t("admin.reports")}
          </TabsTrigger>
          <TabsTrigger value="users">
            {i18n.language === "ar"
              ? "إدارة المستخدمين"
              : t("admin.userManagement")}
          </TabsTrigger>
          {/* <TabsTrigger value="system">
            {i18n.language === "ar"
              ? "إعدادات النظام"
              : t("admin.systemSettings")}
          </TabsTrigger> */}
          <TabsTrigger value="errors">
            {i18n.language === "ar" ? "سجلات الأخطاء" : "Error Logs"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <FileText className="h-8 w-8  text-maroon-800" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      {i18n.language === "ar"
                        ? "إجمالي المستندات"
                        : t("dashboard.totalDocuments")}
                    </p>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-xs text-success">
                      {i18n.language === "ar"
                        ? "↑ 12% عن الشهر الماضي"
                        : "↑ 12% from last month"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8  text-indigo-800" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      {i18n.language === "ar"
                        ? "المستخدمون النشطون"
                        : "Active Users"}
                    </p>
                    <p className="text-2xl font-bold">48</p>
                    <p className="text-xs text-success ">
                      {i18n.language === "ar"
                        ? "↑ 3 مستخدم جديد هذا الأسبوع"
                        : "↑ 3 new this week"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* 
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <TrendingUp className="h-8 w-8 text-success text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      {i18n.language === "ar"
                        ? "متوسط درجة الذكاء الاصطناعي"
                        : "Avg AI Score"}
                    </p>
                    <p className="text-2xl font-bold">78%</p>
                    <p className="text-xs text-success">
                      {i18n.language === "ar"
                        ? "↑ 5% تحسن"
                        : "↑ 5% improvement"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="h-8 w-8 text-warning text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      {i18n.language === "ar"
                        ? "تنبيهات النظام"
                        : "System Alerts"}
                    </p>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs text-warning">
                      {i18n.language === "ar"
                        ? "2 تتطلب انتباه"
                        : "2 require attention"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-indigo-800" />
                {i18n.language === "ar"
                  ? "نشاط النظام الأخير"
                  : "Recent System Activity"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className={`flex items-center justify-between  border-indigo-800  ${
                    i18n.language === "ar"
                      ? "border-r-4 pr-4"
                      : "border-l-4 pl-4"
                  }`}
                >
                  <div>
                    <p className="font-medium">
                      {i18n.language === "ar"
                        ? "تمت معالجة دفعة المستندات بنجاح"
                        : "Document batch processed successfully"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {i18n.language === "ar"
                        ? "تم تحرير 15 مستند بمتوسط درجة 85%"
                        : "15 documents redacted with avg score 85%"}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {i18n.language === "ar" ? "منذ ساعتين" : "2 hours ago"}
                  </span>
                </div>
                <div
                  className={`flex items-center justify-between  border-green-600  ${
                    i18n.language === "ar"
                      ? "border-r-4 pr-4"
                      : "border-l-4 pl-4"
                  }`}
                >
                  <div>
                    <p className="font-medium">
                      {i18n.language === "ar"
                        ? "انتهت مهلة نقطة تكامل النظام"
                        : "Integration endpoint timeout"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {i18n.language === "ar"
                        ? "فشل الاتصال بنظام المستندات الخارجي"
                        : "External document system connection failed"}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {i18n.language === "ar" ? "منذ 4 ساعات" : "4 hours ago"}
                  </span>
                </div>
                <div
                  className={`flex items-center justify-between  border-yellow-600  ${
                    i18n.language === "ar"
                      ? "border-r-4 pr-4"
                      : "border-l-4 pl-4"
                  }`}
                >
                  <div>
                    <p className="font-medium">
                      {i18n.language === "ar"
                        ? "تم تسجيل مستخدم جديد"
                        : "New user registered"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {i18n.language === "ar"
                        ? "تمت إضافة Sarah Johnson كمراجع قانوني"
                        : "Sarah Johnson added as Legal Reviewer"}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {i18n.language === "ar" ? "منذ 6 ساعات" : "6 hours ago"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Document Processing Chart */}
          <Card>
            <CardHeader>
              <CardTitle>
                {i18n.language === "ar"
                  ? "اتجاهات معالجة المستندات"
                  : "Document Processing Trends"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={documentStats}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#2e314e"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="approved"
                      stroke="#b5800a"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="rejected"
                      stroke="#911235"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Score Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {i18n.language === "ar"
                    ? "توزيع درجات الذكاء الاصطناعي"
                    : "AI Score Distribution"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={aiScoreDistribution}
                        dataKey="count"
                        nameKey="range"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ range, count }) => `${range}: ${count}`}
                      >
                        {aiScoreDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Reviewer Performance */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {i18n.language === "ar"
                    ? "أداء المراجعين"
                    : "Reviewer Performance"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviewerPerformance.map((reviewer, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{reviewer.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {i18n.language === "ar"
                            ? `${reviewer.reviewed} مستند (${reviewer.avgTime} متوسط)`
                            : `${reviewer.reviewed} docs (${reviewer.avgTime} avg)`}
                        </span>
                      </div>
                      <Progress
                        value={(reviewer.approved / reviewer.reviewed) * 100}
                        rtl={i18n.language === "ar"}
                        className="h-2 bg-indigo-100 "
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          {i18n.language === "ar"
                            ? `تمت الموافقة: ${reviewer.approved}`
                            : `Approved: ${reviewer.approved}`}
                        </span>
                        <span>
                          {i18n.language === "ar"
                            ? `مرفوض: ${reviewer.rejected}`
                            : `Rejected: ${reviewer.rejected}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {i18n.language === "ar"
                  ? "إدارة المستخدمين"
                  : "User Management"}
                <Button className="bg-indigo-800 hover:bg-indigo-800/90 text-white">
                  {i18n.language === "ar"
                    ? "إضافة مستخدم جديد"
                    : "Add New User"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="w-full rtl:text-right">
                <TableHeader>
                  <TableRow>
                    {i18n.language === "ar" ? (
                      <>
                        <TableHead className="text-right">إجراءات</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">آخر نشاط</TableHead>
                        <TableHead className="text-right">الدور</TableHead>
                        <TableHead className="text-right">
                          البريد الإلكتروني
                        </TableHead>
                        <TableHead className="text-right">الاسم</TableHead>
                      </>
                    ) : (
                      <>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {i18n.language === "ar" ? (
                    <>
                      <TableRow>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            تعديل
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="text-success">
                            نشط
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          2024-01-10 15:30
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="indigo">مدير</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          ahmed.mohamed@sjc.gov.qa
                        </TableCell>
                        <TableCell className="font-medium text-right">
                          أحمد محمد
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            تعديل
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="text-success">
                            نشط
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          2024-01-10 14:20
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary">مراجع</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          fatima.ali@sjc.gov.qa
                        </TableCell>
                        <TableCell className="font-medium text-right">
                          فاطمة علي
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell className="font-medium">أحمد محمد</TableCell>
                        <TableCell>ahmed.mohamed@sjc.gov.qa</TableCell>
                        <TableCell>
                          <Badge variant="indigo">Admin</Badge>
                        </TableCell>
                        <TableCell>2024-01-10 15:30</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-success">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">فاطمة علي</TableCell>
                        <TableCell>fatima.ali@sjc.gov.qa</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Reviewer</Badge>
                        </TableCell>
                        <TableCell>2024-01-10 14:20</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-success">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {i18n.language === "ar" ? (
                    <>
                      <span>إعدادات النظام</span>
                      <Settings className="h-5 w-5 ml-2 text-indigo-800" />
                    </>
                  ) : (
                    <>
                      <span>System Configuration</span>
                      <Settings className="h-5 w-5 ml-2 text-indigo-800" />
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {i18n.language === "ar"
                      ? "حد درجة الذكاء الاصطناعي"
                      : "AI Score Threshold"}
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">50%</span>
                    <div className="flex-1 bg-secondary h-2 rounded">
                      <div className="bg-indigo-800 h-2 rounded w-3/5"></div>
                    </div>
                    <span className="text-sm">100%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {i18n.language === "ar"
                      ? "أقصى حجم للملف"
                      : "Max File Size"}
                  </label>
                  <p className="text-sm text-muted-foreground">50 MB</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {i18n.language === "ar"
                      ? "محاولات إعادة المحاولة"
                      : "Retry Attempts"}
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {i18n.language === "ar" ? "3 محاولات" : "3 attempts"}
                  </p>
                </div>
                <Button className="w-full bg-indigo-800 text-white hover:bg-indigo-800/90">
                  {i18n.language === "ar"
                    ? "تحديث الإعدادات"
                    : "Update Settings"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {i18n.language === "ar" ? (
                    <>
                      <span>حالة التخزين</span>
                      <Database className="h-5 w-5 ml-2 text-indigo-800" />
                    </>
                  ) : (
                    <>
                      <span>Storage Status</span>
                      <Database className="h-5 w-5 ml-2 text-indigo-800" />
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {i18n.language === "ar"
                        ? "المستندات المصدرية"
                        : "Source Documents"}
                    </span>
                    <span className="text-sm">2.1 GB / 10 GB</span>
                  </div>
                  <Progress
                    value={21}
                    rtl={i18n.language === "ar"}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {i18n.language === "ar"
                        ? "المستندات المنقحة"
                        : "Redacted Documents"}
                    </span>
                    <span className="text-sm">1.8 GB / 10 GB</span>
                  </div>
                  <Progress
                    value={18}
                    rtl={i18n.language === "ar"}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {i18n.language === "ar" ? "سجلات النظام" : "System Logs"}
                    </span>
                    <span className="text-sm">324 MB / 1 GB</span>
                  </div>
                  <Progress
                    value={32}
                    rtl={i18n.language === "ar"}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {i18n.language === "ar"
                  ? "سجلات أخطاء النظام"
                  : "System Error Logs"}
                <Button variant="outline" size="sm">
                  {i18n.language === "ar" ? "تحديث" : "Refresh"}
                  <RefreshCw className="h-4 w-4 mr-2" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    {i18n.language === "ar" ? (
                      <>
                        <TableHead className="text-right">النوع</TableHead>
                        <TableHead className="text-right">الرسالة</TableHead>
                        <TableHead className="text-right">الوقت</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">إجراءات</TableHead>
                      </>
                    ) : (
                      <>
                        <TableHead>Type</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemErrors.map((error) =>
                    i18n.language === "ar" ? (
                      <TableRow key={error.id}>
                        <TableCell className="font-medium text-right">
                          {error.type === "Integration Failure"
                            ? "فشل التكامل"
                            : error.type === "AI Processing Error"
                            ? "خطأ في معالجة الذكاء الاصطناعي"
                            : error.type === "Storage Warning"
                            ? "تحذير التخزين"
                            : error.type}
                        </TableCell>
                        <TableCell className="text-right">
                          {error.message ===
                          "Failed to connect to external document system"
                            ? "فشل الاتصال بنظام المستندات الخارجي"
                            : error.message ===
                              "Timeout during document redaction process"
                            ? "انتهت مهلة عملية تحرير المستندات"
                            : error.message ===
                              "Blob storage approaching capacity limit"
                            ? "سعة تخزين الملفات تقترب من الحد الأقصى"
                            : error.message}
                        </TableCell>
                        <TableCell className="text-right">
                          {error.timestamp}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              error.status === "active"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {error.status === "active"
                              ? "نشط"
                              : error.status === "resolved"
                              ? "تم الحل"
                              : error.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {error.status === "active" && (
                            <Button
                              onClick={() => retryOperation(error.id)}
                              variant="ghost"
                              size="sm"
                            >
                              إعادة المحاولة{" "}
                              <RefreshCw className="h-4 w-4 ml-2" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={error.id}>
                        <TableCell className="font-medium">
                          {error.type}
                        </TableCell>
                        <TableCell>{error.message}</TableCell>
                        <TableCell>{error.timestamp}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              error.status === "active"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {error.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {error.status === "active" && (
                            <Button
                              onClick={() => retryOperation(error.id)}
                              variant="ghost"
                              size="sm"
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Retry
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
