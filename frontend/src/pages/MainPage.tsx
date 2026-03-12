import { useUIStore } from '../store/uiStore';
import { Users, ShoppingBag, MessageSquare, Briefcase, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const { language } = useUIStore();
  const navigate = useNavigate();

  const translations = {
    en: {
      welcome: 'Welcome to Polpol',
      subtitle: 'Your all-in-one student platform for recruitment, community, and more.',
      sections: {
        recruitment: {
          title: 'Recruitment',
          desc: 'Latest job postings and internships.',
          button: 'Explore Jobs',
          items: [
            { title: 'Frontend Developer Intern', company: 'Tech Corp', time: '2h ago' },
            { title: 'UI/UX Designer', company: 'Creative Studio', time: '5h ago' },
          ]
        },
        community: {
          title: 'Community',
          desc: 'Connect with fellow students.',
          button: 'Join Discussion',
          items: [
            { title: 'Any tips for the AI exam?', author: 'John Doe', time: '1h ago' },
            { title: 'Study group for Python', author: 'Jane Smith', time: '3h ago' },
          ]
        },
        trade: {
          title: 'Used Goods Trading',
          desc: 'Buy and sell textbooks, gadgets, and more.',
          button: 'Browse Market',
          items: [
            { title: 'MacBook Air M1', price: '$800', time: '30m ago' },
            { title: 'Calculus Textbook', price: '$20', time: '4h ago' },
          ]
        },
        council: {
          title: 'Student Council',
          desc: 'Communication channel with the council.',
          button: 'View Notices',
          items: [
            { title: 'Spring Festival Announcement', category: 'Notice', time: '1d ago' },
            { title: 'New Cafeteria Menu', category: 'News', time: '2d ago' },
          ]
        }
      }
    },
    ko: {
      welcome: 'Polpol에 오신 것을 환영합니다',
      subtitle: '채용, 커뮤니티 등을 위한 올인원 학생 플랫폼입니다.',
      sections: {
        recruitment: {
          title: '채용 공고',
          desc: '최신 채용 정보와 인턴십을 확인하세요.',
          button: '채용 공고 보기',
          items: [
            { title: '프론트엔드 개발 인턴', company: '테크 코프', time: '2시간 전' },
            { title: 'UI/UX 디자이너', company: '크리에이티브 스튜디오', time: '5시간 전' },
          ]
        },
        community: {
          title: '커뮤니티',
          desc: '동료 학생들과 소통하세요.',
          button: '토론 참여하기',
          items: [
            { title: 'AI 시험 팁 있나요?', author: '홍길동', time: '1시간 전' },
            { title: '파이썬 스터디 그룹 모집', author: '김철수', time: '3시간 전' },
          ]
        },
        trade: {
          title: '중고거래',
          desc: '교과서, 기기 등을 사고 팔 수 있습니다.',
          button: '장터 둘러보기',
          items: [
            { title: '맥북 에어 M1', price: '800,000원', time: '30분 전' },
            { title: '미적분학 교과서', price: '20,000원', time: '4시간 전' },
          ]
        },
        council: {
          title: '학생회 소통',
          desc: '학생회와의 소통 채널입니다.',
          button: '공지사항 보기',
          items: [
            { title: '봄 축제 관련 공지', category: '공지', time: '1일 전' },
            { title: '학생식당 신메뉴 안내', category: '소식', time: '2일 전' },
          ]
        }
      }
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const sections = [
    { key: 'recruitment', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10', path: '/recruitment' },
    { key: 'community', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10', path: '/community' },
    { key: 'trade', icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-500/10', path: '/trade' },
    { key: 'council', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-500/10', path: '/council' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-20 pt-4">
      {/* Search/Filter Bar Placeholder (Minimalist) */}
      <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-4">
        <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
          {language === 'ko' ? '최신 소식' : 'Latest Feed'}
        </h1>
        <div className="flex gap-4 text-xs font-medium text-[var(--text-secondary)]">
          <span className="hover:text-[var(--accent-primary)] cursor-pointer">new</span>
          <span>|</span>
          <span className="hover:text-[var(--accent-primary)] cursor-pointer">past</span>
          <span>|</span>
          <span className="hover:text-[var(--accent-primary)] cursor-pointer">comments</span>
          <span>|</span>
          <span className="hover:text-[var(--accent-primary)] cursor-pointer">ask</span>
          <span>|</span>
          <span className="hover:text-[var(--accent-primary)] cursor-pointer">show</span>
          <span>|</span>
          <span className="hover:text-[var(--accent-primary)] cursor-pointer">jobs</span>
        </div>
      </div>

      <div className="space-y-10">
        {sections.map((section) => {
          const sectionData = t.sections[section.key as keyof typeof t.sections];
          
          return (
            <section key={section.key} className="space-y-4">
              <div className="flex items-center justify-between group cursor-pointer" onClick={() => navigate(section.path)}>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">
                  {sectionData.title}
                </h2>
                <div className="h-px flex-1 mx-4 bg-[var(--card-border)] opacity-50"></div>
                <ArrowRight size={14} className="text-[var(--text-secondary)] group-hover:translate-x-1 transition-all" />
              </div>

              <div className="bg-[var(--card-bg)] rounded-2xl overflow-hidden border border-[var(--card-border)] divide-y divide-[var(--card-border)]/50">
                {sectionData.items.map((item: any, idx: number) => (
                  <div 
                    key={idx}
                    className="p-4 hover:bg-[var(--bg-subtle)] transition-all cursor-pointer group/item flex items-start gap-4"
                  >
                    <span className="text-sm text-[var(--text-secondary)] font-mono min-w-[20px] pt-1">
                      {idx + 1}.
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover/item:text-[var(--accent-primary)] transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        {item.company && (
                          <span className="text-xs text-[var(--text-secondary)] hover:underline">
                            ({item.company})
                          </span>
                        )}
                        {item.author && (
                          <span className="text-xs text-[var(--text-secondary)] hover:underline">
                            ({item.author})
                          </span>
                        )}
                        {item.price && (
                          <span className="text-xs font-bold text-orange-500">
                            {item.price}
                          </span>
                        )}
                        {item.category && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--card-border)] text-[var(--text-secondary)] font-bold uppercase">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                        <span>{item.time}</span>
                        <span>•</span>
                        <button className="hover:underline">hide</button>
                        <span>•</span>
                        <button className="hover:underline">past</button>
                        <span>•</span>
                        <button className="hover:underline">{Math.floor(Math.random() * 50)} comments</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
