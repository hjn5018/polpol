
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, Briefcase } from 'lucide-react';

export default function Sidebar() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Recruitment', path: '/recruitment', icon: Briefcase },
  ];

  return (
    <aside className="w-64 bg-[#0F1015] border-r border-[#1f2028] flex flex-col min-h-screen shrink-0 hidden md:flex">
      {/* Logo */}
      <div className="h-20 flex items-center px-8 border-b border-[#1f2028]">
        <span className="text-2xl font-bold tracking-wider text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
          POLPOL
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-[#1a1c23] text-cyan-400 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1 before:bg-cyan-400 before:rounded-r-md'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#15161d]'
                }`
              }
            >
              <Icon size={20} className="stroke-[1.5]" />
              <span className="font-medium text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#1f2028]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-red-400 hover:bg-[#15161d] transition-colors"
        >
          <LogOut size={20} className="stroke-[1.5]" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
