import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Settings,
  Shield,
  Activity,
  Scale,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    {
      name: t("common.dashboard"),
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["Admin", "Reviewer", "Publisher"],
    },
    {
      name: t("common.documents"),
      href: "/documents",
      icon: FileText,
      roles: ["Admin", "Reviewer", "Publisher"],
    },
    {
      name: t("common.review"),
      href: "/review",
      icon: CheckSquare,
      roles: ["Admin", "Reviewer"],
    },
    {
      name: t("admin.title"),
      href: "/admin",
      icon: Shield,
      roles: ["Admin"],
    },
    {
      name: t("admin.auditLogs"),
      href: "/audit",
      icon: Activity,
      roles: ["Admin"],
    },
    {
      name: t("common.settings"),
      href: "/settings",
      icon: Settings,
      roles: ["Admin", "Reviewer", "Publisher"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-indigo-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <div className="flex items-center justify-center w-40 h-20 bg-white rounded-lg p-1">
            <img
              src="../../public/logo-ar.svg"
              alt="SJC Logo"
              className="w-full h-full object-contain"
            />
          </div> */}
          <div>
            <h1 className="text-xl font-bold text-white">
              {isRTL ? "المجلس الأعلى للقضاء" : "Supreme Judiciary"}
            </h1>
            <p className="text-sm text-maroon-200">
              {isRTL ? "دولة قطر" : "State of Qatar"}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg transition-colors ${
                isActive(item.href)
                  ? "bg-white text-maroon-800 border-r-4 border-maroon-800 rtl:border-r-0 rtl:border-l-4"
                  : "text-maroon-100 hover:bg-white hover:text-maroon-800"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-white/80 text-center">
          {isRTL
            ? "© 2025 السلطة القضائية العليا – دولة قطر. جميع الحقوق محفوظة."
            : "© 2025 Supreme Judiciary, State of Qatar. All rights reserved."}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
