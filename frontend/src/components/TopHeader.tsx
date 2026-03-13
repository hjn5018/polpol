import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../store/uiStore';
import { Bell, Moon, Sun, Globe, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';



export default function TopHeader() {
  const { isDarkMode, toggleDarkMode, isSidebarCollapsed, toggleSidebar } = useUIStore();
  const navigate = useNavigate();
  
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
              placeholder="검색어를 입력하세요"
              className="w-full h-10 bg-[var(--bg-subtle)] border border-[var(--card-border)] rounded-full pl-12 pr-4 text-sm text-[var(--text-primary)] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:bg-[var(--card-bg)] transition-all font-medium"
            />
          </div>
        </div>
        
        {/* Right Side: Quick Actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-[var(--header-text)] opacity-70 hover:opacity-100 transition-opacity">
            <Bell size={18} />
          </button>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-[var(--header-text)] opacity-70 hover:opacity-100 transition-opacity"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            onClick={() => navigate('/login')}
            className="ml-2 px-4 py-1.5 text-sm font-bold text-[var(--header-text)] hover:text-cyan-400 transition-colors"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
