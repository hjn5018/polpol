import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ChevronDown, Bell } from 'lucide-react';

export default function TopHeader() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/dashboard');
  };

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-[#1f2028] bg-[#13141a]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="flex-1"></div>
      
      <div className="flex items-center gap-6">
        <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full border-2 border-[#13141a]"></span>
        </button>

        <div className="h-8 w-px bg-[#1f2028]"></div>

        <button 
          onClick={handleProfileClick}
          className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-[#1f2028] transition-all group"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">
              {user?.name || 'User'}
            </p>
            <p className="text-[10px] text-cyan-500 font-medium uppercase tracking-wider">
              Student
            </p>
          </div>
          
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-0.5 shadow-lg group-hover:shadow-cyan-500/20 transition-all">
            <div className="w-full h-full bg-[#1c1d24] rounded-full flex items-center justify-center overflow-hidden">
              <span className="text-sm font-bold text-white">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
          
          <ChevronDown size={14} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
        </button>
      </div>
    </header>
  );
}
