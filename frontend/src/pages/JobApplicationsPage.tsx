import { useState, useEffect } from 'react';
import { Briefcase, Clock, ExternalLink, Calendar, Search, Filter } from 'lucide-react';
import axios from 'axios';
import { useUIStore } from '../store/uiStore';

interface JobApplication {
  id: number;
  companyName: string;
  position: string;
  status: string;
  appliedAt: string;
}

const statusColors: Record<string, string> = {
  HIRED: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  OFFERED: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  INTERVIEWING: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  REJECTED: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  APPLIED: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

const translations = {
  en: {
    title: "Job Applications",
    subtitle: "Track and manage your recruitment progress across companies.",
    searchPlaceholder: "Search companies...",
    appliedOn: "Applied on",
    details: "Details",
    noApplications: "No Applications",
    noResults: "No results match your search.",
    noAppsYet: "You haven't applied to any positions yet.",
    statusLabels: {
      HIRED: 'Hired',
      OFFERED: 'Offered',
      INTERVIEWING: 'Interviewing',
      REJECTED: 'Rejected',
      APPLIED: 'Applied',
    }
  },
  ko: {
    title: "지원 현황",
    subtitle: "여러 기업의 채용 진행 상황을 추적하고 관리하세요.",
    searchPlaceholder: "기업 검색...",
    appliedOn: "지원일:",
    details: "상세 보기",
    noApplications: "지원 내역이 없습니다",
    noResults: "검색 결과가 없습니다.",
    noAppsYet: "아직 지원한 포지션이 없습니다.",
    statusLabels: {
      HIRED: '채용됨',
      OFFERED: '합격통보',
      INTERVIEWING: '면접진행중',
      REJECTED: '불합격',
      APPLIED: '지원완료',
    }
  },
};

export default function JobApplicationsPage() {
  const { language } = useUIStore();
  const t = translations[language as keyof typeof translations] || translations.en;
  
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/job-applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(app => 
    app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto py-10 px-4 animate-fade-in relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">
            {t.title}
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            {t.subtitle}
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[var(--card-inner-bg)] border border-[var(--card-border)] rounded-2xl text-sm text-[var(--text-primary)] focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
          <button className="p-3 bg-[var(--card-inner-bg)] border border-[var(--card-border)] rounded-2xl text-gray-400 hover:text-[var(--text-primary)] transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredApplications.map(app => (
          <div key={app.id} className="group bg-[var(--card-inner-bg)] border border-[var(--card-border)] rounded-2xl p-5 hover:border-blue-500/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Briefcase size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{app.companyName}</h3>
                <p className="text-sm text-gray-500 font-medium">{app.position}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">
              <div className="flex flex-col md:items-end">
                <span className={`px-4 py-1 rounded-full text-[11px] font-black border uppercase tracking-widest ${statusColors[app.status] || 'text-gray-400 bg-gray-400/10 border-gray-400/20'}`}>
                  {t.statusLabels[app.status as keyof typeof t.statusLabels] || app.status}
                </span>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-gray-500">
                  <Calendar size={12} />
                  {t.appliedOn} {new Date(app.appliedAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="h-10 w-px bg-[var(--card-border)] hidden md:block"></div>
              
              <button className="flex items-center gap-2 px-6 py-2 bg-[var(--button-bg)] border border-[var(--button-border)] text-xs font-bold text-[var(--text-primary)] rounded-xl hover:bg-blue-500 hover:text-white transition-all w-full md:w-auto justify-center group/btn">
                {t.details} <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}

        {filteredApplications.length === 0 && (
          <div className="py-20 text-center bg-[var(--card-inner-bg)] border-2 border-dashed border-[var(--card-border)] rounded-3xl">
            <div className="w-16 h-16 bg-[var(--button-bg)] rounded-3xl flex items-center justify-center mx-auto mb-4 border border-[var(--card-border)]">
              <Clock size={32} className="text-gray-600" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{t.noApplications}</h3>
            <p className="text-gray-500 text-sm mt-1">
              {searchTerm ? t.noResults : t.noAppsYet}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

