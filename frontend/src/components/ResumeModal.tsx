import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { X, Plus, BookOpen, Award, Briefcase } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    about: string;
    skills: string[];
    career: string[];
  }) => void;
  initialData?: {
    title: string;
    about: string;
    skills: string[];
    career: string;
  };
}

const translations = {
  en: {
    editTitle: "Edit Resume",
    addTitle: "Create New Resume",
    resumeTitle: "Resume Title",
    resumeTitlePlaceholder: "e.g. Fullstack Developer Resume...",
    aboutMe: "About Me",
    aboutMePlaceholder: "Briefly describe your professional identity...",
    techSkills: "Technical Skills",
    techSkillsPlaceholder: "Add skills (React, Java...)",
    add: "Add",
    noSkills: "No skills added yet",
    careerHistory: "Career History",
    careerHistoryPlaceholder: "Describe your career history (one per line)...",
    cancel: "Cancel",
    save: "Save Changes",
    create: "Create Resume",
  },
  ko: {
    editTitle: "이력서 수정",
    addTitle: "새 이력서 작성",
    resumeTitle: "이력서 제목",
    resumeTitlePlaceholder: "예: 풀스택 개발자 이력서...",
    aboutMe: "자기소개",
    aboutMePlaceholder: "자신의 전문성을 짧게 설명해 주세요...",
    techSkills: "기술 스택",
    techSkillsPlaceholder: "기술 추가 (React, Java...)",
    add: "추가",
    noSkills: "추가된 기술이 없습니다",
    careerHistory: "경력 사항",
    careerHistoryPlaceholder: "경력 사항을 입력하세요 (한 줄에 하나씩)...",
    cancel: "취소",
    save: "변경사항 저장",
    create: "이력서 작성",
  },
};

export default function ResumeModal({ isOpen, onClose, onSave, initialData }: ResumeModalProps) {
  const { language } = useUIStore();
  const t = translations[language as keyof typeof translations] || translations.en;

  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [career, setCareer] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitle(initialData?.title || '');
      setAbout(initialData?.about || '');
      setSkills(initialData?.skills || []);
      setCareer(initialData?.career || '');
    }
  }, [initialData, isOpen]);

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      about,
      skills,
      career: career.split('\n').filter(line => line.trim())
    });
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? t.editTitle : t.addTitle}
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
        {/* Resume Title */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
            <BookOpen size={16} className="text-cyan-400" />
            {t.resumeTitle}
          </label>
          <input
            required
            type="text"
            className="w-full bg-[#2a2b36] border border-[#3f3f46] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder={t.resumeTitlePlaceholder}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* About Me */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
            <Award size={16} className="text-purple-400" />
            {t.aboutMe}
          </label>
          <textarea
            required
            rows={3}
            className="w-full bg-[#2a2b36] border border-[#3f3f46] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
            placeholder={t.aboutMePlaceholder}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
            <Plus size={16} className="text-amber-400" />
            {t.techSkills}
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              className="flex-1 bg-[#2a2b36] border border-[#3f3f46] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder={t.techSkillsPlaceholder}
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 bg-[#3f3f46] hover:bg-[#4a4b59] text-white rounded-xl transition-colors"
            >
              {t.add}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 p-3 bg-[#0f1016] rounded-xl border border-[#2a2b36] min-h-[60px]">
            {skills.length === 0 ? (
              <span className="text-gray-600 text-xs italic">{t.noSkills}</span>
            ) : (
              skills.map(skill => (
                <span key={skill} className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-900/30 text-cyan-400 border border-cyan-800/50 rounded-full text-xs font-medium">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-white">
                    <X size={12} />
                  </button>
                </span>
              ))
            )}
          </div>
        </div>

        {/* Career History */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
            <Briefcase size={16} className="text-emerald-400" />
            {t.careerHistory}
          </label>
          <textarea
            required
            rows={4}
            className="w-full bg-[#2a2b36] border border-[#3f3f46] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            placeholder={t.careerHistoryPlaceholder}
            value={career}
            onChange={(e) => setCareer(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#2a2b36]">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#2a2b36] transition-all"
          >
            {t.cancel}
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg"
          >
            {initialData ? t.save : t.create}
          </button>
        </div>
      </form>
    </Modal>
  );
}

