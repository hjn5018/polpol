import { NavLink, useLocation } from 'react-router-dom';
import { Library, UserCircle, LayoutDashboard, Settings, Briefcase, Home, Users, ShoppingBag, MessageSquare, Menu } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export default function Sidebar() {
  const location = useLocation();
  const { language, isSidebarCollapsed, toggleSidebar } = useUIStore();

  const translations = {
    en: {
      mainPage: 'Main Page',
      recruitment: 'Recruitment',
      community: 'Community',
      trade: 'Trade',
      studentCouncil: 'Council',
      dashboard: 'Dashboard',
      portfolio: 'Portfolio',
      jobApplications: 'Job Applications',
      projects: 'Projects',
      account: 'Account',
      settings: 'Settings',
      help: 'Help',
    },
    ko: {
      mainPage: '메인 페이지',
      recruitment: '채용 공고',
      community: '커뮤니티',
      trade: '중고거래',
      studentCouncil: '학생회 소통',
      dashboard: '대시보드',
      portfolio: '포트폴리오',
      jobApplications: '지원 현황',
      projects: '프로젝트',
      account: '계정 설정',
      settings: '환경 설정',
      help: '도움말',
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const isMyPage = location.pathname.startsWith('/dashboard') ||
                   location.pathname.startsWith('/portfolio') ||
                   location.pathname.startsWith('/projects') ||
                   location.pathname.startsWith('/applications') ||
                   location.pathname.startsWith('/account') ||
                   location.pathname.startsWith('/settings') ||
                   location.pathname.startsWith('/help');

  const mainNavItems = [
    { name: t.mainPage, path: '/main', icon: Home },
    { name: t.recruitment, path: '/recruitment', icon: Briefcase },
    { name: t.community, path: '/community', icon: Users },
    { name: t.trade, path: '/trade', icon: ShoppingBag },
    { name: t.studentCouncil, path: '/council', icon: MessageSquare },
  ];

  const myPageItems = [
    { name: t.dashboard, path: '/dashboard', icon: LayoutDashboard },
    { name: t.portfolio, path: '/portfolio', icon: Library },
    { name: t.projects, path: '/projects', icon: LayoutDashboard },
    { name: t.account, path: '/account', icon: UserCircle },
    { name: t.settings, path: '/settings', icon: Settings },
  ];

  return (
    <aside className={`${isSidebarCollapsed ? 'w-0' : 'w-64'} bg-[var(--sidebar-bg)] flex flex-col h-full shrink-0 hidden md:flex transition-all duration-300 ease-in-out relative overflow-hidden z-30 border-r border-[var(--card-border)]`}>
      
      {/* Branding inside Sidebar - Matches TopHeader Height & Color */}
      <div className="h-16 flex items-center px-4 border-b border-[var(--card-border)] shrink-0 bg-[var(--header-bg)]">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors text-[var(--header-text)] opacity-80 hover:opacity-100"
          >
            <Menu size={20} />
          </button>

          <NavLink to="/main" className="flex items-center gap-3 group">
            <div className="w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-105">
              <img src="/polpol_logo_blue_devil.svg" alt="" className="w-7 h-7" />
            </div>
            <span className="text-xl font-black tracking-tighter text-[var(--header-text)]">POLPOL</span>
          </NavLink>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {!isMyPage ? (
          mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-[var(--bg-subtle)] text-[var(--sidebar-text-active)] shadow-sm'
                      : 'text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-active)] hover:bg-[var(--bg-subtle)]'
                  }`
                }
              >
                <Icon size={18} className="stroke-[1.5]" />
                <span className="font-bold text-[13px] tracking-tight truncate">{item.name}</span>
              </NavLink>
            );
          })
        ) : (
          <div className="space-y-1">
            {myPageItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-[var(--bg-subtle)] text-[var(--sidebar-text-active)] shadow-sm'
                        : 'text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-active)] hover:bg-[var(--bg-subtle)]'
                    }`
                  }
                >
                  <Icon size={18} className="stroke-[1.5]" />
                  <span className="font-bold text-[13px] tracking-tight truncate">{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        )}
      </nav>
    </aside>
  );
}
