import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useUIStore } from '../store/uiStore';

interface Project {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  initialData?: Project | null;
}

const translations = {
  en: {
    editTitle: 'Edit Project',
    addTitle: 'Add New Project',
    projectTitle: 'Project Title',
    projectTitlePlaceholder: 'Cool Project Name',
    description: 'Description',
    descriptionPlaceholder: 'Tell us about your project...',
    imageUrl: 'Image URL (Optional)',
    githubUrl: 'GitHub URL',
    demoUrl: 'Demo URL',
    cancel: 'Cancel',
    save: 'Save Changes',
    add: 'Add Project',
  },
  ko: {
    editTitle: '프로젝트 수정',
    addTitle: '새 프로젝트 추가',
    projectTitle: '프로젝트 제목',
    projectTitlePlaceholder: '프로젝트 이름을 입력하세요',
    description: '설명',
    descriptionPlaceholder: '프로젝트에 대해 설명해주세요...',
    imageUrl: '이미지 URL (선택사항)',
    githubUrl: 'GitHub URL',
    demoUrl: '데모 URL',
    cancel: '취소',
    save: '변경사항 저장',
    add: '프로젝트 추가',
  },
};

export default function ProjectModal({ isOpen, onClose, onSave, initialData }: ProjectModalProps) {
  const { language } = useUIStore();
  const t = translations[language as keyof typeof translations] || translations.en;

  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    imageUrl: '',
    githubUrl: '',
    demoUrl: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        githubUrl: '',
        demoUrl: ''
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? t.editTitle : t.addTitle}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">{t.projectTitle}</label>
          <input
            type="text"
            required
            className="w-full bg-[#2a2b36] border border-[#3f3f46] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder={t.projectTitlePlaceholder}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">{t.description}</label>
          <textarea
            required
            rows={3}
            className="w-full bg-[#2a2b36] border border-[#3f3f46] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
            placeholder={t.descriptionPlaceholder}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">{t.imageUrl}</label>
          <input
            type="url"
            className="w-full bg-[#2a2b36] border border-[#3f3f46] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="https://example.com/image.png"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">{t.githubUrl}</label>
            <input
              type="url"
              className="w-full bg-[#2a2b36] border border-[#3f3f46] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="https://github.com/..."
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">{t.demoUrl}</label>
            <input
              type="url"
              className="w-full bg-[#2a2b36] border border-[#3f3f46] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="https://demo.com"
              value={formData.demoUrl}
              onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#2a2b36] transition-all"
          >
            {t.cancel}
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-900/20"
          >
            {initialData ? t.save : t.add}
          </button>
        </div>
      </form>
    </Modal>
  );
}

