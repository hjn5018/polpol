import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useUIStore } from '../store/uiStore';

interface CareerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (career: string) => void;
  initialCareer?: string;
}

const translations = {
  en: {
    title: 'Edit Career & Experience',
    description: 'Describe your career history, internships, or work experience.',
    placeholder: '2023 - 2024: Junior Developer at Company X...',
    cancel: 'Cancel',
    save: 'Save Career',
  },
  ko: {
    title: '경력 사항 수정',
    description: '경력 사항, 인턴십 또는 업무 경험을 기술해 주세요.',
    placeholder: '2023 - 2024: X사 주니어 개발자...',
    cancel: '취소',
    save: '경력 저장',
  },
};

export default function CareerModal({ isOpen, onClose, onSave, initialCareer }: CareerModalProps) {
  const { language } = useUIStore();
  const t = translations[language as keyof typeof translations] || translations.en;

  const [career, setCareer] = useState('');

  useEffect(() => {
    setCareer(initialCareer || '');
  }, [initialCareer, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(career);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={t.title}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            {t.description}
          </label>
          <textarea
            required
            rows={8}
            className="w-full bg-[#2a2b36] border border-[#3f3f46] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
            placeholder={t.placeholder}
            value={career}
            onChange={(e) => setCareer(e.target.value)}
          />
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
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-900/20"
          >
            {t.save}
          </button>
        </div>
      </form>
    </Modal>
  );
}
