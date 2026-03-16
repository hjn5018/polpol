import { useState, useEffect } from 'react';
import { MessageCircle, ChevronRight, Send, User, Clock, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Inquiry {
  id: number;
  title: string;
  content: string;
  status: 'OPEN' | 'CLOSED';
  createdAt: string;
  userName: string;
  studentId: string;
}

const translations = {
  en: {
    title: 'Help Center',
    adminView: 'Admin View',
    userView: 'User View',
    faqTitle: 'Frequently Asked Questions',
    viewMore: 'View More',
    directHelpTitle: 'Need direct help?',
    directHelpDesc: "Our management team is ready to assist you. Submit an inquiry below and we'll get back to you as soon as possible.",
    contactSupport: 'Contact Support',
    subject: 'Subject',
    subjectPlaceholder: 'Brief summary...',
    detail: 'Detail',
    detailPlaceholder: 'Describe your issue or feedback in detail...',
    sendInquiry: 'Send Inquiry',
    sending: 'Sending...',
    cancel: 'Cancel',
    historyTitle: 'My Inquiries History',
    adminHistoryTitle: 'All User Inquiries',
    noRecords: 'No inquiry records found.',
    resolved: 'Mark as Resolved',
    faqs: [
      { q: 'How do I set a default resume?', a: 'Go to My Portfolio, find the resume you want to use, and click the "Set Default" button in its card.' },
      { q: 'How do I track my job applications?', a: 'Use the Job Application Tracking section on your dashboard to add and manage your current applications.' },
      { q: 'Is my portfolio public?', a: 'You can choose to make your portfolio public or private in the Settings -> Privacy section.' },
    ]
  },
  ko: {
    title: '고객 센터',
    adminView: '관리자 모드',
    userView: '사용자 모드',
    faqTitle: '자주 묻는 질문 (FAQ)',
    viewMore: '더 보기',
    directHelpTitle: '직접 문의하기',
    directHelpDesc: '운영팀에서 도움을 드릴 준비가 되어 있습니다. 아래에 문의 사항을 남겨주시면 최대한 빨리 답변해 드리겠습니다.',
    contactSupport: '고객 지원 센터 문의',
    subject: '제목',
    subjectPlaceholder: '간단한 요약...',
    detail: '상세 내용',
    detailPlaceholder: '문제 사항이나 피드백을 자세히 설명해 주세요...',
    sendInquiry: '문의 보내기',
    sending: '보내는 중...',
    cancel: '취소',
    historyTitle: '내 문의 내역',
    adminHistoryTitle: '전체 사용자 문의 내역',
    noRecords: '문의 내역이 없습니다.',
    resolved: '해결 완료 처리',
    faqs: [
      { q: '기본 이력서는 어떻게 설정하나요?', a: '포트폴리오 메뉴에서 설정하려는 이력서를 찾아 카드에 있는 "기본 설정" 버튼을 클릭하세요.' },
      { q: '구직 지원 현황은 어떻게 관리하나요?', a: '지원 현황 메뉴에서 현재 참여 중인 채용 프로세스를 관리할 수 있습니다.' },
      { q: '제 포트폴리오는 공개인가요?', a: '환경 설정 -> 개인정보 보호 섹션에서 포트폴리오의 공개/비공개 여부를 선택할 수 있습니다.' },
    ]
  }
};

export default function HelpPage() {
  const { user } = useAuthStore();
  const { language } = useUIStore();
  const t = translations[language];
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isAdminView, setIsAdminView] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = isAdminView ? '/api/inquiries/admin' : '/api/inquiries/me';
      const response = await axios.get(`http://localhost:8080${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(response.data);
    } catch (error) {
      console.error('Failed to fetch inquiries');
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [isAdminView]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/inquiries', { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle('');
      setContent('');
      setShowForm(false);
      fetchInquiries();
    } catch (error) {
      alert(language === 'ko' ? '문의 전송에 실패했습니다.' : 'Failed to send inquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: 'OPEN' | 'CLOSED') => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:8080/api/inquiries/admin/${id}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchInquiries();
    } catch (error) {
      alert(language === 'ko' ? '상태 업데이트에 실패했습니다.' : 'Failed to update status.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-10 px-4 mt-8">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">{t.title}</h1>
        
        {user?.role === 'ADMIN' && (
          <button 
            onClick={() => setIsAdminView(!isAdminView)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest ${
              isAdminView 
                ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                : 'bg-white/5 border-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <ShieldCheck size={18} />
            {isAdminView ? t.userView : t.adminView}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Inquiry Stats & History */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Inquiry History Section (Now at Top) */}
          <section className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[40px] p-8 shadow-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-3">
                <Clock size={24} className="text-blue-400" />
                {isAdminView ? t.adminHistoryTitle : t.historyTitle}
              </h2>
              {inquiries.length > 0 && (
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-black border border-blue-500/20">
                  {inquiries.length} {language === 'ko' ? '기록' : 'Total'}
                </span>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar space-y-4">
              {inquiries.length === 0 ? (
                <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-[var(--card-border)] rounded-[32px] opacity-50">
                  <p className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-widest">{t.noRecords}</p>
                </div>
              ) : (
                inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="bg-[var(--card-inner-bg)] border border-[var(--card-border)] rounded-[28px] p-6 hover:border-white/10 transition-all group/card">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] ${
                          inquiry.status === 'OPEN' 
                            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                            : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        }`}>
                          {inquiry.status}
                        </span>
                        <span className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {isAdminView && (
                        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                          <User size={10} />
                          <span className="text-[9px] font-black uppercase opacity-60">{inquiry.userName}</span>
                        </div>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-[var(--text-primary)] mb-2 group-hover/card:text-cyan-400 transition-colors truncate">{inquiry.title}</h4>
                    <p className="text-xs text-[var(--text-secondary)] font-medium line-clamp-2 leading-relaxed mb-4">{inquiry.content}</p>
                    
                    {isAdminView && inquiry.status === 'OPEN' && (
                      <button 
                        onClick={() => handleUpdateStatus(inquiry.id, 'CLOSED')}
                        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500 hover:text-emerald-400 transition-colors px-3 py-1.5 border border-emerald-500/20 rounded-xl bg-emerald-500/5 hover:bg-emerald-500/10"
                      >
                        <CheckCircle size={12} /> {t.resolved}
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Quick Inquiry & Stats Overview */}
        <div className="space-y-8">
          {/* 2. Compact Inquiry Trigger/Form */}
          <section className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[40px] p-8 shadow-2xl relative overflow-hidden h-full flex flex-col">
            <div className="relative z-10 flex-1">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 flex items-center justify-center mb-6">
                <MessageCircle size={32} className="text-cyan-400" />
              </div>
              <h2 className="text-xl font-black text-[var(--text-primary)] mb-3 tracking-tight">{t.directHelpTitle}</h2>
              <p className="text-[var(--text-secondary)] font-medium mb-8 text-sm leading-relaxed">{t.directHelpDesc}</p>
              
              {!showForm ? (
                <button 
                  onClick={() => setShowForm(true)}
                  className="w-full py-4 bg-cyan-500 text-black font-black rounded-2xl hover:bg-cyan-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-cyan-500/20 uppercase tracking-widest text-xs"
                >
                  {t.contactSupport}
                </button>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in relative z-10">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">{t.subject}</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-[var(--card-inner-bg)] border border-[var(--card-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                      placeholder={t.subjectPlaceholder}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">{t.detail}</label>
                    <textarea 
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={3}
                      className="w-full bg-[var(--card-inner-bg)] border border-[var(--card-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs focus:outline-none focus:border-cyan-500/50 transition-all font-medium resize-none"
                      placeholder={t.detailPlaceholder}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] font-black rounded-xl uppercase tracking-widest transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? t.sending : <>{t.sendInquiry} <Send size={12} /></>}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="w-full py-3 text-[var(--text-secondary)] text-[10px] font-black rounded-xl uppercase tracking-widest hover:text-[var(--text-primary)] transition-all bg-[var(--bg-subtle)]"
                    >
                      {t.cancel}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>

      <div className="mt-12 space-y-12">
        {/* 3. FAQ Section (Now at Middle/Bottom) */}
        <section className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[40px] p-10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-3">
              <ChevronRight size={24} className="text-cyan-400" />
              {t.faqTitle}
            </h2>
            <Link 
              to="/faq" 
              className="group flex items-center gap-2 text-xs font-black text-cyan-400 uppercase tracking-widest hover:text-[var(--text-primary)] transition-all"
            >
              {t.viewMore} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.faqs.map((faq) => (
              <div key={faq.q} className="group p-6 bg-[var(--card-inner-bg)] border border-[var(--card-border)] rounded-3xl hover:border-cyan-500/30 transition-all">
                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2 min-h-[40px]">
                  {faq.q}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium line-clamp-3">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
