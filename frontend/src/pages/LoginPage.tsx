import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { Globe, Moon, Sun, ChevronDown } from 'lucide-react';

export default function LoginPage() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const { language, setLanguage, isDarkMode, toggleDarkMode } = useUIStore();
  const [showLanguage, setShowLanguage] = useState(false);

  const translations = {
    en: {
      welcome: 'Welcome Back',
      studentId: 'Student ID',
      password: 'Password',
      login: 'LOG IN',
      loggingIn: 'Logging in...',
      noAccount: "Don't have an account?",
      signup: 'Sign up',
      loginFailed: 'Login failed.',
      placeholderId: 'e.g. 2502801801'
    },
    ko: {
      welcome: '환영합니다',
      studentId: '학번',
      password: '비밀번호',
      login: '로그인',
      loggingIn: '로그인 중...',
      noAccount: '계정이 없으신가요?',
      signup: '회원가입',
      loginFailed: '로그인에 실패했습니다.',
      placeholderId: '예: 2502801801'
    }
  };

  const t = translations[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        studentId,
        password
      });
      setToken(response.data.accessToken);
      console.log('Login successful');
      navigate('/main');
    } catch (err: any) {
      setError(err.response?.data || t.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
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

      <div className="bg-[var(--card-bg)] backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-[var(--card-border)] z-10 relative">
        <div className="text-center mb-10">
          <Link to="/" className="flex flex-col items-center gap-4 mb-4">
             <img src="/polpol_logo_blue_devil.svg" alt="Polpol Logo" className="w-16 h-16" />
             <span className="text-3xl font-black tracking-wider text-[#0047AB]">POLPOL</span>
          </Link>
          <h2 className="text-xl font-bold text-[var(--text-secondary)]">{t.welcome}</h2>
        </div>
        
        {error && (
          <div className="mb-6 text-[#ef4444] text-sm text-center bg-[#ef4444]/10 py-3 px-4 rounded-xl border border-[#ef4444]/20 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">{t.studentId}</label>
            <input 
              type="text" 
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition outline-none bg-[var(--input-bg)] text-[var(--text-primary)] placeholder-gray-600 shadow-inner"
              placeholder={t.placeholderId}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">{t.password}</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition outline-none bg-[var(--input-bg)] text-[var(--text-primary)] placeholder-gray-600 shadow-inner"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-4 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white rounded-xl font-bold transition-all shadow-[0_0_15px_var(--primary-glow)] hover:shadow-[0_0_25px_var(--primary-glow)] disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? t.loggingIn : t.login}
          </button>
        </form>
        <div className="mt-8 text-center text-sm text-[var(--text-secondary)]">
          {t.noAccount}
          <Link to="/signup" className="ml-2 text-[var(--primary)] font-bold hover:text-[var(--primary-hover)] transition-colors">
            {t.signup}
          </Link>
        </div>
      </div>
    </div>
  );
}
