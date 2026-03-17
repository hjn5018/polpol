import { create } from 'zustand';

interface UIState {
  language: 'en' | 'ko';
  setLanguage: (lang: 'en' | 'ko') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  showFloatingButtons: boolean;
  toggleFloatingButtons: () => void;
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  language: (localStorage.getItem('language') as 'en' | 'ko') || 'ko',
  setLanguage: (lang) => {
    localStorage.setItem('language', lang);
    set({ language: lang });
  },
  isDarkMode: localStorage.getItem('theme') === 'dark', // Default to light mode (false) if null or 'light'
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
  showFloatingButtons: localStorage.getItem('showFloatingButtons') !== 'false',
  toggleFloatingButtons: () => {
    set((state) => {
      const newState = !state.showFloatingButtons;
      localStorage.setItem('showFloatingButtons', String(newState));
      return { showFloatingButtons: newState };
    });
  },
  isChatOpen: false,
  setIsChatOpen: (isOpen) => set({ isChatOpen: isOpen }),
}));
