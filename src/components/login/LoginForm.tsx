import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, User } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Globe, Building } from 'lucide-react';
import RoleSelector from './RoleSelector';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showDemoLogin, setShowDemoLogin] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'Reviewer' | 'Publisher'>('Reviewer');

  const handleMicrosoftLogin = () => {
    // In a real app, this would redirect to Azure AD
    console.log('Redirecting to Microsoft login...');
    // Simulate successful login
    setTimeout(() => {
      const demoUser: User = {
        id: '1',
        name: 'Ahmed Al-Mansouri',
        email: 'ahmed.mansouri@sjc.gov.qa',
        role: 'Admin',
        aadObjectId: 'aad-123-456',
        language: language,
      };
      login(demoUser);
      navigate('/dashboard');
    }, 1000);
  };

  const handleDemoLogin = () => {
    const demoUser: User = {
      id: '2',
      name: selectedRole === 'Admin' ? 'مريم القحطاني' : selectedRole === 'Reviewer' ? 'محمد العلي' : 'فاطمة النعيمي',
      email: `${selectedRole.toLowerCase()}@sjc.gov.qa`,
      role: selectedRole,
      aadObjectId: `demo-${selectedRole.toLowerCase()}`,
      language: language,
    };
    login(demoUser);
    navigate('/dashboard');
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md">
        {/* Logo and System Title */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg p-2">
              <img 
                src="https://itc.sjc.gov.qa/Style%20Library/images/Website/svg/logo.svg" 
                alt="SJC Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('auth.welcomeTitle')}
          </h1>
          <p className="text-lg text-gray-600 mb-1">
            {t('auth.welcomeSubtitle')}
          </p>
          <p className="text-sm text-gray-500">
            National Authentication System
          </p>
        </div>

        <div className="space-y-6">
          {!showDemoLogin ? (
            <>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Sign in to your account</h3>
              </div>

              <Button
                onClick={handleMicrosoftLogin}
                className="w-full bg-[#0078d4] hover:bg-[#106ebe] text-white py-4 text-base font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                size="lg"
              >
                <div className="flex items-center justify-center">
                  <svg className="mr-3 h-5 w-5 rtl:ml-3 rtl:mr-0" viewBox="0 0 23 23" fill="currentColor">
                    <path d="M1.194 10.962h10.043V1.194H1.194v9.768zm11.237 0H22.474V1.194H12.431v9.768zm0 11.237H22.474V12.43H12.431v9.768zM1.194 22.199h10.043V12.43H1.194v9.768z"/>
                  </svg>
                  <span>{t('auth.loginWith')}</span>
                </div>
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500 font-medium">Or</span>
                </div>
              </div>

              <Button
                onClick={() => setShowDemoLogin(true)}
                variant="outline"
                className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-4 text-base font-semibold rounded-lg transition-all duration-200"
                size="lg"
              >
                <Building className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
                {t('auth.demoLogin')}
              </Button>
            </>
          ) : (
            <RoleSelector
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              onLogin={handleDemoLogin}
              onBack={() => setShowDemoLogin(false)}
            />
          )}

          <div className="pt-6 border-t border-gray-200">
            <Button
              onClick={toggleLanguage}
              variant="ghost"
              className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-gray-700 hover:bg-gray-50 py-3 rounded-lg"
            >
              <Globe className="h-5 w-5" />
              <span className="font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;