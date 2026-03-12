import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';

export default function LoginPage() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        studentId,
        password
      });
      setToken(response.data.accessToken);
      console.log('Login successful');
      navigate('/recruitment');
    } catch (err: any) {
      setError(err.response?.data || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1015] p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="bg-[#1c1d24] p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-[#2a2b36] z-10 relative">
        <div className="text-center mb-10">
          <Link to="/" className="flex justify-center items-center gap-2 mb-4">
             <div className="w-8 h-8 rounded-md bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
             <span className="text-2xl font-bold tracking-wider text-white">POL.GG</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-200">Welcome Back</h2>
        </div>
        
        {error && (
          <div className="mb-6 text-[#ef4444] text-sm text-center bg-[#ef4444]/10 py-3 px-4 rounded-xl border border-[#ef4444]/20 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">Student ID (학번)</label>
            <input 
              type="text" 
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-[#2a2b36] focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition outline-none bg-[#13141a] text-gray-200 placeholder-gray-600 shadow-inner"
              placeholder="e.g. 20240001"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-[#2a2b36] focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition outline-none bg-[#13141a] text-gray-200 placeholder-gray-600 shadow-inner"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? '로그인 중...' : 'LOG IN'}
          </button>
        </form>
        <div className="mt-8 text-center text-sm text-gray-500">
          계정이 없으신가요? 
          <Link to="/signup" className="ml-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
