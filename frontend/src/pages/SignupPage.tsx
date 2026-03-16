import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUIStore } from '../store/uiStore';
import { Globe, Moon, Sun, ChevronDown, Camera, X } from 'lucide-react';

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
  const [department, setDepartment] = useState('AI융합소프트웨어과');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showDeptSearch, setShowDeptSearch] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSupport, setShowSupport] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const codeInputs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
      schoolEmail: 'School Email',
      send: 'Send',
      reset: 'Reset',
      verificationCode: 'Verification Code (6-digit)',
      verify: 'Verify',
      goBack: 'Go Back',
      profileDetails: 'Profile Details',
      fullName: 'Full Name',
      namePlaceholder: 'Polpol',
      studentId: 'Student ID (Number)',
      idPlaceholder: 'e.g. 2502801801',
      password: 'Password',
      department: 'Department',
      deptPlaceholder: 'Search department...',
      passwordHint: 'At least 8 characters with letters, numbers, and special characters',
      invalidPassword: 'Password must be at least 8 characters and include letters, numbers, and special characters.',
      profileImage: 'Profile Image',
      optional: '(Optional)',
      selectImage: 'Select Photo',
      completeSignup: 'Complete Signup',
      processing: 'Processing...',
      signupSuccess: 'Signup complete. Please log in.',
      codeSent: 'Verification code sent. Please check your email.',
      emailError: 'Failed to send email.',
      codeError: 'Invalid verification code.',
      invalidStudentId: 'Student ID must be exactly 10 digits.',
      notReceivedQuestion: 'Customer Support',
      notReceivedContact: 'support@office.kopo.ac.kr',
      copied: 'Copied!',
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
      schoolEmail: '폴리텍 이메일',
      send: '전송',
      reset: '초기화',
      verificationCode: '인증 코드 (6자리)',
      verify: '인증하기',
      goBack: '뒤로 가기',
      profileDetails: '프로필 상세 정보',
      fullName: '성명',
      namePlaceholder: '폴폴',
      studentId: '학번',
      idPlaceholder: '예: 2502801801',
      password: '비밀번호',
      department: '소속 학과',
      deptPlaceholder: '학과 검색...',
      passwordHint: '8자 이상의 영문, 숫자, 특수문자 조합',
      invalidPassword: '비밀번호는 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다.',
      profileImage: '프로필 이미지',
      optional: '(선택)',
      selectImage: '사진 선택',
      completeSignup: '회원가입 완료',
      processing: '처리 중...',
      signupSuccess: '회원가입이 완료되었습니다. 로그인해 주세요.',
      codeSent: '인증 코드가 전송되었습니다. 이메일을 확인해주세요.',
      emailError: '이메일 전송에 실패했습니다.',
      codeError: '인증 코드가 일치하지 않습니다.',
      invalidStudentId: '학번은 숫자 10자리여야 합니다.',
      notReceivedQuestion: '고객 지원',
      notReceivedContact: 'support@office.kopo.ac.kr',
      copied: '복사됨!',
      signupFailed: '회원가입에 실패했습니다.'
    }
  };

  const departments = [
    'AI융합소프트웨어과',
    '메카트로닉스공학과',
    '디지털디자인과',
    '반도체전자과',
    '건축설계과',
    '기계공학과',
    '반도체공정과',
    '반도체시스템과',
    '방송미디어과',
    '산업설비자동화과',
    '자동차공학과',
    '전기공학과',
    '컴퓨터공학과'
  ];

  const filteredDepts = departments.filter(dept => 
    dept.toLowerCase().includes(department.toLowerCase())
  );

  const t = translations[language];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert(language === 'ko' ? '이미지 크기는 2MB 이하여야 합니다.' : 'Image size must be less than 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendCode = async () => {
    const studentIdRegex = /^\d{10}$/;
    if (!studentIdRegex.test(email)) {
      setEmailError(t.invalidStudentId);
      return;
    }

    // Transition immediately to OTP view
    setEmailSent(true);
    setTimeout(() => codeInputs.current[0]?.focus(), 100);

    try {
      setLoading(true);
      setEmailError('');
      const fullEmail = `${email}@office.kopo.ac.kr`;
      await axios.post('http://localhost:8080/api/auth/send-verification', { email: fullEmail });
      setTimeLeft(300); // Start timer only after successful email sending
    } catch (err: any) {
      const errorMsg = err.response?.data || t.emailError;
      setEmailError(errorMsg);
      // If error occurs, we stay in the OTP view but show the error
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    const fullCode = verificationCode;
    if (fullCode.length !== 6) return;

    try {
      setLoading(true);
      setEmailError('');
      const fullEmail = `${email}@office.kopo.ac.kr`;
      await axios.post('http://localhost:8080/api/auth/verify-code', { email: fullEmail, code: fullCode });
      setEmailVerified(true);
      setTimeLeft(0);
      setStudentId(email);
      alert(language === 'ko' ? '인증되었습니다.' : 'Verified successfully.');
      setStep(3);
    } catch (err: any) {
      setEmailError(err.response?.data || t.codeError);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = verificationCode.split('');
    newCode[index] = value.slice(-1);
    const updatedCode = newCode.join('');
    setVerificationCode(updatedCode);

    if (value && index < 5) {
      codeInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      codeInputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    setVerificationCode(pastedData);
    
    // Distribute data to inputs if needed visually (state handles it, but focus last filled)
    const nextIndex = Math.min(pastedData.length, 5);
    codeInputs.current[nextIndex]?.focus();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(t.notReceivedContact);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailVerified) return;
    
    // Password validation: At least 8 chars, letters, numbers, and special chars
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setSignupError(t.invalidPassword);
      return;
    }

    try {
      setLoading(true);
      setSignupError('');
      const fullEmail = `${email}@office.kopo.ac.kr`;
      await axios.post('http://localhost:8080/api/auth/signup', {
        studentId, 
        email: fullEmail, 
        password, 
        name, 
        department,
        profileImageUrl: profileImage
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
            <Sun size={18} className="group-hover:text-yellow-400 transition-colors text-yellow-500" />
          ) : (
            <Moon size={18} className="group-hover:text-[var(--primary)] transition-colors" />
          )}
        </button>
      </div>

      {/* Background Glowing Effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--primary-glow)] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="bg-[var(--card-bg)] backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-[var(--card-border)] z-10">
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-3 mb-6">
             <img src="/polpol_logo_blue_devil.svg" alt="Polpol Logo" className="w-8 h-8" />
             <span className="text-2xl font-black tracking-wider text-[#0047AB]">POLPOL</span>
          </Link>
          <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">{t.createAccount}</h2>
          <div className="flex gap-2 mt-5 mb-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= i ? 'bg-[var(--primary)] shadow-[0_0_8px_var(--primary-glow)]' : 'bg-[var(--card-border)]'}`} />
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
                className="w-5 h-5 rounded border-[var(--card-border)] bg-[var(--input-bg)] text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-offset-[var(--card-bg)]"
              />
              <span className="text-[var(--text-primary)] font-medium text-sm">{t.agreeTerms}</span>
            </label>
            <button 
              onClick={() => agreed && setStep(2)}
              disabled={!agreed}
              className="w-full py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white rounded-xl font-bold transition-all shadow-[0_0_15px_var(--primary-glow)] hover:shadow-[0_0_25px_var(--primary-glow)] disabled:opacity-50 disabled:shadow-none flex justify-center items-center"
            >
              {t.nextStep}
            </button>
            <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
              {t.haveAccount}
              <Link to="/login" className="ml-2 text-[var(--primary)] font-bold hover:text-[var(--primary-hover)] transition-colors">
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
              <div className="flex flex-col gap-3">
                <div className="space-y-1.5">
                  <input 
                    type="text" 
                    value={email}
                    disabled={emailSent || loading}
                    onChange={(e) => setEmail(e.target.value.split('@')[0])}
                    className={`w-full px-4 py-4 bg-[var(--input-bg)] rounded-xl border border-[var(--card-border)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition text-[var(--text-primary)] font-bold text-lg placeholder-gray-600 shadow-inner ${emailSent || loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    placeholder={language === 'ko' ? '학번 (ID) 입력' : 'Student ID'}
                  />
                  <div className="flex justify-between items-center px-2">
                    {emailSent ? (
                      <button 
                        onClick={handleSendCode}
                        disabled={loading}
                        className="text-[11px] font-bold text-[var(--primary)] opacity-60 hover:opacity-100 transition-opacity underline underline-offset-4"
                      >
                        {language === 'ko' ? '코드 다시 받기' : 'Resend Code'}
                      </button>
                    ) : <div></div>}
                    <span className="text-xs font-bold text-[var(--primary)] opacity-80">
                      @office.kopo.ac.kr
                    </span>
                  </div>
                </div>
                {!emailSent && (
                  <button 
                    onClick={handleSendCode}
                    disabled={email.length !== 10 || loading}
                    className="w-full py-4 mt-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white rounded-xl font-bold transition-all shadow-[0_0_15px_var(--primary-glow)] hover:shadow-[0_0_25px_var(--primary-glow)] disabled:opacity-50 disabled:shadow-none"
                  >
                    {t.send}
                  </button>
                )}
              </div>
            </div>

            {emailSent && (
              <div className="animate-fade-in-up pt-2">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-[var(--text-secondary)]">{t.verificationCode}</label>
                  {timeLeft > 0 && (
                    <span className="text-sm font-bold text-red-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                      {formatTime(timeLeft)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between gap-2" onPaste={handlePaste}>
                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                      <input
                        key={idx}
                        ref={(el) => { codeInputs.current[idx] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={verificationCode[idx] || ''}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-12 h-16 sm:w-14 sm:h-20 text-center text-3xl font-black bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition text-[var(--text-primary)] shadow-lg"
                      />
                    ))}
                  </div>
                  <button 
                    onClick={handleVerifyCode}
                    disabled={verificationCode.length !== 6 || loading}
                    className="w-full py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white rounded-xl font-bold hover:opacity-90 transition shadow-[0_0_15px_var(--primary-glow)] disabled:opacity-50 disabled:shadow-none"
                  >
                    {t.verify}
                  </button>
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => setShowSupport(!showSupport)}
                      className="flex items-center gap-1.5 mx-auto text-[11px] text-[var(--text-secondary)] font-bold hover:text-[var(--primary)] transition-colors group"
                    >
                      <span>{t.notReceivedQuestion}</span>
                      <ChevronDown size={12} className={`transition-transform duration-200 ${showSupport ? 'rotate-180' : ''}`} />
                    </button>
                    {showSupport && (
                      <div className="mt-2 animate-fade-in relative inline-block">
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--primary)] font-semibold tracking-tight p-2 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2"
                          title="Click to copy"
                        >
                          {t.notReceivedContact}
                        </button>
                        {isCopied && (
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-[var(--primary)] text-white px-2 py-1 rounded-md animate-bounce">
                            {t.copied}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <button 
              onClick={() => {
                if (emailSent) {
                  setEmailSent(false);
                  setVerificationCode('');
                  setTimeLeft(0);
                  setShowSupport(false);
                } else {
                  setStep(1);
                }
              }} 
              disabled={loading} 
              className="w-full mt-8 py-4 bg-[var(--card-inner-bg)] text-[var(--text-secondary)] border border-[var(--card-border)] rounded-xl font-bold hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]/50 transition-all text-sm shadow-md"
            >
              {t.goBack}
            </button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSignup} className="animate-fade-in space-y-5">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">{t.profileDetails}</h3>
            {signupError && <div className="text-sm text-[#ef4444] bg-[#ef4444]/10 border border-[#ef4444]/20 py-3 px-4 rounded-xl font-medium">{signupError}</div>}
            
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-[var(--input-bg)] border-2 border-dashed border-[var(--card-border)] flex items-center justify-center overflow-hidden transition-all group-hover:border-[var(--primary)] shadow-inner">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera size={32} className="text-[var(--text-secondary)] opacity-50 transition-opacity group-hover:opacity-100" />
                  )}
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  title={t.selectImage}
                />
                {profileImage && (
                  <button 
                    type="button"
                    onClick={() => setProfileImage(null)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
              <div className="mt-3 text-center">
                <span className="text-xs font-bold text-[var(--text-primary)]">{t.profileImage}</span>
                <span className="text-[10px] text-[var(--text-secondary)] ml-1 font-medium">{t.optional}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                {t.fullName} <span className="text-red-500 ml-0.5">*</span>
              </label>
              <input 
                type="text" 
                value={name}
                disabled={loading}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition bg-[var(--input-bg)] text-[var(--text-primary)] placeholder-gray-600 shadow-inner disabled:opacity-50"
                placeholder={t.namePlaceholder}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                {t.department} <span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    setShowDeptSearch(true);
                  }}
                  onFocus={(e) => {
                    setShowDeptSearch(true);
                    e.target.select();
                  }}
                  onBlur={() => {
                    // Slight delay to allow item click
                    setTimeout(() => setShowDeptSearch(false), 200);
                  }}
                  className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--input-bg)] text-[var(--text-primary)] font-medium shadow-inner transition-all focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                  placeholder={t.deptPlaceholder}
                />
                <ChevronDown size={18} className={`absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none transition-transform duration-200 ${showDeptSearch ? 'rotate-180' : ''}`} />
              </div>

              {showDeptSearch && (
                <div className="absolute top-full left-0 mt-2 w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-2xl overflow-hidden z-[60] animate-fade-in">
                  <div className="max-h-48 overflow-y-auto">
                    {filteredDepts.length > 0 ? (
                      filteredDepts.map((dept) => (
                        <button
                          key={dept}
                          type="button"
                          onMouseDown={() => {
                            setDepartment(dept);
                            setShowDeptSearch(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-[var(--primary-glow)] transition-colors ${department === dept ? 'text-[var(--primary)] font-bold bg-[var(--primary-glow)]' : 'text-[var(--text-primary)]'}`}
                        >
                          {dept}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-[var(--text-secondary)] text-center italic">
                        {language === 'ko' ? '검색 결과 없음' : 'No matches found'}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                {t.password} <span className="text-red-500 ml-0.5">*</span>
              </label>
              <input 
                type="password" 
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition bg-[var(--input-bg)] text-[var(--text-primary)] placeholder-gray-600 shadow-inner disabled:opacity-50"
                placeholder="••••••••"
                required
              />
              <p className="mt-2 text-[11px] text-[var(--text-secondary)] opacity-80 font-medium pl-1">
                {t.passwordHint}
              </p>
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-6 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white rounded-xl font-bold transition-all shadow-[0_0_15px_var(--primary-glow)] hover:shadow-[0_0_25px_var(--primary-glow)] disabled:opacity-50 disabled:shadow-none flex justify-center items-center"
            >
              {loading ? t.processing : t.completeSignup}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
