import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { X, Plus } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (skills: string[]) => void;
  initialTags?: string[];
}

const translations = {
  en: {
    title: 'Edit Technical Skills',
    description: 'Add skills like React, Java, Spring Boot, etc.',
    placeholder: 'e.g. Docker',
    currentSkills: 'Current Skills',
    noSkills: 'No skills added yet...',
    cancel: 'Cancel',
    save: 'Save Skills',
  },
  ko: {
    title: '기술 스택 수정',
    description: 'React, Java, Spring Boot 등의 기술을 추가하세요.',
    placeholder: '예: Docker',
    currentSkills: '현재 기술 스택',
    noSkills: '추가된 기술이 없습니다...',
    cancel: '취소',
    save: '기술 저장',
  },
};

export default function SkillsModal({ isOpen, onClose, onSave, initialTags }: SkillsModalProps) {
  const { language } = useUIStore();
  const t = translations[language as keyof typeof translations] || translations.en;

  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (initialTags) {
      setTags(initialTags);
    } else {
      setTags([]);
    }
  }, [initialTags, isOpen]);

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(tags);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={t.title}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-3">
            {t.description}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 bg-[#2a2b36] border border-[#3f3f46] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder={t.placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="p-2 bg-[#2a2b36] hover:bg-[#3f3f46] text-white rounded-xl border border-[#3f3f46] transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-3">{t.currentSkills}</label>
          <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-[#0f1016] rounded-xl border border-[#2a2b36]">
            {tags.length === 0 ? (
              <span className="text-gray-600 text-sm">{t.noSkills}</span>
            ) : (
              tags.map(tag => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-900/30 text-cyan-400 border border-cyan-800/50 rounded-full text-sm font-medium animate-in zoom-in-75 duration-200"
                >
                  {tag}
                  <button 
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-white transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))
            )}
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
            {t.save}
          </button>
        </div>
      </form>
    </Modal>
  );
}
