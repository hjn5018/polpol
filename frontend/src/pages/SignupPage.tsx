import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUIStore } from '../store/uiStore';
import { Globe, Moon, Sun, ChevronDown } from 'lucide-react';

export default function SignupPage() {
  const { language, setLanguage, isDarkMode, toggleDarkMode } = useUIStore();
  const [showLanguage, setShowLanguage] = useState(false);
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  
  // Step 2
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Step 3
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signupError, setSignupError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const translations = {
    en: {
      createAccount: 'Create Account',
      termsTitle: 'Terms of Service',
      termsContent: 'This service is for students of the AI Convergence Software Department at Korea Polytechnic University Incheon Campus. Email verification (@office.kopo.ac.kr) is required during signup...',
      agreeTerms: 'I agree to the Terms of Service and Privacy Policy.',
      nextStep: 'Next Step',
      haveAccount: 'Already have an account?',
      login: 'Log in',
      emailVerification: 'Email Verification',
      schoolEmail: 'School Email (@office.kopo.ac.kr)',
      send: 'Send',
      reset: 'Reset',
      verificationCode: 'Verification Code (6-digit)',
      verify: 'Verify',
      goBack: 'Go Back',
      profileDetails: 'Profile Details',
      fullName: 'Full Name',
      namePlaceholder: 'Hong Gil-dong',
      studentId: 'Student ID (학번)',
      idPlaceholder: 'e.g. 2502801801',
      password: 'Password',
      completeSignup: 'Complete Signup',
      processing: 'Processing...',
      signupSuccess: 'Signup complete. Please log in.',
      codeSent: 'Verification code sent. Please check your email.',
      emailError: 'Failed to send email.',
      codeError: 'Invalid verification code.',
      signupFailed: 'Signup failed.'
    },
    ko: {
      createAccount: '계정 생성',
      termsTitle: '이용약관',
      termsContent: '한국폴리텍대학 인천캠퍼스 AI융합소프트웨어과 학생들을 위한 서비스입니다. 가입 시 교내 이메일 계정(@office.kopo.ac.kr) 인증이 필요합니다...',
      agreeTerms: '이용약관 및 개인정보 처리방침에 동의합니다.',
      nextStep: '다음 단계',
      haveAccount: '이미 계정이 있으신가요?',
      login: '로그인',
      emailVerification: '이메일 인증',
      schoolEmail: '학교 이메일 (@office.kopo.ac.kr)',
      send: '전송',
      reset: '초기화',
      verificationCode: '인증 코드 (6자리)',
      verify: '인증하기',
      goBack: '뒤로 가기',
      profileDetails: '프로필 상세 정보',
      fullName: '성명',
      namePlaceholder: '홍길동',
      studentId: '학번',
      idPlaceholder: '예: 2502801801',
      password: '비밀번호',
      completeSignup: '회원가입 완료',
      processing: '처리 중...',
      signupSuccess: '회원가입이 완료되었습니다. 로그인해 주세요.',
      codeSent: '인증 코드가 전송되었습니다. 이메일을 확인해주세요.',
      emailError: '이메일 전송에 실패했습니다.',
      codeError: '인증 코드가 일치하지 않습니다.',
      signupFailed: '회원가입에 실패했습니다.'
    }
  };

  const t = translations[language];

  const handleSendCode = async () => {
    try {
      setLoading(true);
      setEmailError('');
      await axios.post('http://localhost:8080/api/auth/send-verification', { email });
      setEmailSent(true);
      alert(t.codeSent);
    } catch (err: any) {
      setEmailError(err.response?.data || t.emailError);
      setEmailSent(true);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setLoading(true);
      setEmailError('');
      await axios.post('http://localhost:8080/api/auth/verify-code', { email, code: verificationCode });
      setEmailVerified(true);
      alert(t.signupSuccess.split('.')[0]); // Simple completion alert
      setStep(3);
    } catch (err: any) {
      setEmailError(err.response?.data || t.codeError);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailVerified) return;
    
    try {
      setLoading(true);
      setSignupError('');
      await axios.post('http://localhost:8080/api/auth/signup', {
        studentId, email, password, name
      });
      alert(t.signupSuccess);
      navigate('/login');
    } catch (err: any) {
      setSignupError(err.response?.data || t.signupFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4 relative overflow-hidden">
      {/* Settings Bar */}
      <div className="absolute top-6 right-8 z-50 flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setShowLanguage(!showLanguage)}
            className="flex items-center gap-2 p-2 rounded-xl text-[var(--text-primary)] hover:bg-[var(--card-border)]/50 transition-colors group"
          >
            <Globe size={18} className="group-hover:text-cyan-400 transition-colors" />
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
                className={`w-full px-4 py-2 text-left text-xs font-bold hover:bg-white/5 transition-colors ${language === 'ko' ? 'text-cyan-400' : 'text-[var(--text-primary)]'}`}
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
            <Sun size={18} className="group-hover:text-yellow-400 transition-colors text-yellow-500" />
          ) : (
            <Moon size={18} className="group-hover:text-cyan-400 transition-colors" />
          )}
        </button>
      </div>

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="bg-[var(--card-bg)] backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-[var(--card-border)] z-10">
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-3 mb-6">
             <img src="/polpol_logo_blue_devil.svg" alt="Polpol Logo" className="w-8 h-8" />
             <span className="text-2xl font-black tracking-wider text-[#0047AB]">POLPOL</span>
          </Link>
          <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">{t.createAccount}</h2>
          <div className="flex gap-2 mt-5 mb-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= i ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'bg-[var(--card-border)]'}`} />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="animate-fade-in text-[var(--text-primary)]">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t.termsTitle}</h3>
            <div className="bg-[var(--input-bg)] p-4 text-[var(--text-secondary)] rounded-xl border border-[var(--card-border)] h-40 overflow-y-auto text-sm mb-6 leading-relaxed">
              {t.termsContent}
            </div>
            <label className="flex items-center gap-3 cursor-pointer mb-8 p-3 hover:bg-[var(--card-border)]/50 rounded-xl transition border border-transparent hover:border-[var(--card-border)]">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={() => setAgreed(!agreed)}
                className="w-5 h-5 rounded border-[var(--card-border)] bg-[var(--input-bg)] text-cyan-500 focus:ring-cyan-500 focus:ring-offset-[var(--card-bg)]"
              />
              <span className="text-[var(--text-primary)] font-medium text-sm">{t.agreeTerms}</span>
            </label>
            <button 
              onClick={() => agreed && setStep(2)}
              disabled={!agreed}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:shadow-none flex justify-center items-center"
            >
              {t.nextStep}
            </button>
            <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
              {t.haveAccount}
              <Link to="/login" className="ml-2 text-cyan-500 font-bold hover:text-cyan-400 transition-colors">
                {t.login}
              </Link>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in space-y-6">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{t.emailVerification}</h3>
            {emailError && <div className="text-sm text-[#ef4444] bg-[#ef4444]/10 border border-[#ef4444]/20 py-3 px-4 rounded-xl font-medium">{emailError}</div>}
            
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t.schoolEmail}</label>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  value={email}
                  disabled={emailSent || loading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3.5 rounded-xl border border-[var(--card-border)] focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition bg-[var(--input-bg)] text-[var(--text-primary)] placeholder-gray-600 shadow-inner disabled:opacity-50"
                  placeholder="id@office.kopo.ac.kr"
                />
                {!emailSent ? (
                  <button 
                    onClick={handleSendCode}
                    disabled={!email || !email.includes('@office.kopo.ac.kr') || loading}
                    className="px-5 py-3.5 bg-[var(--sidebar-bg)] text-cyan-400 rounded-xl font-bold hover:bg-[var(--card-border)] transition whitespace-nowrap border border-[var(--card-border)] disabled:opacity-50 disabled:text-gray-500"
                  >
                    {t.send}
                  </button>
                ) : (
                  <button onClick={() => setEmailSent(false)} disabled={loading} className="px-5 py-3.5 bg-[var(--sidebar-bg)] border border-[var(--card-border)] text-gray-400 rounded-xl font-bold hover:bg-[var(--card-border)] transition whitespace-nowrap disabled:opacity-50">{t.reset}</button>
                )}
              </div>
            </div>

            {emailSent && (
              <div className="animate-fade-in pt-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t.verificationCode}</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={verificationCode}
                    disabled={loading}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="flex-1 px-4 py-3.5 rounded-xl border border-[var(--card-border)] focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition bg-[var(--input-bg)] text-[var(--text-primary)] placeholder-gray-600 shadow-inner text-center font-mono tracking-[0.5em] text-lg disabled:opacity-50"
                    maxLength={6}
                    placeholder="000000"
                  />
                  <button 
                    onClick={handleVerifyCode}
                    disabled={verificationCode.length !== 6 || loading}
                    className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:from-cyan-400 hover:to-blue-500 transition shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:shadow-none"
                  >
                    {t.verify}
                  </button>
                </div>
              </div>
            )}
            <button onClick={() => setStep(1)} disabled={loading} className="w-full mt-6 py-3 text-[var(--text-secondary)] font-semibold hover:text-[var(--text-primary)] transition text-sm">{t.goBack}</button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSignup} className="animate-fade-in space-y-5">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">{t.profileDetails}</h3>
            {signupError && <div className="text-sm text-[#ef4444] bg-[#ef4444]/10 border border-[#ef4444]/20 py-3 px-4 rounded-xl font-medium">{signupError}</div>}
            
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t.fullName}</label>
              <input 
                type="text" 
                value={name}
                disabled={loading}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition bg-[var(--input-bg)] text-[var(--text-primary)] placeholder-gray-600 shadow-inner disabled:opacity-50"
                placeholder={t.namePlaceholder}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t.studentId}</label>
              <input 
                type="text" 
                value={studentId}
                disabled={loading}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition bg-[var(--input-bg)] text-[var(--text-primary)] placeholder-gray-600 shadow-inner disabled:opacity-50"
                placeholder={t.idPlaceholder}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t.password}</label>
              <input 
                type="password" 
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition bg-[var(--input-bg)] text-[var(--text-primary)] placeholder-gray-600 shadow-inner disabled:opacity-50"
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:shadow-none flex justify-center items-center"
            >
              {loading ? t.processing : t.completeSignup}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
