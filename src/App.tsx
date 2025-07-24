import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";

import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import SecureRoute from "./components/SecureRoute";
import Layout from "./components/Layout";
import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import DocumentsPage from "./pages/Document/DocumentsPage";
import ReviewPage from "./pages/ReviewPage/ReviewPage";
import AdminPage from "./pages/Admin/AdminPage";
import AuditPage from "./pages/Audit/AuditPage";
import SettingsPage from "./pages/Settings/SettingsPage";

import "./i18n/config";
import "./App.css";
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <LanguageProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route
                    path="/*"
                    element={
                      <SecureRoute>
                        <Layout />
                      </SecureRoute>
                    }
                  >
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="documents" element={<DocumentsPage />} />
                    <Route path="review" element={<ReviewPage />} />
                    <Route path="admin" element={<AdminPage />} />
                    <Route path="audit" element={<AuditPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>
                </Routes>
              </div>
            </Router>
            <Toaster />
            <Sonner />
          </LanguageProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
