import { useState, useEffect } from 'react';
import { Plus, Edit2, FileText, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import ResumeModal from '../components/ResumeModal';
import { useUIStore } from '../store/uiStore';

interface Resume {
  id: number;
  title: string;
  about: string;
  skills: string;
  career: string;
  isDefault: boolean;
  updatedAt: string;
}

const translations = {
  en: {
    title: "Portfolio Management",
    subtitle: "Manage your resumes and professional documents.",
    newResume: "New Resume",
    updated: "Updated",
    default: "Default",
    setDefault: "Set Default",
    deleteConfirm: "Delete this resume? All associated projects will be affected.",
    skillsHighlights: "Skills Highlights",
    careerSummary: "Career Summary",
    noCareer: "No career details added yet.",
    noResumes: "No Resumes Found",
    noResumesDesc: "Create your first professional resume to start applying for jobs.",
    getStarted: "Get Started",
  },
  ko: {
    title: "포트폴리오 관리",
    subtitle: "이력서 및 전문 문서를 관리하세요.",
    newResume: "새 이력서",
    updated: "수정일",
    default: "기본값",
    setDefault: "기본 설정",
    deleteConfirm: "이 이력서를 삭제하시겠습니까? 관련 프로젝트에 영향을 줄 수 있습니다.",
    skillsHighlights: "주요 기술",
    careerSummary: "경력 요약",
    noCareer: "아직 등록된 경력 사항이 없습니다.",
    noResumes: "이력서를 찾을 수 없습니다",
    noResumesDesc: "첫 번째 전문 이력서를 작성하고 채용 지원을 시작해 보세요.",
    getStarted: "시작하기",
  }
};

export default function PortfolioPage() {
  const { language } = useUIStore();
  const t = translations[language as keyof typeof translations] || translations.en;
  
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [editingResume, setEditingResume] = useState<Resume | null>(null);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/resumes/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResumes(res.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleSaveResume = async (data: any) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const formattedSkills = data.skills.join(', ');
      const formattedCareer = Array.isArray(data.career) ? data.career.join('\n') : data.career;

      if (editingResume) {
        await axios.put(`http://localhost:8080/api/resumes/${editingResume.id}`, {
          ...editingResume,
          ...data,
          skills: formattedSkills,
          career: formattedCareer
        }, { headers });
      } else {
        await axios.post('http://localhost:8080/api/resumes', {
          ...data,
          skills: formattedSkills,
          career: formattedCareer,
          isDefault: resumes.length === 0
        }, { headers });
      }
      
      setIsResumeModalOpen(false);
      setEditingResume(null);
      fetchResumes();
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  const handleSetDefault = async (resumeId: number) => {
    const target = resumes.find(r => r.id === resumeId);
    if (!target) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/resumes/${resumeId}`, {
        ...target,
        isDefault: true
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchResumes();
    } catch (error) {
      console.error('Error setting default resume:', error);
    }
  };

  const handleDeleteResume = async (resumeId: number) => {
    if (!window.confirm(t.deleteConfirm)) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/resumes/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchResumes();
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 animate-fade-in relative z-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">
            {t.title}
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            {t.subtitle}
          </p>
        </div>
        <button 
          onClick={() => { setEditingResume(null); setIsResumeModalOpen(true); }}
          className="group flex items-center gap-2 px-6 py-3 bg-[var(--text-primary)] text-[var(--background)] text-sm font-black rounded-2xl transition-all hover:bg-cyan-400 active:scale-95 shadow-xl"
        >
          <Plus size={18} /> {t.newResume}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {resumes.map(r => (
          <div key={r.id} className={`p-6 rounded-3xl border transition-all ${r.isDefault ? 'bg-cyan-500/5 border-cyan-500/30' : 'bg-[var(--card-inner-bg)] border-[var(--card-border)]'}`}>
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className={`p-4 rounded-2xl ${r.isDefault ? 'bg-cyan-500/20 text-cyan-400' : 'bg-[var(--button-bg)] text-gray-400'} border border-[var(--card-border)]`}>
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{r.title}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock size={12} />
                      {t.updated} {new Date(r.updatedAt).toLocaleDateString()}
                    </div>
                    {r.isDefault && (
                      <span className="flex items-center gap-1 text-[10px] font-black text-cyan-400 uppercase tracking-widest px-2 py-0.5 rounded-md bg-cyan-400/10 border border-cyan-400/20">
                        <CheckCircle2 size={10} /> {t.default}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {!r.isDefault && (
                  <button 
                    onClick={() => handleSetDefault(r.id)}
                    className="px-4 py-2 text-xs font-bold text-cyan-400 border border-cyan-400/20 rounded-xl hover:bg-cyan-400/10 transition-all"
                  >
                    {t.setDefault}
                  </button>
                )}
                <button 
                  onClick={() => { setEditingResume(r); setIsResumeModalOpen(true); }}
                  className="p-2 text-gray-400 hover:text-white bg-[var(--button-bg)] border border-[var(--button-border)] rounded-xl transition-all"
                >
                  <Edit2 size={18} />
                </button>
                {!r.isDefault && (
                  <button 
                    onClick={() => handleDeleteResume(r.id)}
                    className="p-2 text-gray-500 hover:text-rose-500 bg-[var(--button-bg)] border border-[var(--button-border)] rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[var(--card-border)]">
              <div>
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">{t.skillsHighlights}</h4>
                <div className="flex flex-wrap gap-2">
                  {r.skills.split(',').map((s, i) => s.trim() && (
                    <span key={i} className="px-3 py-1 bg-[var(--button-bg)] border border-[var(--button-border)] text-[var(--text-primary)] text-[10px] font-bold rounded-lg capitalize">
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">{t.careerSummary}</h4>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                  {r.career || t.noCareer}
                </p>
              </div>
            </div>
          </div>
        ))}

        {resumes.length === 0 && (
          <div className="py-20 text-center bg-[var(--card-inner-bg)] border-2 border-dashed border-[var(--card-border)] rounded-3xl">
            <div className="w-16 h-16 bg-[var(--button-bg)] rounded-3xl flex items-center justify-center mx-auto mb-4 border border-[var(--card-border)]">
              <FileText size={32} className="text-gray-600" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{t.noResumes}</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">{t.noResumesDesc}</p>
            <button 
              onClick={() => setIsResumeModalOpen(true)}
              className="mt-6 px-6 py-2 bg-cyan-500 text-black text-xs font-black rounded-xl hover:bg-cyan-400 transition-all font-bold"
            >
              {t.getStarted}
            </button>
          </div>
        )}
      </div>

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onSave={handleSaveResume}
        initialData={editingResume ? {
          title: editingResume.title,
          about: editingResume.about,
          skills: editingResume.skills.split(',').map(s => s.trim()).filter(s => s),
          career: editingResume.career
        } : undefined}
      />
    </div>
  );
}

