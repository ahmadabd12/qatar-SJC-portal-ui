
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import GeometricBackground from '../components/login/GeometricBackground';
import LoginForm from '../components/login/LoginForm';

const LoginPage: React.FC = () => {
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen flex ${isRTL ? 'rtl flex-row-reverse' : 'ltr'}`}>
      <GeometricBackground />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
