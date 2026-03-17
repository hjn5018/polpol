import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Maximize2, Minimize2, ChevronRight } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const { language, showFloatingButtons, toggleFloatingButtons, isChatOpen, setIsChatOpen } = useUIStore();
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: language === 'ko' 
        ? '안녕하세요! POLPOL AI 어시스턴트입니다. 구인 공고, 중고거래, 학생회 소식 등에 대해 무엇이든 물어보세요.' 
        : 'Hello! I am the POLPOL AI Assistant. Ask me anything about job postings, flea market, or student council news!',
      timestamp: new Date()
    }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const translations = {
    en: {
      title: 'POLPOL AI Assistant',
      placeholder: 'Type a message...',
      send: 'Send',
      hide: 'Hide floating buttons',
    },
    ko: {
      title: 'POLPOL AI 어시스턴트',
      placeholder: '메시지를 입력하세요...',
      send: '전송',
      hide: '플로팅 버튼 숨기기',
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isChatOpen, isMinimized]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI thinking
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'ko' 
          ? `현재는 UI 데모 버전입니다. 나중에 Ollama를 통해 실제 "${input}"에 대한 답변을 드릴 수 있게 될 예정입니다!` 
          : `This is a UI demo. Soon I'll be able to answer "${input}" using Ollama!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className={`fixed bottom-8 right-0 z-50 transition-all duration-500 ease-in-out transform flex items-center ${
      showFloatingButtons ? '-translate-x-8' : 'translate-x-[calc(100%-12px)]'
    }`}>
      {/* Docked Handle (Visible when hidden) */}
      {!showFloatingButtons && (
        <button
          onClick={toggleFloatingButtons}
          className="w-3 h-20 bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-l-xl shadow-2xl flex items-center justify-center transition-all group"
          title={t.title}
        >
          <div className="w-1 h-8 bg-white/30 rounded-full group-hover:bg-white/50" />
        </button>
      )}

      {/* Chat Window */}
      {isChatOpen && showFloatingButtons && (
        <div className={`absolute bottom-16 right-0 w-[350px] sm:w-[400px] bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--card-border)] rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isMinimized ? 'h-16' : 'h-[500px]'}`}>
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider">{t.title}</h3>
                {!isMinimized && <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold opacity-80">Online</span>
                </div>}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          {!isMinimized && (
            <>
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar bg-[var(--bg-subtle)]/30"
              >
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : 'bg-gray-500/10 text-gray-500'}`}>
                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                      </div>
                      <div className={`p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-[var(--primary)] text-white' 
                        : 'bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-primary)]'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-[var(--card-bg)] border-t border-[var(--card-border)]">
                <div className="relative group">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t.placeholder}
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--card-border)] rounded-2xl pl-4 pr-12 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]/50 transition-all placeholder:text-gray-600"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--primary)] text-white rounded-xl flex items-center justify-center hover:bg-[var(--primary-hover)] disabled:opacity-50 transition-all"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating Toggle Button & Dock Button */}
      {showFloatingButtons && (
        <div className="flex items-center gap-3 group/buttons">
          {!isChatOpen && (
            <button
              onClick={toggleFloatingButtons}
              className="w-8 h-8 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-secondary)] flex items-center justify-center opacity-0 group-hover/buttons:opacity-100 transition-all hover:text-[var(--primary)] hover:border-[var(--primary)]/30"
              title={t.hide}
            >
              <ChevronRight size={18} />
            </button>
          )}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-12 h-12 rounded-2xl shadow-[0_0_15px_var(--primary-glow)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] border border-white/10"
            aria-label="Toggle Chatbot"
          >
            {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
          </button>
        </div>
      )}
    </div>
  );
}
