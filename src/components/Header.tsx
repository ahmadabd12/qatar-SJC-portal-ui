import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { Bell, Search, User, LogOut, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

// Mock notifications data
const notifications = [
  {
    id: 1,
    title: "80% Usage Limit Reached",
    description:
      "You have reached 80% of your monthly usage limit for service XYZ.",
    date: "12/12/2024",
    icon: <Bell size={18} color="#eab308" />, // Yellow
  },
  {
    id: 2,
    title: "High Usage Alert",
    description:
      "Your current usage for service ABC has exceeded the daily threshold by 20%.",
    date: "12/12/2024",
    icon: <Bell size={18} color="#dc2626" />, // Red
  },
  {
    id: 3,
    title: "Usage Limit Reset",
    description:
      "Your monthly usage limit has been reset. You can now continue using your services.",
    date: "01/01/2025",
    icon: <Bell size={18} color="#16a34a" />, // Green
  },
];

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();

  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setNotifOpen(false);
      }
    }
    if (notifOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notifOpen]);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-maroon-100 text-maroon-800";
      case "Reviewer":
        return "bg-blue-100 text-blue-800";
      case "Publisher":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <img
              src="/ITC-Portal.svg"
              alt="Logo"
              className="h-10 w-auto px-4"
            />
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t("common.search")}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Globe className="h-4 w-4" />
            <span>{language === "en" ? "العربية" : "English"}</span>
          </Button>

          {/* Notification Dropdown */}
          <div className="relative" ref={notifRef}>
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => setNotifOpen((open) => !open)}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-maroon-800 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.length}
              </span>
            </Button>
            {notifOpen && (
              <div
                className={`absolute ${
                  isRTL ? "left-0" : "right-0"
                } mt-2 w-80 bg-white rounded shadow-lg border z-50`}
              >
                <div className="px-4 py-3 border-b">
                  <h5 className="text-sm font-medium">Notifications</h5>
                </div>
                <ul className="max-h-72 overflow-y-auto">
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className="border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50">
                        {notification.icon}
                        <div>
                          <div className="text-sm font-semibold text-gray-800">
                            {notification.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {notification.description}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {notification.date}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <User className="h-5 w-5" />
                  <div className="text-left rtl:text-right">
                    <div className="font-medium text-sm">{user?.name}</div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span
                        className={`px-2 py-0 rounded-full text-xs font-medium ${getRoleBadgeColor(
                          user?.role || ""
                        )}`}
                      >
                        {user?.role}
                      </span>
                    </div>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={isRTL ? "start" : "end"}
              className="w-56"
            >
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                <span>{t("common.profile")}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                <span>{t("common.logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
