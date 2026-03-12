import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Briefcase, Award, Github, ExternalLink, Clock } from 'lucide-react';
import axios from 'axios';
import { useUIStore } from '../store/uiStore';

// Interfaces
interface Resume {
  id: number;
  title: string;
  about: string;
  skills: string;
  career: string;
  isDefault: boolean;
  updatedAt: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  createdAt: string;
}

interface JobApplication {
  id: number;
  companyName: string;
  position: string;
  status: string;
  appliedAt: string;
}

// Local Components
const SectionCard = ({ title, icon, children, action, className = "" }: any) => (
  <section className={`bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl overflow-hidden flex flex-col ${className}`}>
    <div className="px-6 py-4 flex justify-between items-center bg-gradient-to-r from-[var(--bg-subtle)] to-transparent">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[var(--button-bg)] rounded-xl border border-[var(--button-border)] shadow-sm">
          {icon}
        </div>
        <h3 className="text-sm font-bold text-[var(--text-primary)] tracking-wide uppercase">{title}</h3>
      </div>
      {action && <div>{action}</div>}
    </div>
    <div className="p-6 flex-1">
      {children}
    </div>
  </section>
);



const statusColors: Record<string, string> = {
  HIRED: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  OFFERED: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  INTERVIEWING: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  REJECTED: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  APPLIED: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

export default function DashboardPage() {
  const { language } = useUIStore();
  const navigate = useNavigate();

  const translations = {
    en: {
      title: "Dashboard",
      subtitle: "Showcase your professional journey and achievements.",
      newResume: "New Resume",
      jobTracking: "Job Application Tracking",
      resumes: "Resumes",
      projects: "Projects",
      skills: "Skills",
      workExperience: "Work Experience",
      viewAll: "View all applications",
      noApps: "No applications tracked",
      noResumes: "Connect your first resume",
      noProjects: "Showcase your portfolio masterpieces",
      noSkills: "No skills added",
      noCareer: "Describe your professional journey",
      companyPosition: "Company & Position",
      status: "Status",
      appliedAt: "Applied At",
      updated: "Updated",
      default: "Default",
      edit: "Edit",
      setDefault: "Set Default",
      deleteProject: "Delete this project?",
      deleteResume: "Delete this resume? All associated projects will be affected.",
      setResumeFirst: "Please set a default resume first.",
      code: "Code",
      preview: "Preview",
      statusLabels: {
        HIRED: 'Hired',
        OFFERED: 'Offered',
        INTERVIEWING: 'Interviewing',
        REJECTED: 'Rejected',
        APPLIED: 'Applied',
      }
    },
    ko: {
      title: "대시보드",
      subtitle: "당신의 전문적인 여정과 업적을 보여주세요.",
      newResume: "새 이력서",
      jobTracking: "구직 지원 현황",
      resumes: "이력서",
      projects: "프로젝트",
      skills: "기술 스택",
      workExperience: "경력 사항",
      viewAll: "모든 지원 현황 보기",
      noApps: "지원 내역이 없습니다",
      noResumes: "첫 번째 이력서를 작성해보세요",
      noProjects: "당신의 멋진 프로젝트를 뽐내보세요",
      noSkills: "등록된 기술이 없습니다",
      noCareer: "당신의 전문적인 경력을 설명해주세요",
      companyPosition: "기업 및 직무",
      status: "상태",
      appliedAt: "지원일",
      updated: "수정일",
      default: "기본",
      edit: "수정",
      setDefault: "기본으로 설정",
      deleteProject: "이 프로젝트를 삭제하시겠습니까?",
      deleteResume: "이 이력서를 삭제하시겠습니까? 관련 프로젝트에 영향을 줄 수 있습니다.",
      setResumeFirst: "먼저 기본 이력서를 설정해주세요.",
      code: "코드",
      preview: "미리보기",
      statusLabels: {
        HIRED: '채용됨',
        OFFERED: '합격통보',
        INTERVIEWING: '면접진행중',
        REJECTED: '불합격',
        APPLIED: '지원완료',
      }
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;
  const [resume, setResume] = useState<Resume | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);



  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [defaultResumeRes, allResumesRes, projectsRes, appsRes] = await Promise.all([
        axios.get('http://localhost:8080/api/resumes/me/default', { headers }).catch(() => ({ data: null })),
        axios.get('http://localhost:8080/api/resumes/me', { headers }),
        axios.get('http://localhost:8080/api/projects/me', { headers }),
        axios.get('http://localhost:8080/api/job-applications', { headers }).catch(() => ({ data: [] }))
      ]);

      setResume(defaultResumeRes.data);
      setResumes(allResumesRes.data);
      setProjects(projectsRes.data);
      setApplications(appsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  const skillList = resume?.skills ? resume.skills.split(',').map(s => s.trim()).filter(s => s !== '') : [];

  return (
    <div className="max-w-[1400px] mx-auto animate-fade-in relative z-10 pb-10 px-4">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">
            {t.title}
          </h1>
          <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            {t.subtitle}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/portfolio')}
            className="group flex items-center gap-2 px-6 py-3 bg-[#0047AB] text-white text-sm font-black rounded-2xl transition-all hover:bg-blue-600 active:scale-95 shadow-xl shadow-blue-900/40"
          >
            <FileText size={18} /> {language === 'en' ? 'Manage Portfolio' : '포트폴리오 관리'}
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. Job Application Tracking */}
          <SectionCard 
            title={t.jobTracking} 
            icon={<Briefcase size={16} className="text-blue-400" />}
          >
            <div className="bg-[var(--card-inner-bg)] rounded-2xl p-6 border border-[var(--card-border)] min-h-[140px] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-transparent opacity-50" />
              <div className="relative z-10">
                {applications.length > 0 ? (
                  <div className="overflow-hidden">
                    <table className="w-full text-left border-separate border-spacing-y-3">
                      <thead>
                        <tr className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                          <th className="font-black pb-1 pl-4">{t.companyPosition}</th>
                          <th className="font-black pb-1">{t.status}</th>
                          <th className="font-black pb-1 text-right pr-4">{t.appliedAt}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.slice(0, 5).map(app => (
                          <tr key={app.id} className="group/tr transition-all">
                            <td className="py-4 pl-4 bg-[var(--card-inner-bg)] rounded-l-2xl border-y border-l border-[var(--card-border)] group-hover/tr:border-cyan-500/30 transition-all">
                              <div>
                                <div className="text-sm font-bold text-[var(--text-primary)]">{app.companyName}</div>
                                <div className="text-[11px] text-gray-500 mt-0.5">{app.position}</div>
                              </div>
                            </td>
                            <td className="py-4 bg-[var(--card-inner-bg)] border-y border-[var(--card-border)] group-hover/tr:border-cyan-500/30 transition-all">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-wider ${statusColors[app.status] || 'text-gray-400 bg-gray-400/10 border-gray-400/20'}`}>
                                {t.statusLabels[app.status as keyof typeof t.statusLabels] || app.status}
                              </span>
                            </td>
                            <td className="py-4 pr-4 text-right bg-[var(--card-inner-bg)] rounded-r-2xl border-y border-r border-[var(--card-border)] group-hover/tr:border-cyan-500/30 transition-all">
                              <div className="text-[11px] text-gray-500 font-medium">
                                {new Date(app.appliedAt).toLocaleDateString()}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {applications.length > 5 && (
                      <button 
                        onClick={() => navigate('/applications')}
                        className="w-full mt-4 py-3 bg-[var(--button-bg)] hover:bg-[var(--bg-subtle)] border border-[var(--button-border)] text-[10px] text-gray-400 hover:text-cyan-400 transition-all rounded-xl font-black uppercase tracking-widest"
                      >
                        {t.viewAll}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-[var(--card-inner-bg)] border-2 border-dashed border-[var(--card-border)] rounded-2xl py-12 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Briefcase size={32} className="text-gray-500 mb-3 group-hover:text-cyan-500/40 transition-colors" />
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{t.noApps}</p>
                  </div>
                )}
              </div>
            </div>
          </SectionCard>

          {/* 2. Resumes */}
          <SectionCard 
            title={t.resumes} 
            icon={<FileText size={16} className="text-cyan-400" />}
          >
            <div className="bg-[var(--card-inner-bg)] rounded-2xl p-6 border border-[var(--card-border)] min-h-[140px] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-transparent opacity-50" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {resumes.map(r => (
                  <div key={r.id} className={`group/r p-5 rounded-2xl border transition-all ${r.isDefault ? 'bg-cyan-500/5 border-cyan-500/30' : 'bg-[var(--card-inner-bg)] border-[var(--card-border)] hover:border-cyan-500/30'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[15px] font-bold text-[var(--text-primary)] truncate transition-colors">{r.title}</h4>
                        <div className="flex items-center gap-2 mt-1.5 opacity-60">
                          <Clock size={12} className="text-gray-400" />
                          <p className="text-[10px] text-gray-400 font-medium">{t.updated} {new Date(r.updatedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {r.isDefault && (
                        <div className="px-2 py-1 rounded bg-cyan-400 text-black text-[9px] font-black tracking-widest uppercase">{t.default}</div>
                      )}
                    </div>
                  </div>
                ))}
                {resumes.length === 0 && (
                  <div className="col-span-full py-12 text-center border-2 border-dashed border-[var(--card-border)] rounded-2xl">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{t.noResumes}</p>
                  </div>
                )}
              </div>
            </div>
          </SectionCard>

          {/* 3. Projects */}
          <SectionCard 
            title={t.projects} 
            icon={<Github size={16} className="text-indigo-400" />}
            action={
              <button 
                onClick={() => navigate('/projects')}
                className="text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {t.edit}
              </button>
            }
          >
            <div className="bg-[var(--card-inner-bg)] rounded-2xl p-6 border border-[var(--card-border)] min-h-[140px] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-transparent opacity-50" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {projects.length > 0 ? projects.map(project => (
                  <div key={project.id} className="bg-[var(--card-inner-bg)] border border-[var(--card-border)] rounded-2xl overflow-hidden group/p flex flex-col hover:border-cyan-500/30 transition-all h-full">
                    <div className="h-40 bg-[var(--bg-subtle)] relative overflow-hidden group/img">
                      <img src={project.imageUrl} className="w-full h-full object-cover opacity-50 group-hover/p:scale-105 group-hover/p:opacity-80 transition-all duration-700" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-inner-bg)] to-transparent opacity-60"></div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h5 className="text-base font-bold text-[var(--text-primary)] mb-2 group-hover/p:text-cyan-400 transition-colors">{project.title}</h5>
                      <p className="text-[11px] text-gray-500 line-clamp-2 mb-6 leading-relaxed font-medium">{project.description}</p>
                      <div className="flex gap-4 mt-auto">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group/btn flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-[var(--text-primary)] transition-all">
                          <div className="p-1.5 bg-[var(--button-bg)] rounded-lg group-hover/btn:bg-white group-hover/btn:text-black transition-colors">
                            <Github size={14} />
                          </div>
                          {t.code}
                        </a>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="group/btn flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-cyan-400 transition-all">
                          <div className="p-1.5 bg-[var(--button-bg)] rounded-lg group-hover/btn:bg-cyan-400 group-hover/btn:text-black transition-colors" >
                            <ExternalLink size={14} />
                          </div>
                          {t.preview}
                        </a>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-16 text-center border-2 border-dashed border-[var(--card-border)] rounded-2xl bg-[var(--card-inner-bg)]/10">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest italic">{t.noProjects}</p>
                  </div>
                )}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right Column - Skills & Experience */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* 4. Skills */}
          <SectionCard 
            title={t.skills} 
            icon={<Award size={16} className="text-amber-400" />}
          >
            <div className="bg-[var(--card-inner-bg)] rounded-2xl p-6 border border-[var(--card-border)] min-h-[140px] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent opacity-50" />
              {skillList.length > 0 ? (
                <div className="flex flex-wrap gap-2.5 relative z-10">
                  {skillList.map((skill, idx) => (
                    <span key={idx} className="px-3.5 py-1.5 bg-[var(--card-inner-bg)] border border-[var(--card-border)] text-[var(--text-primary)] text-[11px] font-bold rounded-xl shadow-sm cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center relative z-10">
                  <Award size={24} className="text-gray-700 mx-auto mb-2 opacity-50" />
                  <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">{t.noSkills}</p>
                </div>
              )}
            </div>
          </SectionCard>

          {/* 5. Work Experience */}
          <SectionCard 
            title={t.workExperience} 
            icon={<Briefcase size={16} className="text-emerald-400" />}
          >
            <div className="bg-[var(--card-inner-bg)] rounded-2xl p-6 border border-[var(--card-border)] min-h-[160px] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-transparent opacity-50" />
              {resume?.career ? (
                <div className="text-[var(--text-primary)] text-[13px] font-medium leading-[1.8] whitespace-pre-wrap pl-2 relative z-10">
                  {resume.career}
                </div>
              ) : (
                <div className="py-6 text-center pl-2 relative z-10">
                  <p className="text-gray-600 text-[11px] font-bold uppercase tracking-widest italic leading-relaxed">{t.noCareer}</p>
                </div>
              )}
            </div>
          </SectionCard>
        </div>
      </div>


    </div>
  );
}

