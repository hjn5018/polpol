import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { ChevronDown, Bell, CheckCircle2, Moon, Sun, Globe, HelpCircle, LogOut, User, UserCircle, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const translations = {
  en: {
    notifications: 'Notifications',
    noNotifications: 'No new notifications',
    help: 'Help',
    theme: 'Theme',
    student: 'Student',
    userFallback: 'User',
    myPage: 'My Page',
    logout: 'Logout',
    exampleNotifications: [
      { title: 'New Project created', time: '2 mins ago' },
      { title: 'Profile updated successfully', time: '1 hour ago' },
    ]
  },
  ko: {
    notifications: '알림',
    noNotifications: '새로운 알림이 없습니다',
    help: '도움말',
    theme: '테마',
    student: '학생',
    userFallback: '사용자',
    myPage: '마이 페이지',
    logout: '로그아웃',
    exampleNotifications: [
      { title: '새 프로젝트가 생성되었습니다', time: '2분 전' },
      { title: '프로필이 성공적으로 업데이트되었습니다', time: '1시간 전' },
    ]
  }
};

export default function TopHeader() {
  const { logout } = useAuthStore();
  const { language, setLanguage, isDarkMode, toggleDarkMode, isSidebarCollapsed, toggleSidebar } = useUIStore();
  const navigate = useNavigate();
  const t = translations[language as keyof typeof translations] || translations.en;
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<{ id: number; title: string; time: string; read: boolean }[]>([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguage(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationToggle = () => {
    const nextState = !showNotifications;
    setShowNotifications(nextState);
    if (nextState && unreadCount > 0) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfile(false);
  };

  const handleMyPage = () => {
    navigate('/account');
    setShowProfile(false);
  };

  return (
    <header className="h-16 bg-[var(--header-bg)] text-[var(--header-text)] backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className={`p-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-white/5 rounded-lg transition-colors`}
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <Menu size={24} />
          </button>

          <NavLink to="/main" className="flex items-center shrink-0 hover:opacity-80 transition-opacity">
            <img src="/polpol_logo_blue_devil.svg" alt="Polpol Logo" className="w-8 h-8" />
          </NavLink>
        </div>
        
        <div className="flex-1"></div>
        
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative" ref={languageRef}>
            <button 
              onClick={() => setShowLanguage(!showLanguage)}
              className="flex items-center gap-2 p-2 rounded-xl text-inherit hover:bg-white/10 transition-colors group"
            >
              <Globe size={18} className="group-hover:text-cyan-400 transition-colors" />
              <span className="text-xs font-bold uppercase tracking-wider hidden md:block">
                {language === 'en' ? 'English' : '한국어'}
              </span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${showLanguage ? 'rotate-180' : ''}`} />
            </button>

            {showLanguage && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-[var(--sidebar-bg)] border border-[var(--card-border)] rounded-xl shadow-2xl overflow-hidden animate-fade-in py-1">
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

          {/* Help Icon */}
          <button 
            onClick={() => navigate('/help')}
            className="p-2 rounded-xl text-inherit hover:bg-white/10 transition-colors group"
            title={t.help}
          >
            <HelpCircle size={18} className="group-hover:text-cyan-400 transition-colors" />
          </button>

          {/* Theme Toggle Icon */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-inherit hover:bg-white/10 transition-colors group"
            title={t.theme}
          >
            {isDarkMode ? (
              <Sun size={18} className="group-hover:text-cyan-400 transition-colors" />
            ) : (
              <Moon size={18} className="group-hover:text-cyan-400 transition-colors" />
            )}
          </button>

          <div className="h-6 w-px bg-white/10 mx-2"></div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={handleNotificationToggle}
              className={`p-2 transition-colors relative rounded-xl ${showNotifications ? 'bg-cyan-500/10 text-cyan-400' : 'text-inherit hover:bg-white/10 hover:text-cyan-400'}`}
            >
              <Bell 
                size={18} 
                className={unreadCount > 0 ? 'fill-cyan-400 text-cyan-400' : ''}
                fill={unreadCount > 0 ? "currentColor" : "none"}
              />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[var(--header-bg)] animate-pulse"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-[var(--sidebar-bg)] border border-[var(--card-border)] rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                <div className="px-4 py-3 border-b border-[var(--card-border)] flex justify-between items-center bg-[var(--bg-subtle)]">
                  <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">
                    {t.notifications}
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(n => (
                      <div key={n.id} className="p-4 border-b border-[var(--card-border)] hover:bg-white/5 transition-colors group cursor-pointer">
                        <div className="flex gap-3">
                          <div className={`mt-1 ${n.read ? 'text-gray-500' : 'text-cyan-400'}`}>
                            <CheckCircle2 size={14} />
                          </div>
                          <div>
                            <p className={`text-sm ${n.read ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'} font-medium`}>{n.title}</p>
                            <p className="text-[10px] text-gray-500 mt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-[var(--text-secondary)]">
                      <p className="text-sm">{t.noNotifications}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="h-8 w-px bg-white/10 mx-2"></div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-white/10 transition-all group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-cyan-500 font-medium uppercase tracking-wider">
                  {t.student}
                </p>
              </div>
              
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0047AB] to-blue-600 p-0.5 shadow-lg group-hover:shadow-blue-500/20 transition-all">
                <div className="w-full h-full bg-[#0047AB] rounded-full flex items-center justify-center overflow-hidden border-2 border-white/20">
                  <UserCircle size={24} className="text-white/90" />
                </div>
              </div>
              
              <ChevronDown size={14} className={`text-gray-500 group-hover:text-gray-300 transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} />
            </button>

            {showProfile && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[var(--sidebar-bg)] border border-[var(--card-border)] rounded-2xl shadow-2xl overflow-hidden animate-fade-in py-2">
                <button
                  onClick={handleMyPage}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-primary)] hover:bg-white/5 transition-colors"
                >
                  <User size={18} className="text-cyan-400" />
                  <span className="font-medium">{t.myPage}</span>
                </button>
                <div className="h-px bg-[var(--card-border)] my-1 mx-4"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-400 hover:bg-white/5 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="font-medium">{t.logout}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

