import { useState, useEffect } from 'react';
import { Plus, Edit2, Github, ExternalLink, Trash2, FolderOpen } from 'lucide-react';
import axios from 'axios';
import ProjectModal from '../components/ProjectModal';
import { useUIStore } from '../store/uiStore';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  createdAt: string;
}

interface Resume {
  id: number;
  title: string;
}

const translations = {
  en: {
    title: "My Projects",
    subtitle: "Showcase your best work and technical achievements.",
    addProject: "Add Project",
    needResume: "You need a Default Resume to add new projects. Please set one in the Portfolio page.",
    portfolio: "Portfolio",
    deleteConfirm: "Delete this project?",
    code: "Code",
    preview: "Preview",
    noProjects: "No Projects Yet",
    noProjectsDesc: "Start building your portfolio by adding your impressive projects.",
    addFirstProject: "Add Your First Project",
    alertSetResume: "Please set a default resume first in the Portfolio page.",
  },
  ko: {
    title: "내 프로젝트",
    subtitle: "당신의 최고의 작업물과 기술적 성과를 보여주세요.",
    addProject: "프로젝트 추가",
    needResume: "새 프로젝트를 추가하려면 기본 이력서가 필요합니다. 포트폴리오 페이지에서 설정해 주세요.",
    portfolio: "포트폴리오",
    deleteConfirm: "이 프로젝트를 삭제하시겠습니까?",
    code: "코드",
    preview: "미리보기",
    noProjects: "아직 프로젝트가 없습니다",
    noProjectsDesc: "멋진 프로젝트를 추가하여 포트폴리오를 만들기 시작해 보세요.",
    addFirstProject: "첫 번째 프로젝트 추가하기",
    alertSetResume: "먼저 포트폴리오 페이지에서 기본 이력서를 설정해 주세요.",
  }
};

export default function ProjectsPage() {
  const { language } = useUIStore();
  const t = translations[language as keyof typeof translations] || translations.en;
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [defaultResumeRes, projectsRes] = await Promise.all([
        axios.get('http://localhost:8080/api/resumes/me/default', { headers }).catch(() => ({ data: null })),
        axios.get('http://localhost:8080/api/projects/me', { headers })
      ]);

      setResume(defaultResumeRes.data);
      setProjects(projectsRes.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveProject = async (projectData: any) => {
    if (!resume) {
      alert(t.alertSetResume);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      if (editingProject) {
        await axios.put(`http://localhost:8080/api/projects/${editingProject.id}`, projectData, { headers });
      } else {
        await axios.post(`http://localhost:8080/api/projects?resumeId=${resume.id}`, {
          ...projectData,
          imageUrl: projectData.imageUrl || `https://picsum.photos/seed/${Math.random()}/400/300`
        }, { headers });
      }
      
      setIsProjectModalOpen(false);
      setEditingProject(null);
      fetchData();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm(t.deleteConfirm)) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4 animate-fade-in relative z-10">
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
          onClick={() => { setEditingProject(null); setIsProjectModalOpen(true); }}
          className="group flex items-center gap-2 px-6 py-3 bg-[var(--text-primary)] text-[var(--background)] text-sm font-black rounded-2xl transition-all hover:bg-indigo-400 active:scale-95 shadow-xl"
        >
          <Plus size={18} /> {t.addProject}
        </button>
      </div>

      {!resume && (
        <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500 text-sm flex items-center gap-3">
          <FolderOpen size={20} />
          <span>{t.needResume.split('Portfolio')[0]} <a href="/portfolio" className="underline font-bold">{t.portfolio}</a> {t.needResume.split('Portfolio')[1]}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <div key={project.id} className="bg-[var(--card-inner-bg)] border border-[var(--card-border)] rounded-3xl overflow-hidden group/p flex flex-col hover:border-indigo-500/30 transition-all shadow-lg hover:shadow-indigo-500/10">
            <div className="h-48 bg-[var(--bg-subtle)] relative overflow-hidden group/img">
              <img src={project.imageUrl} className="w-full h-full object-cover opacity-60 group-hover/p:scale-105 group-hover/p:opacity-90 transition-all duration-700" alt={project.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-inner-bg)] to-transparent opacity-80"></div>
              
              <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover/p:translate-y-0 group-hover/p:opacity-100 transition-all duration-300">
                <button 
                  onClick={() => { setEditingProject(project); setIsProjectModalOpen(true); }}
                  className="p-2.5 bg-[var(--background)]/80 backdrop-blur-xl rounded-xl text-[var(--text-primary)] hover:text-indigo-400 border border-[var(--card-border)] shadow-xl transition-all"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteProject(project.id)}
                  className="p-2.5 bg-[var(--background)]/80 backdrop-blur-xl rounded-xl text-[var(--text-primary)] hover:text-rose-500 border border-[var(--card-border)] shadow-xl transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover/p:text-indigo-400 transition-colors line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-3 mb-6 leading-relaxed flex-1">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-[var(--card-border)]">
                <div className="flex gap-4">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[var(--text-primary)] transition-all"
                  >
                    <Github size={16} /> {t.code}
                  </a>
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-indigo-400 transition-all"
                  >
                    <ExternalLink size={16} /> {t.preview}
                  </a>
                </div>
                <div className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">
                  {new Date(project.createdAt).getFullYear()}
                </div>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full py-24 text-center bg-[var(--card-inner-bg)] border-2 border-dashed border-[var(--card-border)] rounded-3xl">
            <div className="w-16 h-16 bg-[var(--button-bg)] rounded-3xl flex items-center justify-center mx-auto mb-4 border border-[var(--card-border)]">
              <FolderOpen size={32} className="text-gray-600" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{t.noProjects}</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">{t.noProjectsDesc}</p>
            <button 
              onClick={() => setIsProjectModalOpen(true)}
              className="mt-6 px-6 py-2 bg-indigo-500 text-white text-xs font-black rounded-xl hover:bg-indigo-400 transition-all font-bold shadow-lg"
            >
              {t.addFirstProject}
            </button>
          </div>
        )}
      </div>

      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
        onSave={handleSaveProject}
        initialData={editingProject}
      />
    </div>
  );
}

