import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import JobApplicationsPage from './pages/JobApplicationsPage';
import { useAuthStore } from './store/authStore';

import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import axios from 'axios';
import { useEffect } from 'react';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, setUser, user } = useAuthStore();
  
  useEffect(() => {
    if (isAuthenticated && !user) {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:8080/api/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user info', error);
        }
      };
      fetchUser();
    }
  }, [isAuthenticated, user, setUser]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  return (
    <div className="min-h-screen bg-[#13141a] text-gray-200 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full p-4 sm:p-8 lg:p-10 hide-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/recruitment" element={<ProtectedRoute><JobApplicationsPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
