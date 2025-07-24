import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Eye,
  RefreshCw,
  MoreHorizontal,
  Download,
  GitCompareArrows,
  AlertTriangle,
} from "lucide-react";
const DocumentsTable = (props: {
  filteredDocuments: any;
  setSelectedDocument: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const { filteredDocuments, setSelectedDocument } = props;
  const { t, i18n } = useTranslation();
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };
  const handleDocumentReview = (doc: any) => {
    setSelectedDocument(doc);
  };
  return (
    <>
      <Table className="w-full rtl:text-right">
        <TableHeader className="bg-gray-100 rtl:text-right">
          <TableRow className="hover:bg-gray-50 rtl:text-right">
            <TableHead className="rtl:text-right">
              {t("documents.name")}
            </TableHead>
            <TableHead className="rtl:text-right">
              {t("documents.caseNumber")}
            </TableHead>
            <TableHead className="rtl:text-right">
              {t("documents.uploadDate")}
            </TableHead>
            <TableHead className="rtl:text-right">
              {t("documents.status")}
            </TableHead>
            <TableHead className="rtl:text-right">
              {" "}
              {t("documents.AIConfidence")}
            </TableHead>
            {/* <TableHead className="rtl:text-right">Redacted Areas</TableHead> */}
            <TableHead className="rtl:text-right">
              {t("documents.documentType")}
            </TableHead>
            <TableHead className="rtl:text-right">
              {t("documents.actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDocuments.map((doc) => (
            <TableRow key={doc.id} className="cursor-pointer hover:bg-gray-50">
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>{doc.name}</span>
                </div>
              </TableCell>
              <TableCell>{doc.caseNumber}</TableCell>
              <TableCell>{doc.uploadDate}</TableCell>
              <TableCell>{getStatusBadge(doc.status)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span
                    className={`font-medium ${getScoreColor(doc.aiConfidence)}`}
                  >
                    {doc.aiConfidence}%
                  </span>
                  {doc.aiConfidence < 80 && (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </TableCell>
              {/* <TableCell>
                    <span className="font-medium text-maroon-600">
                      {doc.redactedAreas}
                    </span>
                  </TableCell> */}
              <TableCell>
                <Badge variant="outline" className="uppercase">
                  {doc.documentType}
                </Badge>
              </TableCell>
              <TableCell className="rtl:text-right">
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
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleDocumentReview(doc)}
                      >
                        <Eye className="mr-2 h-4 w-4 rtl:mr-2 " />
                        {i18n.language === "ar"
                          ? "عرض التفاصيل"
                          : "View Details"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4 rtl:mr-2 " />
                        {i18n.language === "ar"
                          ? "تحميل الأصل"
                          : "Download Original"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RefreshCw className="mr-2 h-4 w-4 rtl:mr-2 " />
                        {i18n.language === "ar"
                          ? "إعادة المعالجة"
                          : "Reprocess"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DocumentsTable;
