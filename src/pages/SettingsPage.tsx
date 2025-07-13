import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  Settings,
  Database,
  Shield,
  Key,
  Globe,
  Server,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";

interface MaskingKeyword {
  id: string;
  keyword: string;
  language: "ar" | "en" | "both";
  isRegex: boolean;
  category: "personal" | "financial" | "legal" | "custom";
  createdBy: string;
  createdAt: string;
  lastModified: string;
}

const mockKeywords: MaskingKeyword[] = [
  {
    id: "1",
    keyword: "رقم الهوية",
    language: "ar",
    isRegex: false,
    category: "personal",
    createdBy: "أحمد محمد",
    createdAt: "2024-01-01",
    lastModified: "2024-01-05",
  },
  {
    id: "2",
    keyword: "\\d{2,8}\\-\\d{4}\\-\\d{7}",
    language: "both",
    isRegex: true,
    category: "personal",
    createdBy: "System",
    createdAt: "2024-01-01",
    lastModified: "2024-01-01",
  },
  {
    id: "3",
    keyword: "Social Security",
    language: "en",
    isRegex: false,
    category: "personal",
    createdBy: "Sarah Johnson",
    createdAt: "2024-01-03",
    lastModified: "2024-01-03",
  },
  {
    id: "4",
    keyword: "رقم الحساب المصرفي",
    language: "ar",
    isRegex: false,
    category: "financial",
    createdBy: "فاطمة علي",
    createdAt: "2024-01-04",
    lastModified: "2024-01-08",
  },
];

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("keywords");
  const [isAddKeywordOpen, setIsAddKeywordOpen] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState<MaskingKeyword | null>(
    null
  );
  const [aiThreshold, setAiThreshold] = useState([70]);
  const [autoPublish, setAutoPublish] = useState(false);
  const [strictMode, setStrictMode] = useState(true);

  // Form states
  const [newKeyword, setNewKeyword] = useState({
    keyword: "",
    language: "en" as "ar" | "en" | "both",
    isRegex: false,
    category: "custom" as "personal" | "financial" | "legal" | "custom",
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "personal":
        return "bg-indigo-800 text-white hover:bg-indigo-800/90";
      case "financial":
        return "bg-warning text-warning-foreground";
      case "legal":
        return "bg-success text-success-foreground";
      case "custom":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getLanguageFlag = (language: string) => {
    switch (language) {
      case "ar":
        return "🇶🇦";
      case "en":
        return "🇺🇸";
      case "both":
        return "🌐";
      default:
        return "❓";
    }
  };

  const handleAddKeyword = () => {
    console.log("Adding new keyword:", newKeyword);
    setIsAddKeywordOpen(false);
    setNewKeyword({
      keyword: "",
      language: "en",
      isRegex: false,
      category: "custom",
    });
  };

  const handleEditKeyword = (keyword: MaskingKeyword) => {
    setEditingKeyword(keyword);
  };

  const handleDeleteKeyword = (id: string) => {
    console.log("Deleting keyword:", id);
  };

  const handleSaveSystemSettings = () => {
    console.log("Saving system settings:", {
      aiThreshold: aiThreshold[0],
      autoPublish,
      strictMode,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t("admin.systemSettings")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {i18n.language === "ar"
              ? "إدارة كلمات الإخفاء وإعدادات الذكاء الاصطناعي وتكوين النظام"
              : "Manage masking keywords, AI settings, and system configuration"}
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="keywords">
            {t("admin.maskingKeywords")}
          </TabsTrigger>
          <TabsTrigger value="ai">{t("admin.aiSettings")}</TabsTrigger>
          {/* <TabsTrigger value="storage">{t("admin.storage")}</TabsTrigger>
          <TabsTrigger value="security">{t("admin.security")}</TabsTrigger> */}
        </TabsList>

        <TabsContent value="keywords" className="space-y-6">
          {/* Keywords Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  {i18n.language === "ar"
                    ? "كلمات الإخفاء"
                    : "Masking Keywords Management"}
                  <Key className="h-5 w-5 mx-2" />
                </CardTitle>
                <Dialog
                  open={isAddKeywordOpen}
                  onOpenChange={setIsAddKeywordOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-indigo-800 text-white hover:bg-indigo-800/90">
                      {i18n.language === "ar"
                        ? "إضافة كلمة مفتاحية"
                        : "Add Keyword"}
                      <Plus className="h-4 w-4 mr-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Masking Keyword</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="keyword">Keyword/Pattern</Label>
                        <Input
                          id="keyword"
                          value={newKeyword.keyword}
                          onChange={(e) =>
                            setNewKeyword({
                              ...newKeyword,
                              keyword: e.target.value,
                            })
                          }
                          placeholder="Enter keyword or regex pattern"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select
                          value={newKeyword.language}
                          onValueChange={(value: any) =>
                            setNewKeyword({ ...newKeyword, language: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ar">Arabic</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="both">Both Languages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newKeyword.category}
                          onValueChange={(value: any) =>
                            setNewKeyword({ ...newKeyword, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personal">
                              Personal Information
                            </SelectItem>
                            <SelectItem value="financial">
                              Financial Data
                            </SelectItem>
                            <SelectItem value="legal">
                              Legal Information
                            </SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="regex"
                          checked={newKeyword.isRegex}
                          onCheckedChange={(checked) =>
                            setNewKeyword({ ...newKeyword, isRegex: checked })
                          }
                        />
                        <Label htmlFor="regex">
                          Regular Expression Pattern
                        </Label>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsAddKeywordOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleAddKeyword}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Keyword
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table className="rtl:text-right">
                <TableHeader className="rtl:text-right">
                  <TableRow className="rtl:text-right">
                    <TableHead className="rtl:text-right">
                      {t("setting.keyword")}
                    </TableHead>
                    <TableHead className="rtl:text-right">
                      {t("setting.language")}
                    </TableHead>
                    <TableHead className="rtl:text-right">
                      {t("setting.category")}
                    </TableHead>
                    <TableHead className="rtl:text-right">
                      {t("setting.type")}
                    </TableHead>
                    <TableHead className="rtl:text-right">
                      {t("setting.createdBy")}
                    </TableHead>
                    <TableHead className="rtl:text-right">
                      {t("setting.lastModified")}
                    </TableHead>
                    <TableHead className="rtl:text-right">
                      {t("setting.actions")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockKeywords.map((keyword) => (
                    <TableRow key={keyword.id}>
                      <TableCell className="font-mono max-w-xs">
                        <div className="flex items-center space-x-2">
                          {keyword.isRegex ? (
                            <EyeOff className="h-4 w-4 text-warning" />
                          ) : (
                            <Eye className="h-4 w-4 text-primary" />
                          )}
                          <span className="truncate">{keyword.keyword}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span>{getLanguageFlag(keyword.language)}</span>
                          <span>
                            {keyword.language === "both"
                              ? "Both"
                              : keyword.language.toUpperCase()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(keyword.category)}>
                          {keyword.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={keyword.isRegex ? "destructive" : "outline"}
                        >
                          {keyword.isRegex ? "Regex" : "Text"}
                        </Badge>
                      </TableCell>
                      <TableCell>{keyword.createdBy}</TableCell>
                      <TableCell>{keyword.lastModified}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditKeyword(keyword)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteKeyword(keyword.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          {/* AI Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings
                    className={`h-5 w-5 ${
                      i18n.language === "ar" ? "ml-2" : "mr-2"
                    }`}
                  />
                  {i18n.language === "ar"
                    ? "إعدادات معالجة الذكاء الاصطناعي "
                    : " AI Processing Settings"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>
                      {i18n.language === "ar"
                        ? "عتبة ثقة الذكاء الاصطناعي"
                        : "AI Confidence Threshold"}
                      : {aiThreshold[0]}%
                    </Label>
                    <Slider
                      value={aiThreshold}
                      onValueChange={setAiThreshold}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                      dir={i18n.language === "ar" ? "rtl" : "ltr"}
                      style={i18n.language === "ar" ? { direction: "rtl" } : {}}
                    />
                    <p className="text-sm text-muted-foreground">
                      {i18n.language === "ar"
                        ? "المستندات التي تقل ثقة الذكاء الاصطناعي بها عن هذه العتبة ستحتاج إلى مراجعة يدوية"
                        : "Documents with AI confidence below this threshold will require manual review"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>
                        {i18n.language === "ar"
                          ? "النشر التلقائي للمستندات ذات الثقة العالية"
                          : "Auto-Publish High Confidence Documents"}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {i18n.language === "ar"
                          ? "نشر المستندات تلقائيًا التي تزيد ثقة الذكاء الاصطناعي بها عن ٩٠٪"
                          : " Automatically publish documents with confidence above 90%"}
                      </p>
                    </div>
                    <Switch
                      checked={autoPublish}
                      onCheckedChange={setAutoPublish}
                      dir={i18n.language === "ar" ? "rtl" : "ltr"}
                      style={i18n.language === "ar" ? { direction: "rtl" } : {}}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>
                        {i18n.language === "ar"
                          ? "وضع التنقيح الصارم"
                          : "Strict Redaction Mode"}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {i18n.language === "ar"
                          ? "تطبيق أنماط إخفاء أكثر صرامة"
                          : "Apply more aggressive masking patterns"}
                      </p>
                    </div>
                    <Switch
                      checked={strictMode}
                      onCheckedChange={setStrictMode}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveSystemSettings} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {i18n.language === "ar"
                    ? "حفظ إعدادات الذكاء الاصطناعي"
                    : "Save AI Settings"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {i18n.language === "ar"
                    ? "إحصائيات المعالجة"
                    : "Processing Statistics"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {i18n.language === "ar"
                        ? "متوسط وقت المعالجة"
                        : "Average Processing Time"}
                    </span>
                    <span className="text-sm font-medium">
                      {i18n.language === "ar" ? "٢٫٣ دقيقة" : "2.3 minutes"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {i18n.language === "ar" ? "معدل النجاح" : "Success Rate"}
                    </span>
                    <span className="text-sm font-medium">94.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {i18n.language === "ar"
                        ? "متوسط درجة الثقة "
                        : "Average Confidence Score"}
                    </span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {i18n.language === "ar"
                        ? "المستندات التي تم معالجتها اليوم  "
                        : "Documents Processed Today"}
                    </span>
                    <span className="text-sm font-medium">127</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">
                    {i18n.language === "ar"
                      ? " الأداء الأخير"
                      : "Recent Performance"}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success ml-2" />
                      <span className="text-sm">
                        {i18n.language === "ar"
                          ? "تم إكمال الدُفعة ذات الثقة العالية"
                          : " High confidence batch completed"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-warning ml-2" />
                      <span className="text-sm">
                        {i18n.language === "ar"
                          ? "٣ مستندات تحتاج إلى مراجعة يدوية"
                          : " 3 documents need manual review"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          {/* Storage Settings */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  {i18n.language === "ar"
                    ? "إعدادات التخزين"
                    : "Storage Configuration"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    {i18n.language === "ar"
                      ? " حاوية المستندات الأصلية"
                      : "Source Documents Container"}
                  </Label>
                  <Input value="sjc-source-documents" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>
                    {" "}
                    {i18n.language === "ar"
                      ? "حاوية المستندات المستهدفة"
                      : "Target Documents Container"}
                  </Label>
                  <Input value="sjc-target-documents" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>
                    {i18n.language === "ar"
                      ? "الحد الأقصى لحجم الملف (ميجابايت)"
                      : "Maximum File Size (MB)"}
                  </Label>
                  <Input type="number" defaultValue="50" />
                </div>
                <div className="space-y-2">
                  <Label>
                    {i18n.language === "ar"
                      ? "فترة الاحتفاظ (بالأيام)"
                      : "Retention Period (Days)"}
                  </Label>
                  <Input type="number" defaultValue="365" />
                </div>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {i18n.language === "ar"
                    ? "تحديث إعدادات التخزين"
                    : " Update Storage Settings"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {i18n.language === "ar" ? "استخدام التخزين" : "Storage Usage"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {i18n.language === "ar"
                        ? "الحاوية المصدر"
                        : "Source Container"}
                    </span>
                    <span className="text-sm font-medium">2.1 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded">
                    <div className="bg-primary h-2 rounded w-1/5"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {i18n.language === "ar"
                        ? "الحاوية المستهدفة"
                        : "Target Container"}
                    </span>
                    <span className="text-sm font-medium">1.8 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded">
                    <div className="bg-success h-2 rounded w-1/6"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {i18n.language === "ar" ? "سجلات النظام" : "System Logs"}
                    </span>
                    <span className="text-sm font-medium">324 MB / 1 GB</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded">
                    <div className="bg-warning h-2 rounded w-1/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Settings */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  {i18n.language === "ar"
                    ? "تكوين الأمان"
                    : " Security Configuration"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>
                      {" "}
                      {i18n.language === "ar"
                        ? "تمكين تسجيل التدقيق"
                        : "Enable Audit Logging"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {i18n.language === "ar"
                        ? "  تتبع جميع إجراءات المستخدمين وأحداث النظام"
                        : "  Track all user actions and system events"}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>
                      {i18n.language === "ar"
                        ? "يتطلب MFA لإجراءات المسؤول"
                        : "Require MFA for Admin Actions"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {i18n.language === "ar"
                        ? "مصادقة إضافية للعمليات الحساسة"
                        : "Additional authentication for sensitive operations"}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>
                      {" "}
                      {i18n.language === "ar"
                        ? "مدة الجلسة (بالدقائق)"
                        : "Session Timeout (Minutes)"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {i18n.language === "ar"
                        ? "تسجيل الخروج التلقائي بعد فترة من عدم النشاط"
                        : "Automatic logout after inactivity"}
                    </p>
                  </div>
                  <Input type="number" defaultValue="60" className="w-20" />
                </div>

                <div className="space-y-2">
                  <Label>
                    {" "}
                    {i18n.language === "ar"
                      ? "نطاقات IP المسموح بها"
                      : "Allowed IP Ranges"}
                  </Label>
                  <Textarea
                    placeholder="192.168.1.0/24&#10;10.0.0.0/8"
                    className="h-20"
                  />
                </div>

                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {i18n.language === "ar"
                    ? "تحديث إعدادات الأمان"
                    : "Update Security Settings"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {" "}
                  {i18n.language === "ar" ? "حالة الأمان" : "Security Status"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {" "}
                      {i18n.language === "ar" ? "شهادة SSL" : "SSL Certificate"}
                    </span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">
                        {" "}
                        {i18n.language === "ar" ? "صالح" : "Valid"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {" "}
                      {i18n.language === "ar"
                        ? "تكامل Azure AD"
                        : "Azure AD Integration"}
                    </span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">
                        {i18n.language === "ar" ? "متصل" : "Connected"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {i18n.language === "ar"
                        ? "تشفير النسخ الاحتياطي"
                        : "Backup Encryption"}
                    </span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">
                        {" "}
                        {i18n.language === "ar" ? "مفعل" : "Enabled"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {" "}
                      {i18n.language === "ar"
                        ? "حالة جدار الحماية"
                        : "Firewall Status"}
                    </span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">
                        {" "}
                        {i18n.language === "ar" ? "نشط" : "Active"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">
                    {" "}
                    {i18n.language === "ar"
                      ? "أحداث الأمان الأخيرة"
                      : "Recent Security Events"}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">
                        {i18n.language === "ar"
                          ? "تم تجديد الشهادة بنجاح"
                          : "Certificate renewed successfully"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span className="text-sm">
                        {i18n.language === "ar"
                          ? "تم الكشف عن محاولة تسجيل دخول غير عادية"
                          : "Unusual login attempt detected"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
