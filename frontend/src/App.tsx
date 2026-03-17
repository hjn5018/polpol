import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AccountPage from './pages/AccountPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import FAQPage from './pages/FAQPage';
import JobApplicationsPage from './pages/JobApplicationsPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectsPage from './pages/ProjectsPage';
import MainPage from './pages/MainPage';
import CommunityPage from './pages/CommunityPage';
import { TradePage, CouncilPage, JobPostsPage, ProjectRecruitmentPage } from './pages/PlaceholderPages';
import { useAuthStore } from './store/authStore';

import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';
import axios from 'axios';
import { useEffect } from 'react';

// Initialize theme
const theme = localStorage.getItem('theme');
if (theme === 'dark') {
  document.documentElement.classList.remove('light-theme');
} else {
  document.documentElement.classList.add('light-theme');
}

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
    <div className="h-screen text-[var(--text-primary)] flex overflow-hidden relative">
      <div className="relative z-10 flex w-full h-full overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TopHeader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto w-full hide-scrollbar scroll-smooth">
            <div className="max-w-7xl mx-auto w-full p-4 sm:p-8 lg:p-10 relative">
              {children}
              <Footer />
            </div>
            <ScrollToTop />
            <Chatbot />
          </main>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      {/* Global Background glowing effects */}
      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-[var(--primary-glow)] rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/main" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
          <Route path="/trade" element={<ProtectedRoute><TradePage /></ProtectedRoute>} />
          <Route path="/council" element={<ProtectedRoute><CouncilPage /></ProtectedRoute>} />
          <Route path="/recruitment" element={<ProtectedRoute><JobApplicationsPage /></ProtectedRoute>} />
          <Route path="/job-posts" element={<ProtectedRoute><JobPostsPage /></ProtectedRoute>} />
          <Route path="/project-recruitment" element={<ProtectedRoute><ProjectRecruitmentPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/portfolio" element={<ProtectedRoute><PortfolioPage /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute><JobApplicationsPage /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><HelpPage /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><HelpPage /></ProtectedRoute>} />
          <Route path="/faq" element={<ProtectedRoute><FAQPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/main" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
