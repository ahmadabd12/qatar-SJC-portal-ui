import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
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
} from "lucide-react";

interface ReviewDocument {
  id: string;
  name: string;
  caseNumber: string;
  uploadDate: string;
  language: "ar" | "en";
  aiScore: number;
  status: "pending" | "low_confidence" | "requires_attention";
  uploadSource: "manual" | "integration";
  priority: "high" | "medium" | "low";
}

const mockDocuments: ReviewDocument[] = [
  {
    id: "1",
    name: "قرار_محكمة_عليا_2024_001.pdf",
    caseNumber: "SC-2024-001",
    uploadDate: "2024-01-10",
    language: "ar",
    aiScore: 45,
    status: "low_confidence",
    uploadSource: "manual",
    priority: "high",
  },
  {
    id: "2",
    name: "commercial_dispute_resolution.pdf",
    caseNumber: "CC-2024-089",
    uploadDate: "2024-01-09",
    language: "en",
    aiScore: 72,
    status: "pending",
    uploadSource: "integration",
    priority: "medium",
  },
  {
    id: "3",
    name: "قضية_الأحوال_الشخصية_234.pdf",
    caseNumber: "FC-2024-234",
    uploadDate: "2024-01-08",
    language: "ar",
    aiScore: 38,
    status: "requires_attention",
    uploadSource: "manual",
    priority: "high",
  },
];

const ReviewPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "date" | "priority">("score");
  const [filterStatus, setFilterStatus] = useState<string>("all");

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

  const getScoreColor = (score: number) => {
    if (score < 50) return "text-maroon-700 ";
    if (score < 70) return "text-warning";
    return "text-success";
  };

  const handleSelectDocument = (docId: string, checked: boolean) => {
    if (checked) {
      setSelectedDocuments([...selectedDocuments, docId]);
    } else {
      setSelectedDocuments(selectedDocuments.filter((id) => id !== docId));
    }
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

  return (
    <div className={`space-y-6${isRTL ? " rtl" : ""}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t("review.title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("review.priorityQueue")} - {filteredDocuments.length}{" "}
            {t("documents.name").toLowerCase()}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* ...existing code... */}
        {/* No change needed for stats cards, as t() handles translation */}
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
                  {t("documents.language")}
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
                      {doc.language.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell>
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
                        <DropdownMenuItem>
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
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
