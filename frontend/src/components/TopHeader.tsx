import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';
import { Bell, Moon, Sun, Globe, Menu, LogOut, User as UserIcon, Settings, LayoutDashboard, Library } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export default function TopHeader() {
  const { isDarkMode, toggleDarkMode, isSidebarCollapsed, toggleSidebar, language, setLanguage } = useUIStore();
  const { isAuthenticated, logout, user } = useAuthStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const translations = {
    en: {
      userInfo: 'User Info',
      dashboard: 'Dashboard',
      portfolio: 'Portfolio',
      projects: 'Projects',
      account: 'Account Settings',
      settings: 'Settings',
      logout: 'Logout',
      searchPlaceholder: 'Enter search term...',
      languageChange: 'Change Language'
    },
    ko: {
      userInfo: '사용자 정보',
      dashboard: '대시보드',
      portfolio: '포트폴리오',
      projects: '프로젝트',
      account: '내 정보 설정',
      settings: '환경 설정',
      logout: '로그아웃',
      searchPlaceholder: '검색어를 입력하세요',
      languageChange: '언어 변경'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.ko;
  
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLanguage(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-[var(--header-bg)] text-[var(--header-text)] backdrop-blur-md sticky top-0 z-40 border-b border-[var(--card-border)]">
      <div className="w-full h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-6">
          {isSidebarCollapsed && (
            <>
              <button 
                onClick={toggleSidebar}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors text-[var(--header-text)] opacity-80 hover:opacity-100 mr-2"
              >
                <Menu size={20} />
              </button>

              <NavLink to="/main" className="flex items-center gap-3 shrink-0 group animate-fade-in">
                <div className="w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-105">
                  <img src="/polpol_logo_blue_devil.svg" alt="" className="w-7 h-7" />
                </div>
                <span className="text-xl font-black tracking-tighter text-[var(--header-text)]">POLPOL</span>
              </NavLink>
            </>
          )}
        </div>
        
        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl px-12 hidden md:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Globe size={16} className="text-[var(--text-secondary)] group-focus-within:text-cyan-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              className="w-full h-10 bg-[var(--bg-subtle)] border border-[var(--card-border)] rounded-full pl-12 pr-4 text-sm text-[var(--text-primary)] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:bg-[var(--card-bg)] transition-all font-medium"
            />
          </div>
        </div>
        
        {/* Right Side: Quick Actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-[var(--header-text)] opacity-70 hover:opacity-100 transition-opacity">
            <Bell size={18} />
          </button>

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button 
              onClick={() => setShowLanguage(!showLanguage)}
              className="p-2 text-[var(--header-text)] opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1"
              title={t.languageChange}
            >
              <Globe size={18} />
              <span className="text-[10px] font-bold uppercase hidden sm:inline">
                {language === 'en' ? 'English' : '한국어'}
              </span>
            </button>

            {showLanguage && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-xl shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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
            className="p-2 text-[var(--header-text)] opacity-70 hover:opacity-100 transition-opacity"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isAuthenticated ? (
            <div className="relative ml-2" ref={menuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:scale-105 border-2 border-[var(--card-border)]"
                title={`${user?.name}님의 프로필`}
              >
                {user?.name ? user.name[0] : <UserIcon size={18} />}
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-[var(--card-border)] mb-1">
                    <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">{t.userInfo}</p>
                    <p className="text-sm font-black text-[var(--text-primary)] mt-1">{user?.name}</p>
                    <p className="text-[10px] text-[var(--text-secondary)] font-medium">{user?.studentId}</p>
                  </div>
                  
                  <div className="py-1">
                    <button 
                      onClick={() => { navigate('/dashboard'); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--sidebar-text-active)] transition-all group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                        <LayoutDashboard size={16} className="text-indigo-500" />
                      </div>
                      {t.dashboard}
                    </button>
                    
                    <button 
                      onClick={() => { navigate('/portfolio'); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--sidebar-text-active)] transition-all group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0">
                        <Library size={16} className="text-pink-500" />
                      </div>
                      {t.portfolio}
                    </button>

                    <button 
                      onClick={() => { navigate('/projects'); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--sidebar-text-active)] transition-all group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                        <LayoutDashboard size={16} className="text-orange-500" />
                      </div>
                      {t.projects}
                    </button>
                  </div>

                  <div className="h-px bg-[var(--card-border)] my-1"></div>

                  <div className="py-1">
                    <button 
                      onClick={() => { navigate('/account'); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--sidebar-text-active)] transition-all group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                        <UserIcon size={16} className="text-cyan-500" />
                      </div>
                      {t.account}
                    </button>
                    
                    <button 
                      onClick={() => { navigate('/settings'); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--sidebar-text-active)] transition-all group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center shrink-0">
                        <Settings size={16} className="text-gray-400" />
                      </div>
                      {t.settings}
                    </button>
                  </div>

                  <div className="h-px bg-[var(--card-border)] my-1"></div>

                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-bold text-red-500 hover:bg-red-500/5 transition-colors group/logout"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                      <LogOut size={16} />
                    </div>
                    {t.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="ml-2 px-4 py-1.5 text-sm font-bold text-[var(--header-text)] hover:text-cyan-400 transition-colors flex items-center gap-2"
            >
              <UserIcon size={18} />
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
