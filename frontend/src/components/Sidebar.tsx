import { NavLink, useLocation } from 'react-router-dom';
import { Library, UserCircle, LayoutDashboard, Settings, Briefcase, Home, Users, ShoppingBag, MessageSquare, Menu, HelpCircle, Megaphone, Code } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export default function Sidebar() {
  const location = useLocation();
  const { language, isSidebarCollapsed, toggleSidebar } = useUIStore();

  const translations = {
    en: {
      mainPage: 'Main Page',
      recruitment: 'Job Applications',
      community: 'Community',
      trade: 'Flea Market',
      jobPosts: 'Corporate Recruitment',
      projectRecruitment: 'Project Recruitment',
      studentCouncil: 'Council',
      dashboard: 'Dashboard',
      portfolio: 'Portfolio',
      jobApplications: 'Job Applications',
      projects: 'Projects',
      account: 'Account',
      settings: 'Settings',
      help: 'Help',
      faq: 'FAQ',
      helpCenter: 'Help Center',
    },
    ko: {
      mainPage: '메인 페이지',
      recruitment: '지원 현황',
      community: '커뮤니티',
      trade: '중고거래',
      jobPosts: '기업 구인',
      projectRecruitment: '프로젝트 구인',
      studentCouncil: '학생회 창구',
      dashboard: '대시보드',
      portfolio: '포트폴리오',
      jobApplications: '지원 현황',
      projects: '프로젝트',
      account: '계정 설정',
      settings: '환경 설정',
      help: '도움말',
      faq: '자주 묻는 질문',
      helpCenter: '도움말 센터',
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const isMyPage = location.pathname.startsWith('/dashboard') ||
                   location.pathname.startsWith('/portfolio') ||
                   location.pathname.startsWith('/projects') ||
                   location.pathname.startsWith('/applications') ||
                   location.pathname.startsWith('/account') ||
                   location.pathname.startsWith('/settings') ||
                   location.pathname.startsWith('/help') ||
                   location.pathname.startsWith('/faq');

  const mainNavItems = [
    { name: t.mainPage, path: '/main', icon: Home, color: 'text-gray-400', bg: 'bg-gray-500/10' },
    { name: t.recruitment, path: '/recruitment', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: t.trade, path: '/trade', icon: ShoppingBag, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { name: t.community, path: '/community', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { name: t.studentCouncil, path: '/council', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-500/10' },
    { name: t.jobPosts, path: '/job-posts', icon: Megaphone, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { name: t.projectRecruitment, path: '/project-recruitment', icon: Code, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  const myPageItems = [
    { name: t.dashboard, path: '/dashboard', icon: LayoutDashboard, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { name: t.portfolio, path: '/portfolio', icon: Library, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { name: t.projects, path: '/projects', icon: LayoutDashboard, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { name: t.account, path: '/account', icon: UserCircle, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { name: t.settings, path: '/settings', icon: Settings, color: 'text-gray-400', bg: 'bg-gray-500/10' },
  ];

  return (
    <aside className={`${isSidebarCollapsed ? 'w-0' : 'w-64'} bg-[var(--sidebar-bg)] flex flex-col h-full shrink-0 hidden md:flex transition-all duration-300 ease-in-out relative overflow-hidden z-30`}>
      
      {/* Branding inside Sidebar - Matches TopHeader Height & Color */}
      <div className="h-16 flex items-center px-4 border-b border-[var(--card-border)] shrink-0 bg-[var(--header-bg)] relative">
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
      <nav className="flex-1 px-4 py-6 space-y-1 border-r border-[var(--card-border)] overflow-y-auto">
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
                <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={18} className={`stroke-[1.5] ${item.color} opacity-100 transition-opacity`} />
                </div>
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
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-[var(--bg-subtle)] text-[var(--sidebar-text-active)] shadow-sm'
                        : 'text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-active)] hover:bg-[var(--bg-subtle)]'
                    }`
                  }
                >
                  <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={`stroke-[1.5] ${item.color} opacity-100 transition-opacity`} />
                  </div>
                  <span className="font-bold text-[13px] tracking-tight truncate">{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        )}
      </nav>

      {/* FAQ & Help Section at Bottom */}
      <div className="px-4 pb-6 space-y-1 border-r border-[var(--card-border)]">
        <NavLink
          to="/faq"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
              isActive
                ? 'bg-[var(--bg-subtle)] text-[var(--sidebar-text-active)] shadow-sm'
                : 'text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-active)] hover:bg-[var(--bg-subtle)]'
            }`
          }
        >
          <div className="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center shrink-0">
            <HelpCircle size={18} className="stroke-[1.5] text-gray-400 opacity-100 transition-opacity" />
          </div>
          <span className="font-bold text-[13px] tracking-tight truncate">{t.faq}</span>
        </NavLink>

        <NavLink
          to="/help"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
              isActive
                ? 'bg-[var(--bg-subtle)] text-[var(--sidebar-text-active)] shadow-sm'
                : 'text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-active)] hover:bg-[var(--bg-subtle)]'
            }`
          }
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
            <MessageSquare size={18} className="stroke-[1.5] text-indigo-500 opacity-100 transition-opacity" />
          </div>
          <span className="font-bold text-[13px] tracking-tight truncate">{t.helpCenter}</span>
        </NavLink>
      </div>
    </aside>
  );
}
