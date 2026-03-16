import { create } from 'zustand';

interface UIState {
  language: 'en' | 'ko';
  setLanguage: (lang: 'en' | 'ko') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  language: (localStorage.getItem('language') as 'en' | 'ko') || 'ko',
  setLanguage: (lang) => {
    localStorage.setItem('language', lang);
    set({ language: lang });
  },
  isDarkMode: localStorage.getItem('theme') !== 'light', // Default to dark mode (true) if null or 'dark'
  toggleDarkMode: () => {
    set((state) => {
      const newMode = !state.isDarkMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      if (newMode) {
        document.documentElement.classList.remove('light-theme');
      } else {
        document.documentElement.classList.add('light-theme');
      }
      return { isDarkMode: newMode };
    });
  },
  isSidebarCollapsed: localStorage.getItem('sidebarCollapsed') !== 'false', // Default to true if not set
  toggleSidebar: () => {
    set((state) => {
      const newState = !state.isSidebarCollapsed;
      localStorage.setItem('sidebarCollapsed', String(newState));
      return { isSidebarCollapsed: newState };
    });
  },
}));
