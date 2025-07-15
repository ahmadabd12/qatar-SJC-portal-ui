import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLanguage } from "../contexts/LanguageContext";

const Layout: React.FC = () => {
  const { isRTL } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <div className="flex h-screen">
        {/* Sidebar: hidden on mobile, shown as drawer if open */}
        <div
          className={
            `fixed z-50 inset-y-0 ${
              isRTL ? "right-0" : "left-0"
            } w-64 transform bg-indigo-800 text-white transition-transform duration-200 ease-in-out md:static md:translate-x-0 md:block ` +
            (sidebarOpen
              ? "translate-x-0"
              : isRTL
              ? "translate-x-full"
              : "-translate-x-full") +
            " md:translate-x-0"
          }
        >
          <Sidebar setSidebarOpen={setSidebarOpen} />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
