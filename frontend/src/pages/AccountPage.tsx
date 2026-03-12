import { useState } from 'react';
import { UserCircle, Shield, Key, Check, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import axios from 'axios';

const translations = {
  en: {
    title: 'Account Settings',
    subtitle: 'Manage your personal information and security.',
    personalInfo: 'Personal Info',
    personalInfoSub: 'Basic details about you',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Enter your full name',
    updateInfo: 'Update information',
    security: 'Security',
    securitySub: 'Manage account safety',
    newPassword: 'New Password',
    newPasswordPlaceholder: 'At least 8 characters',
    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder: 'Repeat new password',
    updatePassword: 'Update password',
    deactivateTitle: 'Deactivate Account',
    deactivateSub: 'Once you delete your account, there is no going back. Please be certain.',
    deleteAccount: 'Delete account',
    successName: 'Name updated successfully.',
    errorName: 'Failed to update name.',
    errorMatch: 'Passwords do not match.',
    successPass: 'Password updated successfully.',
    errorPass: 'Failed to update password.',
  },
  ko: {
    title: '계정 설정',
    subtitle: '개인 정보 및 보안을 관리하세요.',
    personalInfo: '개인 정보',
    personalInfoSub: '기본 정보',
    fullName: '성명',
    fullNamePlaceholder: '성명을 입력하세요',
    updateInfo: '정보 업데이트',
    security: '보안',
    securitySub: '계정 보안 관리',
    newPassword: '새 비밀번호',
    newPasswordPlaceholder: '최소 8자 이상',
    confirmPassword: '비밀번호 확인',
    confirmPasswordPlaceholder: '새 비밀번호를 다시 입력하세요',
    updatePassword: '비밀번호 업데이트',
    deactivateTitle: '계정 탈퇴',
    deactivateSub: '계정을 삭제하면 되돌릴 수 없습니다. 신중하게 선택해주세요.',
    deleteAccount: '계정 탈퇴',
    successName: '이름이 성공적으로 업데이트되었습니다.',
    errorName: '이름 업데이트에 실패했습니다.',
    errorMatch: '비밀번호가 일치하지 않습니다.',
    successPass: '비밀번호가 성공적으로 업데이트되었습니다.',
    errorPass: '비밀번호 업데이트에 실패했습니다.',
  },
};

export default function AccountPage() {
  const { user, setUser } = useAuthStore();
  const { language } = useUIStore();
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:8080/api/users/me', { name }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setMessage({ type: 'success', text: t.successName });
    } catch (error) {
      setMessage({ type: 'error', text: t.errorName });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: t.errorMatch });
      return;
    }
    setIsUpdating(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8080/api/users/me/password', { password }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPassword('');
      setConfirmPassword('');
      setMessage({ type: 'success', text: t.successPass });
    } catch (error) {
      setMessage({ type: 'error', text: t.errorPass });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-10 px-4 mt-8">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">{t.title}</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-2">{t.subtitle}</p>
      </div>

      {message && (
        <div className={`mb-8 p-4 rounded-2xl border flex items-center gap-3 animate-slide-in ${
          message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <p className="text-sm font-bold">{message.text}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Information */}
        <section className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          <div className="px-8 py-6 border-b border-[var(--card-border)] bg-gradient-to-r from-[var(--bg-subtle)] to-transparent flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
              <UserCircle size={24} className="text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">{t.personalInfo}</h3>
              <p className="text-[10px] text-[var(--text-secondary)] font-bold mt-0.5">{t.personalInfoSub}</p>
            </div>
          </div>
          
          <form onSubmit={handleUpdateName} className="p-8 flex-1 flex flex-col h-full">
            <div className="flex-1 flex flex-col justify-center min-h-[160px]">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1 text-center block">{t.fullName}</label>
                <div className="relative group max-w-sm mx-auto w-full">
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--card-border)] rounded-2xl px-5 py-4 text-[var(--text-primary)] text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700 text-center"
                    placeholder={t.fullNamePlaceholder}
                    required
                  />
                  <UserCircle size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button 
                type="submit"
                disabled={isUpdating || name === user?.name}
                className="w-full py-4 bg-white hover:bg-cyan-400 disabled:bg-gray-800 disabled:text-gray-600 text-black text-xs font-black rounded-2xl uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {t.updateInfo}
              </button>
            </div>
          </form>
        </section>

        {/* Security / Password */}
        <section className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          <div className="px-8 py-6 border-b border-[var(--card-border)] bg-gradient-to-r from-[var(--bg-subtle)] to-transparent flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
              <Shield size={24} className="text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">{t.security}</h3>
              <p className="text-[10px] text-[var(--text-secondary)] font-bold mt-0.5">{t.securitySub}</p>
            </div>
          </div>

          <form onSubmit={handleUpdatePassword} className="p-8 space-y-6 flex-1 flex flex-col h-full">
            <div className="space-y-6 flex-1 flex flex-col justify-center min-h-[160px]">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">{t.newPassword}</label>
                <div className="relative group">
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--card-border)] rounded-2xl px-5 py-4 text-[var(--text-primary)] text-sm focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-gray-700"
                    placeholder={t.newPasswordPlaceholder}
                    required
                  />
                  <Key size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">{t.confirmPassword}</label>
                <div className="relative group">
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--card-border)] rounded-2xl px-5 py-4 text-[var(--text-primary)] text-sm focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-gray-700"
                    placeholder={t.confirmPasswordPlaceholder}
                    required
                  />
                  <Key size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isUpdating || !password || password !== confirmPassword}
              className="w-full py-4 bg-[var(--button-bg)] hover:bg-[var(--text-primary)] hover:text-[var(--background)] border border-[var(--button-border)] disabled:border-gray-800 disabled:text-gray-600 text-[var(--text-secondary)] text-xs font-black rounded-2xl uppercase tracking-[0.2em] transition-all active:scale-95"
            >
              {t.updatePassword}
            </button>
          </form>
        </section>
      </div>

      <div className="mt-12 p-8 border border-[var(--card-border)] bg-[var(--card-bg)] rounded-[40px] flex items-center justify-between shadow-xl">
        <div>
          <h4 className="text-xl font-bold text-[var(--text-primary)] mb-1">{t.deactivateTitle}</h4>
          <p className="text-[var(--text-secondary)] text-sm">{t.deactivateSub}</p>
        </div>
        <button className="px-8 py-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-black rounded-2xl hover:bg-rose-500 hover:text-white transition-all uppercase tracking-widest">
          {t.deleteAccount}
        </button>
      </div>
    </div>
  );
}

