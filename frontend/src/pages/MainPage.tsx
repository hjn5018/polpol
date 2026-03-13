import { useUIStore } from '../store/uiStore';
import { Users, ShoppingBag, MessageSquare, Briefcase, ArrowRight } from 'lucide-react';

export default function MainPage() {
  const { language } = useUIStore();

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
            { title: '프론트엔드 개발 인턴', company: '테크 코프', author: '박지성', time: '2시간 전', badge: 'Interview Passed' },
            { title: 'UI/UX 디자이너', company: '크리에이티브 스튜디오', author: '김연아', time: '5시간 전', badge: 'Pending Review' },
            { title: '백엔드 중니어 개발자', company: '카카오', author: '이강인', time: '8시간 전', badge: 'Offer Extended' },
            { title: '데이터 분석가 가든', company: '네이버', author: '손흥민', time: '1일 전', badge: 'Interview Passed' },
            { title: 'DevOps 엔지니어', company: '라인', author: '황희찬', time: '2일 전', badge: 'Pending Review' },
            { title: '모바일 앱 개발자', company: '쿠팡', author: '김민재', time: '3일 전', badge: 'Offer Extended' },
            { title: '보안 전문가', company: '안랩', author: '조규성', time: '4일 전', badge: 'Interview Passed' },
            { title: '시스템 아키텍트', company: '삼성전자', author: '이승우', time: '5일 전', badge: 'Pending Review' },
            { title: 'QA 엔지니어', company: '엔씨소프트', author: '백승호', time: '1주일 전', badge: 'Offer Extended' },
            { title: '기술 지원 파트', company: 'LG CNS', author: '정우영', time: '2주일 전', badge: 'Interview Passed' },
          ]
        },
        community: {
          title: '커뮤니티',
          desc: '동료 학생들과 소통하세요.',
          button: '토론 참여하기',
          items: [
            { title: 'AI 시험 팁 있나요?', author: '홍길동', time: '1시간 전' },
            { title: '파이썬 스터디 그룹 모집', author: '김철수', time: '3시간 전' },
            { title: '이번 학기 학점 잘 받는 법', author: '이영희', time: '6시간 전' },
            { title: '점심 메뉴 추천 부탁드려요', author: '박명수', time: '12시간 전' },
            { title: '자취방 구할 때 주의할 점', author: '유재석', time: '1일 전' },
            { title: '도서관 자리 잡기 너무 힘드네요', author: '강호동', time: '2일 전' },
            { title: '방학 때 알바 뭐 하세요?', author: '신동엽', time: '3일 전' },
            { title: '코딩 테스트 대비법 공유', author: '이경규', time: '4일 전' },
            { title: '운동 같이 하실 분?', author: '서장훈', time: '5일 전' },
            { title: '동아리 홍보 영상 어디서 보나요?', author: '안정환', time: '1주일 전' },
          ]
        },
        trade: {
          title: '중고거래',
          desc: '교과서, 기기 등을 사고 팔 수 있습니다.',
          button: '장터 둘러보기',
          items: [
            { title: '맥북 에어 M1', price: '800,000원', author: '이정후', time: '30분 전' },
            { title: '미적분학 교과서', price: '20,000원', author: '김하성', time: '4시간 전' },
            { title: '아이패드 프로 11인치', price: '900,000원', author: '고우석', time: '7시간 전' },
            { title: '무선 키보드 마우스 세트', price: '15,000원', author: '오지환', time: '10시간 전' },
            { title: '전공 서적 묶음 판매', price: '50,000원', author: '박건우', time: '1일 전' },
            { title: '운동화 270mm 새상품', price: '45,000원', author: '양의지', time: '2일 전' },
            { title: '노이즈캔슬링 이어폰', price: '120,000원', author: '최정', time: '3일 전' },
            { title: '원룸용 공기청정기', price: '30,000원', author: '나성범', time: '4일 전' },
            { title: '블루투스 스피커', price: '25,000원', author: '구자욱', time: '5일 전' },
            { title: '캠핑용 의자 2개', price: '10,000원', author: '박세웅', time: '1주일 전' },
          ]
        },
        council: {
          title: '학생회 소통',
          desc: '학생회와의 소통 채널입니다.',
          button: '공지사항 보기',
          items: [
            { title: '봄 축제 관련 공지', author: '중앙학생회', category: '공지', time: '1일 전' },
            { title: '학생식당 신메뉴 안내', author: '복지위원회', category: '소식', time: '2일 전' },
            { title: '시험 기간 야식 마차 안내', author: '중앙학생회', category: '행사', time: '3일 전' },
            { title: '동아리 연합회 예산 공고', author: '동아리연합회', category: '공지', time: '4일 전' },
            { title: '장학금 신청 기간 연장', author: '교학처', category: '안내', time: '5일 전' },
            { title: '캠퍼스 내 흡연구역 재지정', author: '시설팀', category: '안내', time: '1주일 전' },
            { title: '도서관 24시간 개방 공지', author: '학술정보원', category: '공지', time: '8일 전' },
            { title: '체육대회 대진표 공개', author: '체육국', category: '소식', time: '9일 전' },
            { title: '학생증 재발급 절차 안내', author: '학생지원팀', category: '안내', time: '10일 전' },
            { title: '셔틀버스 시간표 변경', author: '총무팀', category: '안내', time: '2주일 전' },
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
    { key: 'council', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-500/ green-500/10', path: '/council' },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fade-in pb-20 pt-12 px-6 lg:px-12">
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
        {sections.map((section) => {
          const sectionData = t.sections[section.key as keyof typeof t.sections];
          
          return (
            <section key={section.key} className="space-y-4">
              <div className="flex items-center justify-between group cursor-pointer border-b border-[var(--card-border)] pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-cyan-500 rounded-full"></div>
                  <h2 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-wider group-hover:text-cyan-500 transition-colors">
                    {sectionData.title}
                  </h2>
                </div>
                <ArrowRight size={14} className="text-[var(--text-secondary)] group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
              </div>

              <div className="space-y-[1px] bg-[var(--card-border)] rounded-lg overflow-hidden border border-[var(--card-border)]">
                {sectionData.items.map((item: any, idx: number) => (
                  <div 
                    key={idx}
                    className="py-3 px-4 bg-[var(--card-bg)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer flex items-center gap-4 group/item"
                  >
                    <span className="text-[12px] text-[var(--text-secondary)] font-mono min-w-[18px] text-right">
                      {idx + 1}.
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover/item:text-cyan-500 transition-colors">
                          {item.title} {item.price && <span className="text-orange-500 ml-1">[{item.price}]</span>}
                        </h3>
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[10px] text-[var(--text-secondary)] font-medium">
                        <span>{item.author || 'Anonymous'}</span>
                        <span className="opacity-30">|</span>
                        <span>{item.time}</span>
                        {section.key === 'recruitment' && (
                          <>
                            <span className="opacity-30">|</span>
                            <span>by recruiter</span>
                            <span className="opacity-30">|</span>
                            <span>{Math.floor(Math.random() * 100)} points</span>
                          </>
                        )}
                        <span className="opacity-30">|</span>
                        <span>{Math.floor(Math.random() * 50)} comments</span>
                      </div>
                    </div>
                    {/* Only show status badge for recruitment section */}
                    {section.key === 'recruitment' && (
                      <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                        idx % 3 === 0 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        idx % 3 === 1 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                        'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      }`}>
                        {item.badge || 'Pending'}
                      </div>
                    )}
                    {section.key === 'council' && (
                      <div className="px-2 py-0.5 rounded text-[9px] font-bold text-cyan-500 border border-cyan-500/20 bg-cyan-500/5">
                        {item.category}
                      </div>
                    )}
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
