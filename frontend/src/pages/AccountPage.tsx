import { useState } from 'react';
import { UserCircle, Shield, Key, Check, AlertCircle, Camera, X, Pencil } from 'lucide-react';
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
    profileImage: 'Profile Image',
    selectImage: 'Select Photo',
    successProfile: 'Profile updated successfully.',
    errorProfile: 'Failed to update profile.',
    security: 'Security',
    securitySub: 'Manage account safety',
    currentPassword: 'Current Password',
    currentPasswordPlaceholder: '••••••••',
    newPassword: 'New Password',
    newPasswordPlaceholder: '••••••••',
    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder: '••••••••',
    passwordHint: 'At least 8 characters with letters, numbers, and special characters',
    updatePassword: 'Update password',
    deactivateTitle: 'Deactivate Account',
    deactivateSub: 'Once you delete your account, there is no going back. Please be certain.',
    deleteAccount: 'Delete account',
    successName: 'Name updated successfully.',
    errorName: 'Failed to update name.',
    errorMatch: 'Passwords do not match.',
    successPass: 'Password updated successfully.',
    errorPass: 'Failed to update password.',
    errorCurrentPass: 'Check your current password.',
  },
  ko: {
    title: '계정 설정',
    subtitle: '개인 정보 및 보안을 관리하세요.',
    personalInfo: '개인 정보',
    personalInfoSub: '기본 정보',
    fullName: '성명',
    fullNamePlaceholder: '성명을 입력하세요',
    updateInfo: '정보 업데이트',
    profileImage: '프로필 이미지',
    selectImage: '사진 선택',
    successProfile: '프로필이 성공적으로 업데이트되었습니다.',
    errorProfile: '프로필 업데이트에 실패했습니다.',
    security: '보안',
    securitySub: '계정 보안 관리',
    currentPassword: '현재 비밀번호',
    currentPasswordPlaceholder: '••••••••',
    newPassword: '새 비밀번호',
    newPasswordPlaceholder: '••••••••',
    confirmPassword: '비밀번호 확인',
    confirmPasswordPlaceholder: '••••••••',
    passwordHint: '8자 이상의 영문, 숫자, 특수문자 조합',
    updatePassword: '비밀번호 업데이트',
    deactivateTitle: '계정 탈퇴',
    deactivateSub: '계정을 삭제하면 되돌릴 수 없습니다. 신중하게 선택해주세요.',
    deleteAccount: '계정 탈퇴',
    successName: '이름이 성공적으로 업데이트되었습니다.',
    errorName: '이름 업데이트에 실패했습니다.',
    errorMatch: '비밀번호가 일치하지 않습니다.',
    successPass: '비밀번호가 성공적으로 업데이트되었습니다.',
    errorPass: '비밀번호 업데이트에 실패했습니다.',
    errorCurrentPass: '현재 비밀번호를 확인해주세요.',
  },
};

export default function AccountPage() {
  const { user, setUser } = useAuthStore();
  const { language } = useUIStore();
  const [name, setName] = useState(user?.name || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profileImageUrl || null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const t = translations[language as keyof typeof translations] || translations.en;

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

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:8080/api/users/me', { 
        name,
        profileImageUrl: profileImage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setMessage({ type: 'success', text: t.successProfile });
      setIsEditingName(false);
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
      await axios.put('http://localhost:8080/api/users/me/password', { 
        currentPassword, 
        newPassword: password 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
      setMessage({ type: 'success', text: t.successPass });
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.response?.data || t.errorPass;
      setMessage({ type: 'error', text: errorMsg });
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
            {/* Profile Image In Account */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-[var(--bg-subtle)] border-2 border-dashed border-[var(--card-border)] flex items-center justify-center overflow-hidden transition-all group-hover:border-[var(--primary)] shadow-inner">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle size={48} className="text-[var(--text-secondary)] opacity-30" />
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-full cursor-pointer">
                  <Camera size={24} className="text-white" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                {profileImage && (
                  <button 
                    type="button"
                    onClick={() => setProfileImage(null)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <p className="mt-3 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">{t.profileImage}</p>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1 text-center block">{t.fullName}</label>
                <div className="relative group max-w-sm mx-auto w-full">
                  <input 
                    type="text" 
                    value={name}
                    disabled={!isEditingName}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-[var(--bg-subtle)] border border-[var(--card-border)] rounded-2xl px-5 py-4 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--primary)]/50 transition-all placeholder:text-gray-700 text-center ${!isEditingName ? 'cursor-not-allowed opacity-80' : ''}`}
                    placeholder={t.fullNamePlaceholder}
                    required
                  />
                  {!isEditingName ? (
                    <button 
                      type="button"
                      onClick={() => setIsEditingName(true)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[var(--primary)] transition-colors p-1"
                    >
                      <Pencil size={18} />
                    </button>
                  ) : (
                    <UserCircle size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button 
                type="submit"
                disabled={isUpdating || !isEditingName || (name === user?.name && profileImage === user?.profileImageUrl)}
                className="w-full py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-50 text-white text-xs font-black rounded-2xl uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_15px_var(--primary-glow)]"
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
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">{t.currentPassword}</label>
                <div className="relative group">
                  <input 
                    type="password" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--card-border)] rounded-2xl px-5 py-4 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--primary)]/50 transition-all placeholder:text-gray-700"
                    placeholder="••••••••"
                    required
                  />
                  <Shield size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-[var(--primary)] transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">{t.newPassword}</label>
                <div className="relative group">
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--card-border)] rounded-2xl px-5 py-4 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--primary)]/50 transition-all placeholder:text-gray-700"
                    placeholder="••••••••"
                    required
                  />
                  <Key size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-[var(--primary)] transition-colors" />
                </div>
                <p className="mt-2 text-[10px] text-[var(--text-secondary)] opacity-80 font-medium pl-1">
                  {t.passwordHint}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">{t.confirmPassword}</label>
                <div className="relative group">
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--card-border)] rounded-2xl px-5 py-4 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--primary)]/50 transition-all placeholder:text-gray-700"
                    placeholder="••••••••"
                    required
                  />
                  <Key size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-[var(--primary)] transition-colors" />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isUpdating || !password || password !== confirmPassword}
              className="w-full py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-50 text-white text-xs font-black rounded-2xl uppercase tracking-[0.2em] transition-all active:scale-95 shadow-[0_0_15px_var(--primary-glow)]"
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

