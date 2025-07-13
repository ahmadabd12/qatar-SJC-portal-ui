import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Checkbox } from "../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  AlertTriangle,
  Clock,
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  RotateCcw,
  GitCompareArrows,
  ArrowLeft,
  Shield,
  RefreshCw,
} from "lucide-react";

interface ReviewDocument {
  id: string;
  name: string;
  caseNumber: string;
  uploadDate: string;
  language: "ar" | "en";
  documentType: "PDF" | "DOCX" | "PPTX";
  aiScore: number;
  status: "pending" | "low_confidence" | "requires_attention";
  uploadSource: "manual" | "integration";
  priority: "high" | "medium" | "low";
  sensitiveDataFound: string[];
  redactedAreas: number;
  aiConfidence: number;
  pages: number;
  size: string;
}
const mockDocuments: ReviewDocument[] = [
  {
    id: "1",
    name: "قرار_محكمة_عليا_2024_001.pdf",
    caseNumber: "SC-2024-001",
    uploadDate: "2024-01-10",
    language: "ar",
    documentType: "PDF",
    aiScore: 45,
    status: "low_confidence",
    uploadSource: "manual",
    priority: "high",
    sensitiveDataFound: ["اسم", "رقم هوية", "عنوان"],
    redactedAreas: 3,
    aiConfidence: 45,
    pages: 12,
    size: "1.2MB",
  },
  {
    id: "2",
    name: "commercial_dispute_resolution.pdf",
    caseNumber: "CC-2024-089",
    uploadDate: "2024-01-09",
    language: "en",
    documentType: "DOCX",
    aiScore: 72,
    status: "pending",
    uploadSource: "integration",
    priority: "medium",
    sensitiveDataFound: ["Name", "Passport Number"],
    redactedAreas: 1,
    aiConfidence: 72,
    pages: 8,
    size: "850KB",
  },
  {
    id: "3",
    name: "قضية_الأحوال_الشخصية_234.pdf",
    caseNumber: "FC-2024-234",
    uploadDate: "2024-01-08",
    language: "ar",
    documentType: "PPTX",
    aiScore: 38,
    status: "requires_attention",
    uploadSource: "manual",
    priority: "high",
    sensitiveDataFound: ["اسم", "تاريخ ميلاد"],
    redactedAreas: 2,
    aiConfidence: 38,
    pages: 5,
    size: "600KB",
  },
];
// const mockDocuments: ReviewDocument[] = [
//   {
//     id: "1",
//     name: "قرار_محكمة_عليا_2024_001.pdf",
//     caseNumber: "SC-2024-001",
//     uploadDate: "2024-01-10",
//     language: "ar",
//     documentType: "PDF",
//     aiScore: 45,
//     status: "low_confidence",
//     uploadSource: "manual",
//     priority: "high",
//   },
//   {
//     id: "2",
//     name: "commercial_dispute_resolution.pdf",
//     caseNumber: "CC-2024-089",
//     uploadDate: "2024-01-09",
//     language: "en",
//     documentType: "DOCX",
//     aiScore: 72,
//     status: "pending",
//     uploadSource: "integration",
//     priority: "medium",
//   },
//   {
//     id: "3",
//     name: "قضية_الأحوال_الشخصية_234.pdf",
//     caseNumber: "FC-2024-234",
//     uploadDate: "2024-01-08",
//     language: "ar",
//     documentType: "PPTX",
//     aiScore: 38,
//     status: "requires_attention",
//     uploadSource: "manual",
//     priority: "high",
//   },
// ];

const ReviewPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "date" | "priority">("score");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-maroon-700 text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "low_confidence":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "requires_attention":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <FileText className="h-4 w-4 text-primary" />;
    }
  };

  const handleSelectDocument = (docId: string, checked: boolean) => {
    if (checked) {
      setSelectedDocuments([...selectedDocuments, docId]);
    } else {
      setSelectedDocuments(selectedDocuments.filter((id) => id !== docId));
    }
  };
  const handleDocumentReview = (doc: any) => {
    setSelectedDocument(doc);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDocuments(mockDocuments.map((doc) => doc.id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleBulkApprove = () => {
    console.log("Bulk approving documents:", selectedDocuments);
    setSelectedDocuments([]);
  };

  const handleBulkReject = () => {
    console.log("Bulk rejecting documents:", selectedDocuments);
    setSelectedDocuments([]);
  };
  const getScoreColor = (score: number) => {
    if (score < 50) return "text-maroon-700";
    if (score < 70) return "text-warning";
    return "text-success";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "low_confidence":
        return (
          <Badge className="bg-red-100 text-red-800">Low Confidence</Badge>
        );
      case "requires_attention":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Requires Attention
          </Badge>
        );
      default:
        return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>;
    }
  };

  // And your handlers like:
  const handleApprove = () => {
    console.log("Approved", selectedDocument);
    setSelectedDocument(null);
  };

  const handleReject = () => {
    console.log("Rejected", selectedDocument);
    setSelectedDocument(null);
  };

  const handleRequestChanges = () => {
    console.log("Requested changes", selectedDocument);
    setSelectedDocument(null);
  };

  const filteredDocuments = mockDocuments
    .filter(
      (doc) =>
        (filterStatus === "all" || doc.status === filterStatus) &&
        (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "score":
          return a.aiScore - b.aiScore;
        case "date":
          return (
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
          );
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

  const isRTL = i18n.language === "ar";
  if (selectedDocument) {
    return i18n.language === "ar" ? (
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
                      <Badge key={index} variant="outline" className="text-xs">
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
                  <p className="text-yellow-800 mb-2">معاينة المستند المحجوب</p>
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
                      <Badge key={index} variant="outline" className="text-xs">
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
    );
  }
  return (
    <div className={`space-y-6${isRTL ? " rtl" : ""}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t("review.title")}
          </h1>
          {/* <p className="text-muted-foreground mt-2">
            {t("review.priorityQueue")} - {filteredDocuments.length}{" "}
            {t("documents.name").toLowerCase()}
          </p> */}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* ...existing code... */}
        {/* No change needed for stats cards, as t() handles translation */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {isRTL ? "تمت المراجعة اليوم" : "Today Reviewed"}
                </p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <FileText className="h-8 w-8 text-primary text-maroon-800" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {t("dashboard.pendingReview")}
                </p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Clock className="h-8 w-8 text-warning text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {t("review.requiresAttention")}
                </p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {t("review.lowConfidence")}
                </p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div
            className={`flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between${
              isRTL ? " rtl" : ""
            }`}
          >
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("common.search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    {t("common.filter")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                    {isRTL ? "كل الحالات" : "All Status"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilterStatus("low_confidence")}
                  >
                    {isRTL ? "ثقة منخفضة" : "Low Confidence"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilterStatus("requires_attention")}
                  >
                    {isRTL ? "يتطلب انتباه" : "Requires Attention"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                    {isRTL ? "قيد المراجعة" : "Pending Review"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {selectedDocuments.length > 0 && (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm text-muted-foreground">
                  {selectedDocuments.length} {isRTL ? "محدد" : "selected"}
                </span>
                <Button onClick={handleBulkApprove} size="sm" variant="default">
                  {isRTL ? (
                    <>
                      <span>{t("review.bulkApprove")}</span>
                      <CheckCircle className="h-4 w-4 mr-2" />
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>{t("review.bulkApprove")}</span>
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleBulkReject}
                  size="sm"
                  variant="destructive"
                >
                  {isRTL ? (
                    <>
                      <span>رفض جماعي</span>
                      <XCircle className="h-4 w-4 mr-2" />
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      <span>Bulk Reject</span>
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <Table className={isRTL ? "rtl:text-right" : ""}>
            <TableHeader className={isRTL ? "rtl:text-right" : ""}>
              <TableRow className={isRTL ? "rtl:text-right" : ""}>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedDocuments.length === mockDocuments.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className={isRTL ? "rtl:text-right" : ""}>
                  {isRTL ? "الحالة" : "Status"}
                </TableHead>
                <TableHead className={isRTL ? "rtl:text-right" : ""}>
                  {t("documents.name")}
                </TableHead>
                <TableHead className={isRTL ? "rtl:text-right" : ""}>
                  {t("documents.caseNumber")}
                </TableHead>
                {/* <TableHead className={isRTL ? "rtl:text-right" : ""}>
                  {isRTL ? "الأولوية" : "Priority"}
                </TableHead> */}
                <TableHead className={isRTL ? "rtl:text-right" : ""}>
                  {t("documents.score")}
                </TableHead>
                <TableHead className={isRTL ? "rtl:text-right" : ""}>
                  {t("documents.documentType")}
                </TableHead>
                <TableHead className={isRTL ? "rtl:text-right" : ""}>
                  {t("documents.uploadDate")}
                </TableHead>
                <TableHead className={isRTL ? "rtl:text-right" : ""}>
                  {t("documents.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow
                  key={doc.id}
                  className={isRTL ? "rtl:text-right" : ""}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedDocuments.includes(doc.id)}
                      onCheckedChange={(checked) =>
                        handleSelectDocument(doc.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getStatusIcon(doc.status)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.caseNumber}</TableCell>
                  {/* <TableCell>
                    <Badge className={getPriorityColor(doc.priority)}>
                      {isRTL
                        ? doc.priority === "high"
                          ? "عالية"
                          : doc.priority === "medium"
                          ? "متوسطة"
                          : "منخفضة"
                        : doc.priority}
                    </Badge>
                  </TableCell> */}
                  <TableCell>
                    <span
                      className={`font-semibold ${getScoreColor(doc.aiScore)}`}
                    >
                      {doc.aiScore}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {doc.documentType.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDocumentReview(doc)}
                        className="flex items-center space-x-1 rtl:space-x-reverse"
                      >
                        {i18n.language === "ar" ? (
                          <>
                            <span>مراجعة</span>
                            <GitCompareArrows className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            <GitCompareArrows className="h-4 w-4" />
                            <span>Review</span>
                          </>
                        )}
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            {isRTL ? (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                <span>عرض المستند</span>
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                <span>{t("documents.viewDocument")}</span>
                              </>
                            )}
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem>
                            {isRTL ? (
                              <>
                                {" "}
                                <CheckCircle className="h-4 w-4 mr-2" />
                                <span>نشر وموافقة</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                <span>{t("documents.approvePublish")}</span>
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {isRTL ? (
                              <>
                                {" "}
                                <XCircle className="h-4 w-4 mr-2" />
                                <span>رفض</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 mr-2" />
                                <span>Reject</span>
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {isRTL ? (
                              <>
                                <RotateCcw className="h-4 w-4 mr-2" />
                                <span>إعادة المعالجة</span>
                              </>
                            ) : (
                              <>
                                <RotateCcw className="h-4 w-4 mr-2" />
                                <span>{t("documents.requestReprocess")}</span>
                              </>
                            )}
                          </DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewPage;
