import { useState } from 'react';
import { Bell, Shield, Check } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export default function SettingsPage() {
  const { language } = useUIStore();
  
  // Toggle states
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    profileVisibility: true,
    searchIndexing: true,
    dataUsage: false,
  });

  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2000);
  };

  const toggleSetting = (key: keyof typeof settings, label: string) => {
    const newValue = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newValue }));
    
    // Translated toast messages
    const status = language === 'en' 
      ? (newValue ? 'Enabled' : 'Disabled')
      : (newValue ? '활성화됨' : '비활성화됨');
    showToast(`${label} ${status}`);
  };

  const sections = [
    { 
      title: language === 'en' ? 'Notifications' : '알림', 
      icon: <Bell size={18} />, 
      items: [
        { id: 'emailNotifications', label: language === 'en' ? 'Email Notifications' : '이메일 알림' },
        { id: 'pushNotifications', label: language === 'en' ? 'Push Notifications' : '푸시 알림' },
      ] 
    },
    { 
      title: language === 'en' ? 'Privacy' : '개인정보 관리', 
      icon: <Shield size={18} />, 
      items: [
        { id: 'profileVisibility', label: language === 'en' ? 'Profile Visibility' : '프로필 공개 여부' },
        { id: 'searchIndexing', label: language === 'en' ? 'Search Engine Indexing' : '검색 엔진 인덱싱' },
        { id: 'dataUsage', label: language === 'en' ? 'Data Usage' : '데이터 사용량' },
      ] 
    },
  ];

  const t = {
    title: language === 'en' ? 'Settings' : '설정',
    subtitle: language === 'en' ? 'Customize your experience on the platform.' : '플랫폼 이용 환경을 맞춤 설정하세요.',
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-10 px-4 mt-8 relative">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">{t.title}</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-2">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <section key={section.title} className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[32px] overflow-hidden hover:border-white/10 transition-all group">
            <div className="px-8 py-6 border-b border-[var(--card-border)] bg-gradient-to-r from-[var(--bg-subtle)] to-transparent flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all">
                  <div className="text-[var(--text-secondary)] group-hover:text-cyan-400 transition-colors">
                    {section.icon}
                  </div>
                </div>
                <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">{section.title}</h3>
              </div>
            </div>
            
            <div className="p-8 space-y-4">
              {section.items.map((item) => {
                const isActive = settings[item.id as keyof typeof settings];

                return (
                  <div 
                    key={item.id} 
                    onClick={() => toggleSetting(item.id as keyof typeof settings, item.label)}
                    className="flex items-center justify-between group/item cursor-pointer"
                  >
                    <span className="text-sm text-[var(--text-secondary)] group-hover/item:text-[var(--text-primary)] transition-colors">{item.label}</span>
                    <div className={`w-10 h-6 rounded-full border p-1 flex items-center transition-all ${
                      isActive 
                        ? 'bg-cyan-500/20 border-cyan-500/50 justify-end' 
                        : 'bg-[var(--card-inner-bg)] border-[var(--card-border)] justify-start'
                    }`}>
                      <div className={`w-4 h-4 rounded-full transition-all ${
                        isActive ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'bg-gray-600'
                      }`}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
          <div className="bg-[var(--card-bg)]/90 backdrop-blur-xl border border-cyan-500/30 px-6 py-3 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.2)] flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <Check size={16} className="text-cyan-400" />
            </div>
            <span className="text-[var(--text-primary)] text-sm font-bold">{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}
