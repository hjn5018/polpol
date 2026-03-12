import { NavLink, useLocation } from 'react-router-dom';
import { Library, UserCircle, LayoutDashboard, Settings, Briefcase, Home, Users, ShoppingBag, MessageSquare } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export default function Sidebar() {
  const location = useLocation();
  const { language, isSidebarCollapsed } = useUIStore();

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
    <aside className={`${isSidebarCollapsed ? 'w-0' : 'w-64'} bg-[var(--sidebar-bg)] flex flex-col h-full shrink-0 hidden md:flex transition-all duration-300 ease-in-out relative overflow-hidden z-30`}>

      {/* Navigation */}
      <nav className={`flex-1 ${isSidebarCollapsed ? 'px-2' : 'px-4'} py-6 space-y-2`}>
        {!isMyPage ? (
          mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-[var(--card-inner-bg)] text-[var(--sidebar-text-active)] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1 before:bg-[var(--accent-primary)] before:rounded-r-md'
                      : 'text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-active)] hover:bg-[var(--card-inner-bg)]'
                  }`
                }
                title={isSidebarCollapsed ? item.name : ''}
              >
                <Icon size={20} className="stroke-[1.5]" />
                {!isSidebarCollapsed && <span className="font-medium text-sm truncate">{item.name}</span>}
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
                    `flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-[var(--card-inner-bg)] text-[var(--accent-primary)] relative'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-inner-bg)]'
                    }`
                  }
                  title={isSidebarCollapsed ? item.name : ''}
                >
                  <Icon size={20} className="stroke-[1.5]" />
                  {!isSidebarCollapsed && <span className="font-medium text-sm truncate">{item.name}</span>}
                </NavLink>
              );
            })}
          </div>
        )}
      </nav>
    </aside>
  );
}

