import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Shield, Eye, Upload } from 'lucide-react';

interface RoleSelectorProps {
  selectedRole: 'Admin' | 'Reviewer' | 'Publisher';
  setSelectedRole: (role: 'Admin' | 'Reviewer' | 'Publisher') => void;
  onLogin: () => void;
  onBack: () => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRole,
  setSelectedRole,
  onLogin,
  onBack,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Choose Demo Role</h3>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {t('auth.selectRole')}
        </label>
        <Select value={selectedRole} onValueChange={(value: 'Admin' | 'Reviewer' | 'Publisher') => setSelectedRole(value)}>
          <SelectTrigger className="w-full py-3 text-base border-gray-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin">
              <div className="flex items-center space-x-3 rtl:space-x-reverse py-1">
                <Shield className="h-5 w-5 text-red-500" />
                <span className="font-medium">Admin - مدير النظام</span>
              </div>
            </SelectItem>
            <SelectItem value="Reviewer">
              <div className="flex items-center space-x-3 rtl:space-x-reverse py-1">
                <Eye className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Reviewer - مراجع قانوني</span>
              </div>
            </SelectItem>
            <SelectItem value="Publisher">
              <div className="flex items-center space-x-3 rtl:space-x-reverse py-1">
                <Upload className="h-5 w-5 text-green-600" />
                <span className="font-medium">Publisher - ناشر</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={onLogin}
        className="w-full bg-maroon-700 hover:bg-maroon-800 text-white py-4 text-base font-semibold rounded-lg transition-all duration-200"
        size="lg"
      >
        Continue as {selectedRole}
      </Button>

      <Button
        onClick={onBack}
        variant="ghost"
        className="w-full text-gray-600 hover:text-gray-700 hover:bg-gray-50 py-2"
      >
        ← Back to Login Options
      </Button>
    </div>
  );
};

export default RoleSelector;