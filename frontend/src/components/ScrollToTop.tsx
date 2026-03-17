import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export default function ScrollToTop() {
  const { showFloatingButtons, isChatOpen } = useUIStore();
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    // Check global window scroll or a specific container
    // Since our app uses a scrollable div in App.tsx, we need to listen to that or use window
    const mainContent = document.querySelector('main');
    if (mainContent) {
      if (mainContent.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  const scrollToTop = () => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.addEventListener('scroll', toggleVisibility);
      return () => mainContent.removeEventListener('scroll', toggleVisibility);
    }
  }, []);

  return (
    <div className={`fixed z-50 transition-all duration-500 ease-in-out transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0 pointer-events-none'
    } ${
      isChatOpen 
        ? 'bottom-8 right-24' 
        : (showFloatingButtons ? 'bottom-24 right-8' : 'bottom-8 right-8')
    }`}>
      <button
        onClick={scrollToTop}
        className="w-12 h-12 bg-transparent hover:bg-[var(--primary)]/10 text-[var(--primary)] rounded-2xl shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-[var(--primary)]"
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
}
