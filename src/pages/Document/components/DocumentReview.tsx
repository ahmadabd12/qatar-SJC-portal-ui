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
import { Badge } from "@/components/ui/badge";

import {
  FileText,
  CheckCircle,
  XCircle,
  RefreshCw,
  ArrowLeft,
  GitCompareArrows,
  Shield,
} from "lucide-react";
const DocumentReview = (props: {
  selectedDocument: any;
  setSelectedDocument: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const { i18n } = useTranslation();
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900">
            Rejected
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900">
            Pending Review
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900">
            Processing
          </Badge>
        );
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };
  const { selectedDocument, setSelectedDocument } = props;
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const handleApprove = () => {
    // Handle approval logic
    console.log("Document approved:", selectedDocument?.id);
    setSelectedDocument(null);
  };

  const handleReject = () => {
    // Handle rejection logic
    console.log("Document rejected:", selectedDocument?.id);
    setSelectedDocument(null);
  };

  const handleRequestChanges = () => {
    // Handle request changes logic
    console.log("Changes requested:", selectedDocument?.id);
    setSelectedDocument(null);
  };
  return (
    <>
      {i18n.language === "ar" ? (
        <div className="space-y-6 rtl">
          {/* Header with back button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                variant="outline"
                onClick={() => setSelectedDocument(null)}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <ArrowLeft
                  className={`h-4 w-4${
                    i18n.language === "ar" ? " rotate-180" : ""
                  }`}
                />
                <span>رجوع إلى المستندات</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  مراجعة المستند: {selectedDocument.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  القضية {selectedDocument.caseNumber} • دقة الذكاء الاصطناعي:{" "}
                  {selectedDocument.aiConfidence}%
                </p>
              </div>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              {getStatusBadge(selectedDocument.status)}
            </div>
          </div>

          {/* Document Information */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    البيانات الحساسة المكتشفة
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {selectedDocument.sensitiveDataFound.map(
                      (item: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {item}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    المناطق المحجوبة
                  </h3>
                  <p className="mt-2 text-2xl font-bold text-maroon-600">
                    {selectedDocument.redactedAreas}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    دقة الذكاء الاصطناعي
                  </h3>
                  <p
                    className={`mt-2 text-2xl font-bold ${getScoreColor(
                      selectedDocument.aiConfidence
                    )}`}
                  >
                    {selectedDocument.aiConfidence}%
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    عدد الصفحات
                  </h3>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {selectedDocument.pages}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Side-by-side document comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Document */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <FileText className="h-5 w-5" />
                  <span>المستند الأصلي</span>
                </CardTitle>
                <CardDescription>المستند كما تم رفعه</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[500px] flex items-center justify-center">
                  <div>
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">معاينة المستند الأصلي</p>
                    <p className="text-sm text-gray-500">
                      {selectedDocument.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedDocument.size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Redacted Document */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Shield className="h-5 w-5" />
                  <span>المستند المحجوب</span>
                </CardTitle>
                <CardDescription>
                  المستند بعد معالجة الذكاء الاصطناعي وإخفاء البيانات الحساسة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg p-8 text-center min-h-[500px] flex items-center justify-center">
                  <div>
                    <Shield className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                    <p className="text-yellow-800 mb-2">
                      معاينة المستند المحجوب
                    </p>
                    <p className="text-sm text-yellow-700">
                      {selectedDocument.redactedAreas} مناطق محجوبة
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="bg-black h-4 w-24 mx-auto rounded"></div>
                      <div className="bg-black h-4 w-16 mx-auto rounded"></div>
                      <div className="bg-black h-4 w-20 mx-auto rounded"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <GitCompareArrows className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">قرار المراجعة</h3>
                    <p className="text-sm text-gray-600">
                      قارن بين المستندين واتخذ قرارًا بشأن جودة الحجب
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <Button
                    variant="outline"
                    onClick={handleRequestChanges}
                    className="flex items-center space-x-2 rtl:space-x-reverse"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>طلب تعديلات</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReject}
                    className="flex items-center space-x-2 rtl:space-x-reverse text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>رفض</span>
                  </Button>
                  <Button
                    onClick={handleApprove}
                    className="bg-green-700 hover:bg-green-600 text-white flex items-center space-x-2 rtl:space-x-reverse"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>قبول ونشر</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header with back button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                variant="outline"
                onClick={() => setSelectedDocument(null)}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Documents</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Document Review: {selectedDocument.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  Case {selectedDocument.caseNumber} • AI Confidence:{" "}
                  {selectedDocument.aiConfidence}%
                </p>
              </div>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              {getStatusBadge(selectedDocument.status)}
            </div>
          </div>

          {/* Document Information */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Sensitive Data Found
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {selectedDocument.sensitiveDataFound.map(
                      (item: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {item}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
                {/* <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Redacted Areas
                </h3>
                <p className="mt-2 text-2xl font-bold text-maroon-600">
                  {selectedDocument.redactedAreas}
                </p>
              </div> */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Document Type
                  </h3>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {selectedDocument.documentType}
                  </p>
                  {/* <p
                  className={`mt-2 text-2xl font-bold ${getScoreColor(
                    selectedDocument.aiConfidence
                  )}`}
                >
                  {selectedDocument.aiConfidence}%
                </p> */}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Pages</h3>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {selectedDocument.pages}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Side-by-side document comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Document */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <FileText className="h-5 w-5" />
                  <span>Original Document</span>
                </CardTitle>
                <CardDescription>Source document as uploaded</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[500px] flex items-center justify-center">
                  <div>
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Original Document Preview
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedDocument.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedDocument.size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Redacted Document */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Shield className="h-5 w-5" />
                  <span>Redacted Document</span>
                </CardTitle>
                <CardDescription>
                  AI-processed document with sensitive data masked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg p-8 text-center min-h-[500px] flex items-center justify-center">
                  <div>
                    <Shield className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                    <p className="text-yellow-800 mb-2">
                      Redacted Document Preview
                    </p>
                    <p className="text-sm text-yellow-700">
                      {selectedDocument.redactedAreas} areas redacted
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="bg-black h-4 w-24 mx-auto rounded"></div>
                      <div className="bg-black h-4 w-16 mx-auto rounded"></div>
                      <div className="bg-black h-4 w-20 mx-auto rounded"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <GitCompareArrows className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Review Decision</h3>
                    <p className="text-sm text-gray-600">
                      Compare both documents and decide on the redaction quality
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <Button
                    variant="outline"
                    onClick={handleRequestChanges}
                    className="flex items-center space-x-2 rtl:space-x-reverse"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Request Changes</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReject}
                    className="flex items-center space-x-2 rtl:space-x-reverse text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Reject</span>
                  </Button>
                  <Button
                    onClick={handleApprove}
                    className="bg-green-700 hover:bg-green-600 text-white flex items-center space-x-2 rtl:space-x-reverse"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Approve & Publish</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
export default DocumentReview;
