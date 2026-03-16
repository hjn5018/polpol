import { ChevronLeft, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUIStore } from '../store/uiStore';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  order: number;
  createdAt: string;
}

const translations = {
  en: {
    backToHelp: "Back to Help Center",
    title: "FAQ",
    subtitle: "Find answers to common questions about using POLPOL.",
    all: "ALL",
    no: "NO",
    category: "CATEGORY",
    content: "CONTENT",
    stillQuestions: "Still have questions?",
    stillQuestionsDesc: "If you couldn't find the answer you were looking for, feel free to contact our support team.",
    contactSupport: "Contact Support",
    loading: "Loading FAQs...",
    error: "Failed to load FAQs. Please try again later.",
    noFaqs: "No FAQs found.",
    searchPlaceholder: "Search by question or answer...",
    rowsPerPage: "Rows per page",
    categories: {
      "일반": "General",
      "포트폴리오 및 이력서": "Portfolio & Resume",
      "지원 현황": "Application Status"
    }
  },
  ko: {
    backToHelp: "고객 센터로 돌아가기",
    title: "자주 묻는 질문",
    subtitle: "POLPOL 이용에 관한 궁금한 점들을 확인하세요.",
    all: "전체",
    no: "번호",
    category: "분류",
    content: "내용",
    stillQuestions: "여전히 궁금한 점이 있으신가요?",
    stillQuestionsDesc: "원하는 답변을 찾지 못하셨다면, 저희 지원팀에 직접 문의해 주세요.",
    contactSupport: "고객 지원 센터 문의",
    loading: "질문을 불러오는 중입니다...",
    error: "질문을 불러오는데 실패했습니다. 나중에 다시 시도해 주세요.",
    noFaqs: "등록된 질문이 없습니다.",
    searchPlaceholder: "질문이나 답변으로 검색하세요...",
    rowsPerPage: "표시 개수",
    categories: {
      "일반": "일반",
      "포트폴리오 및 이력서": "포트폴리오 및 이력서",
      "지원 현황": "지원 현황"
    }
  }
};

export default function FAQPage() {
  const { language } = useUIStore();
  const t = translations[language as keyof typeof translations] || translations.en;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/faqs', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setFaqs(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [t.error]);

  const toggleFAQ = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  // Extract unique categories from fetched FAQs
  const availableCategories = Array.from(new Set(faqs.map(f => f.category)));
  const filterOptions = ['all', ...availableCategories];

  // Logic for display numbering (since they are already ordered by DB, we apply global numbering)
  const processedFaqs = faqs.map((faq, idx) => ({
    ...faq,
    globalNo: idx + 1 // Ascending numbers (1, 2, 3...)
  }));

  const filteredFaqs = processedFaqs.filter(faq => {
    const categoryMatch = selectedCategory === 'all' || faq.category === selectedCategory;
    const searchMatch = searchQuery.trim() === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  }).slice(0, pageSize);

  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-20 px-6 mt-12">
      <div className="mb-12">
        <Link 
          to="/help" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">{t.backToHelp}</span>
        </Link>
        <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight mb-2">{t.title}</h1>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-50">
          <div className="w-8 h-8 border-2 border-[var(--text-secondary)] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[14px] font-medium">{t.loading}</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      ) : (
        <>
          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            {/* 1. Category Filter */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-black">
              {filterOptions.map((opt, i) => (
                <div key={opt} className="flex items-center">
                  <button
                    onClick={() => {
                      setSelectedCategory(opt);
                      setOpenIndex(null);
                    }}
                    className={`transition-colors py-1 uppercase tracking-widest font-black ${
                      selectedCategory === opt 
                        ? 'text-[var(--text-primary)] border-b-2 border-[var(--text-primary)]' 
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {opt === 'all' ? t.all : (t.categories[opt as keyof typeof t.categories] || opt)}
                  </button>
                  {i < filterOptions.length - 1 && (
                    <span className="ml-3 text-[var(--card-border)] font-normal opacity-30">|</span>
                  )}
                </div>
              ))}
            </div>

            {/* 2. Search & Page Size Select */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 md:w-64">
                <input 
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 bg-[var(--bg-subtle)] border border-[var(--card-border)] rounded-xl pl-4 pr-4 text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-tighter whitespace-nowrap">
                  {t.rowsPerPage}
                </span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="bg-[var(--bg-subtle)] border border-[var(--card-border)] text-[12px] font-black text-[var(--text-primary)] rounded-lg px-2 py-1 outline-none cursor-pointer focus:ring-1 focus:ring-cyan-500/50"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Board Styled Table */}
          <div className="border-t-2 border-[var(--text-primary)]">
            {/* Table Header */}
            <div className="flex items-center bg-[var(--bg-subtle)] border-b border-[var(--card-border)] text-[13px] font-black text-[var(--text-primary)] uppercase tracking-widest py-5 px-4">
              <div className="w-16 text-center">{t.no}</div>
              <div className="w-40 text-center">{t.category}</div>
              <div className="flex-1 px-8">{t.content}</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[var(--card-border)]">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const isOpen = openIndex === faq.id;

                  return (
                    <div key={faq.id} className="group transition-colors">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full flex items-center py-5 px-4 text-left transition-colors hover:bg-white/[0.02]"
                      >
                        <div className="w-16 text-center text-[13px] font-black text-[var(--text-secondary)]">
                          {faq.globalNo}
                        </div>
                        <div className="w-40 text-center text-[13px] font-black text-[var(--text-secondary)]">
                          {t.categories[faq.category as keyof typeof t.categories] || faq.category}
                        </div>
                        <div className="flex-1 px-8 flex items-center gap-3">
                          <span className="text-[var(--text-primary)] font-black text-lg">Q</span>
                          <span className={`text-[15px] tracking-tight transition-all duration-300 ${isOpen ? 'text-[var(--text-primary)] font-black' : 'text-[var(--text-primary)] font-medium group-hover:opacity-100 opacity-80'}`}>
                            {faq.question}
                          </span>
                        </div>
                        <div className="text-[var(--text-secondary)] opacity-50">
                          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </button>

                      {/* Expanded Answer */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] border-t border-[var(--card-border)]' : 'max-h-0'}`}
                      >
                        <div className="bg-[var(--bg-subtle)] p-10 px-24">
                          <div className="flex gap-4">
                            <span className="text-rose-500 font-black text-lg shrink-0 mt-0.5">A</span>
                            <div className="text-[14px] text-[var(--text-secondary)] leading-relaxed font-medium whitespace-pre-wrap">
                              {faq.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-20 text-center text-[var(--text-secondary)] font-medium">
                  {t.noFaqs}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* 3. Support Section */}
      <div className="mt-24 py-16 border-t border-[var(--card-border)] flex flex-col items-center text-center">
        <MessageSquare className="text-cyan-500/30 mb-6" size={48} />
        <h3 className="text-2xl font-black text-[var(--text-primary)] mb-4">{t.stillQuestions}</h3>
        <p className="text-[var(--text-secondary)] mb-10 max-w-lg mx-auto font-medium">
          {t.stillQuestionsDesc}
        </p>
        <Link 
          to="/help"
          className="px-10 py-4 bg-white text-black text-xs font-black rounded-2xl uppercase tracking-[0.2em] transition-all hover:scale-[1.05] active:scale-95 shadow-xl"
        >
          {t.contactSupport}
        </Link>
      </div>
    </div>
  );
}
