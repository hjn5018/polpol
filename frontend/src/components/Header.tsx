
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, User } from 'lucide-react';

export default function Header() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
                polpol.
              </span>
            </Link>
          </div>

          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 rounded-md transition">
                  홈
                </Link>
                <div className="h-4 w-px bg-gray-200"></div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-red-600 font-medium px-3 py-2 rounded-md transition"
                >
                  <LogOut size={18} />
                  <span>로그아웃</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-1.5 text-indigo-600 font-bold hover:bg-indigo-50 px-4 py-2 rounded-full transition">
                <User size={18} />
                <span>로그인</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
