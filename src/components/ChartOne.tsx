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
import { ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const ChartOne = (props: { chartData: any }) => {
  const { i18n } = useTranslation();
  const { chartData } = props;
  return (
    <>
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
              <Bar dataKey="approved" fill="#efdcaf" name="Approved" />
              <Bar dataKey="rejected" fill="#911235" name="Rejected" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default ChartOne;
