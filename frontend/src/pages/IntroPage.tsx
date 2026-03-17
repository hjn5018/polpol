import { Link, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { useState } from 'react';
import { Globe, Moon, Sun, ChevronDown } from 'lucide-react';

export default function IntroPage() {
  const { isAuthenticated } = useAuthStore();
  const { language, setLanguage, isDarkMode, toggleDarkMode } = useUIStore();
  const [showLanguage, setShowLanguage] = useState(false);

  const translations = {
    en: {
      title: 'POL.GG',
      subtitle: 'Incheon Campus AI Convergence Software\nPremium Job & Community Platform for Students',
      login: 'Login',
      signup: 'Sign up'
    },
    ko: {
      title: 'POL.GG',
      subtitle: '한국폴리텍대학 인천캠퍼스 AI융합소프트웨어과\n학생들을 위한 프리미엄 취업 및 커뮤니티 플랫폼',
      login: '로그인',
      signup: '회원가입'
    }
  };

  const t = translations[language];

  if (isAuthenticated) {
    return <Navigate to="/main" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Settings Bar */}
      <div className="absolute top-6 right-8 z-50 flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setShowLanguage(!showLanguage)}
            className="flex items-center gap-2 p-2 rounded-xl text-[var(--text-primary)] hover:bg-[var(--card-border)]/50 transition-colors group"
          >
            <Globe size={18} className="group-hover:text-[var(--primary)] transition-colors" />
            <span className="text-xs font-bold uppercase tracking-wider hidden md:block">
              {language === 'en' ? 'English' : '한국어'}
            </span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${showLanguage ? 'rotate-180' : ''}`} />
          </button>

          {showLanguage && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-2xl overflow-hidden py-1">
              <button
                onClick={() => { setLanguage('en'); setShowLanguage(false); }}
                className={`w-full px-4 py-2 text-left text-xs font-bold hover:bg-white/5 transition-colors ${language === 'en' ? 'text-cyan-400' : 'text-[var(--text-primary)]'}`}
              >
                English
              </button>
              <button
                onClick={() => { setLanguage('ko'); setShowLanguage(false); }}
                className={`w-full px-4 py-2 text-left text-xs font-bold hover:bg-white/5 transition-colors ${language === 'ko' ? 'text-[var(--primary)]' : 'text-[var(--text-primary)]'}`}
              >
                한국어
              </button>
            </div>
          )}
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-[var(--text-primary)] hover:bg-[var(--card-border)]/50 transition-colors group"
          title={isDarkMode ? (language === 'en' ? 'Switch to Light Mode' : '라이트 모드로 전환') : (language === 'en' ? 'Switch to Dark Mode' : '다크 모드로 전환')}
        >
          {isDarkMode ? (
            <Sun size={18} className="group-hover:text-yellow-400 transition-colors" />
          ) : (
            <Moon size={18} className="group-hover:text-[var(--primary)] transition-colors" />
          )}
        </button>
      </div>

      <div className="z-10 text-center space-y-10 max-w-3xl px-4">
        <div className="flex justify-center mb-4">
           <img src="/polpol_logo_blue_devil.svg" alt="Polpol Logo" className="w-20 h-20 drop-shadow-[0_0_15px_rgba(0,71,171,0.3)]" />
        </div>
        <h1 className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-gray-500 tracking-tight">
          {t.title}
        </h1>
        <p className="text-xl text-[var(--text-secondary)] font-medium leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
          {t.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-5 pt-8">
          <Link 
            to="/login"
            className="px-10 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white rounded-xl font-bold transition-all shadow-[0_0_20px_var(--primary-glow)] hover:shadow-[0_0_30px_var(--primary-glow)] transform hover:-translate-y-0.5"
          >
            {t.login}
          </Link>
          <Link 
            to="/signup"
            className="px-10 py-4 bg-[var(--card-inner-bg)] text-[var(--primary)] border border-[var(--card-border)] rounded-xl font-bold hover:bg-[var(--bg-subtle)] hover:border-[var(--primary)]/50 transition-all shadow-lg transform hover:-translate-y-0.5"
          >
            {t.signup}
          </Link>
        </div>
      </div>
    </div>
  );
}
