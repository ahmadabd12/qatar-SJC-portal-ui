import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Activity, AlertTriangle, Upload, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
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
const RecentActivity = (props: { recentActivities: any }) => {
  const { t } = useTranslation();
  const { recentActivities } = props;

  return (
    <>
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
    </>
  );
};

export default RecentActivity;
