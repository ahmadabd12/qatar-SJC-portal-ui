import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Upload } from "lucide-react";
import { useDocumentData } from "./data/documentsData";
import DocumentReview from "./components/DocumentReview";
import DocumentsTable from "./components/DocumentsTable";
const DocumentsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const documents = useDocumentData();

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.caseNumber.includes(searchTerm)
  );

  if (selectedDocument) {
    return (
      <DocumentReview
        selectedDocument={selectedDocument}
        setSelectedDocument={setSelectedDocument}
      />
    );
  }
  return (
    <div className="space-y-6">
      {i18n.language === "ar" ? (
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center justify-between ">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">المستندات</h1>
            <p className="text-gray-600 mt-1">
              إدارة ومراجعة المستندات القانونية
            </p>
          </div>
          <div className="flex space-x-2 rtl:space-x-reverse">
            {/* <Button
              variant="outline"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <span>تصدير</span>
              <Download className="h-4 w-4" />
            </Button> */}
            <Button className="bg-maroon-800 hover:bg-indigo-800 text-white flex items-center space-x-2 rtl:space-x-reverse">
              <span>رفع مستند</span>
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center justify-between ">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
            <p className="text-gray-600 mt-1">
              Manage and review legal documents
            </p>
          </div>
          <div className="flex space-x-2 rtl:space-x-reverse">
            {/* <Button
              variant="outline"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <span>Export</span>
              <Download className="h-4 w-4" />
            </Button> */}
            <Button className="bg-maroon-800 hover:bg-indigo-800 text-white flex items-center space-x-2 rtl:space-x-reverse">
              <span>{t("dashboard.uploadDocument")}</span>
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
            <div className="flex-1 relative">
              {i18n.language === "ar" && (
                <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              )}
              <Input
                placeholder={t("common.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rtl:pl-4 rtl:pr-10 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent"
              />
            </div>
            <Button
              variant="outline"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <span>{t("common.filter")}</span>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        {t("language") === "ar" ||
        (typeof i18n !== "undefined" && i18n.language === "ar") ? (
          <CardHeader>
            <CardTitle className="">مستندات للمراجعة</CardTitle>
            <CardDescription>
              انقر على مستند لعرض المقارنة جنبًا إلى جنب واتخاذ قرارات المراجعة
            </CardDescription>
          </CardHeader>
        ) : (
          <CardHeader>
            <CardTitle className="">Documents Library</CardTitle>
            <CardDescription>
              Click on a document to view side-by-side comparison and make
              review decisions
            </CardDescription>
          </CardHeader>
        )}
        <CardContent>
          <DocumentsTable
            filteredDocuments={filteredDocuments}
            setSelectedDocument={setSelectedDocument}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsPage;
