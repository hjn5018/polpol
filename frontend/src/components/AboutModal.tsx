import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useUIStore } from '../store/uiStore';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (about: string) => void;
  initialAbout?: string;
}

const translations = {
  en: {
    title: 'Edit About Me',
    description: 'Write a brief introduction about yourself.',
    placeholder: 'I am a passionate developer...',
    cancel: 'Cancel',
    save: 'Save Changes',
  },
  ko: {
    title: '자기소개 수정',
    description: '자신에 대한 짧은 소개를 작성해 주세요.',
    placeholder: '저는 열정적인 개발자입니다...',
    cancel: '취소',
    save: '변경사항 저장',
  },
};

export default function AboutModal({ isOpen, onClose, onSave, initialAbout }: AboutModalProps) {
  const { language } = useUIStore();
  const t = translations[language as keyof typeof translations] || translations.en;

  const [about, setAbout] = useState('');

  useEffect(() => {
    setAbout(initialAbout || '');
  }, [initialAbout, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(about);
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
            rows={5}
            className="w-full bg-[#2a2b36] border border-[#3f3f46] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
            placeholder={t.placeholder}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
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
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-900/20"
          >
            {t.save}
          </button>
        </div>
      </form>
    </Modal>
  );
}
