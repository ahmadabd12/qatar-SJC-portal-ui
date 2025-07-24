import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
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

const PieChartComponent = (props: { pieData: any }) => {
  const { i18n } = useTranslation();
  const { pieData } = props;
  return (
    <>
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
    </>
  );
};

export default PieChartComponent;
