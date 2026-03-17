import { useState } from 'react';
import { useUIStore } from '../store/uiStore';
import { Users, ShoppingBag, MessageSquare, Briefcase, ArrowRight, Megaphone, Image as ImageIcon, Code } from 'lucide-react';

export default function MainPage() {
  const { language } = useUIStore();
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const translations = {
    en: {
      welcome: 'Welcome to Polpol',
      subtitle: 'Your all-in-one student platform for recruitment, community, and more.',
      sections: {
        recruitment: {
          title: 'Job Applications',
          desc: 'Latest job postings and internships.',
          button: 'Explore Jobs'
        },
        community: {
          title: 'Community',
          desc: 'Connect with fellow students.',
          button: 'Join Discussion'
        },
        trade: {
          title: 'Flea Market',
          desc: 'Buy and sell textbooks, gadgets, and more.',
          button: 'Browse Market'
        },
        council: {
          title: 'Student Council Desk',
          desc: 'Communication channel with the council.',
          button: 'View Notices'
        },
        jobPosts: {
          title: 'Corporate Recruitment',
          desc: 'Official career opportunities from companies and alumni.',
          button: 'View Board'
        },
        projectRecruitment: {
          title: 'Project Recruitment',
          desc: 'Find team members for your next big idea.',
          button: 'View Projects'
        }
      },
      ui: {
        byRecruiter: 'by recruiter',
        points: 'points',
        comments: 'comments',
        pending: 'Pending'
      }
    },
    ko: {
      welcome: 'Polpol에 오신 것을 환영합니다',
      subtitle: '채용, 커뮤니티 등을 위한 올인원 학생 플랫폼입니다.',
      sections: {
        recruitment: {
          title: '지원 현황',
          desc: '최신 채용 정보와 인턴십을 확인하세요.',
          button: '지원 현황 보기'
        },
        community: {
          title: '커뮤니티',
          desc: '동료 학생들과 소통하세요.',
          button: '토론 참여하기'
        },
        trade: {
          title: '중고거래',
          desc: '교과서, 기기 등을 사고 팔 수 있습니다.',
          button: '장터 둘러보기'
        },
        council: {
          title: '학생회 창구',
          desc: '학생회와의 소통 채널입니다.',
          button: '공지사항 보기'
        },
        jobPosts: {
          title: '기업 구인',
          desc: '기업체 및 동문 기업에서 올리는 공식 채용 정보입니다.',
          button: '게시판 바로가기'
        },
        projectRecruitment: {
          title: '프로젝트 구인',
          desc: '함께 혁신을 만들어갈 팀원을 찾아보세요.',
          button: '프로젝트 보기'
        }
      },
      ui: {
        byRecruiter: '채용 담당자',
        points: '포인트',
        comments: '댓글',
        pending: '대기 중'
      }
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  // Shared Data: User-generated content that doesn't change with language
  const SECTION_CONTENT = {
    recruitment: [
      { title: '프론트엔드 개발 인턴', company: '테크 코프', author: '박지성', time: '2h', badge: 'Interview Passed' },
      { title: 'UI/UX 디자이너', company: '크리에이티브 스튜디오', author: '김연아', time: '5h', badge: 'Pending Review' },
      { title: '백엔드 주니어 개발자', company: '카카오', author: '이강인', time: '8h', badge: 'Offer Extended' },
      { title: '데이터 분석가 가든', company: '네이버', author: '손흥민', time: '1d', badge: 'Interview Passed' },
      { title: 'DevOps 엔지니어', company: '라인', author: '황희찬', time: '2d', badge: 'Pending Review' },
      { title: '모바일 앱 개발자', company: '쿠팡', author: '김민재', time: '3d', badge: 'Offer Extended' },
      { title: '보안 전문가', company: '안랩', author: '조규성', time: '4d', badge: 'Interview Passed' },
      { title: '시스템 아키텍트', company: '삼성전자', author: '이승우', time: '5d', badge: 'Pending Review' },
      { title: 'QA 엔지니어', company: '엔씨소프트', author: '백승호', time: '1w', badge: 'Offer Extended' },
      { title: '기술 지원 파트', company: 'LG CNS', author: '정우영', time: '2w', badge: 'Interview Passed' },
    ],
    community: [
      { title: 'AI 시험 팁 있나요?', author: '홍길동', time: '1h', image: '/campus_thumb.png', tags: ['시험공부', 'AI', '꿀팁'] },
      { title: '파이썬 스터디 그룹 모집', author: '김철수', time: '3h', tags: ['스터디', '개발', '파이썬'] },
      { title: '이번 학기 학점 잘 받는 법', author: '이영희', time: '6h', tags: ['학사', '학점', '대학생활'] },
      { title: '점심 메뉴 추천 부탁드려요', author: '박명수', time: '12h', image: '/campus_thumb.png', tags: ['학식', '질문'] },
      { title: '자취방 구할 때 주의할 점', author: '유재석', time: '1d', tags: ['자취', '정보'] },
      { title: '도서관 자리 잡기 너무 힘드네요', author: '강호동', time: '2d', tags: ['도서관', '일상'] },
      { title: '방학 때 알바 뭐 하세요?', author: '신동엽', time: '3d', tags: ['알바', '방학'] },
      { title: '코딩 테스트 대비법 공유', author: '이경규', time: '4d', tags: ['코테', '취업'] },
      { title: '운동 같이 하실 분?', author: '서장훈', time: '5d', tags: ['운동', '모임'] },
      { title: '동아리 홍보 영상 어디서 보나요?', author: '안정환', time: '1w', tags: ['동아리', '정보'] },
    ],
    trade: [
      { title: '맥북 에어 M1', price: '800,000원', author: '이정후', time: '30m', image: '/macbook_thumb.png', tags: ['전자기기', '애플', '급처'] },
      { title: '미적분학 교과서', price: '20,000원', author: '김하성', time: '4h', tags: ['전공서적', '수학'] },
      { title: '아이패드 프로 11인치', price: '900,000원', author: '고우석', time: '7h', image: '/macbook_thumb.png', tags: ['전자기기', '태블릿'] },
      { title: '무선 키보드 마우스 세트', price: '15,000원', author: '오지환', time: '10h', tags: ['주변기기'] },
      { title: '전공 서적 묶음 판매', price: '50,000원', author: '박건우', time: '1d', tags: ['전공서적'] },
      { title: '운동화 270mm 새상품', price: '45,000원', author: '양의지', time: '2d', tags: ['의류', '신발'] },
      { title: '노이즈캔슬링 이어폰', price: '120,000원', author: '최정', time: '3d', tags: ['음향기기', '소니'] },
      { title: '원룸용 공기청정기', price: '30,000원', author: '나성범', time: '4d', tags: ['가전', '원룸'] },
      { title: '블루투스 스피커', price: '25,000원', author: '구자욱', time: '5d', tags: ['음향기기'] },
      { title: '캠핑용 의자 2개', price: '10,000원', author: '박세웅', time: '1w', tags: ['레저', '캠핑'] },
    ],
    council: [
      { title: '봄 축제 관련 공지', author: '중앙학생회', category: '공지', time: '1d', image: '/notice_thumb.png', tags: ['축제', '중요'] },
      { title: '학생식당 신메뉴 안내', author: '복지위원회', category: '소식', time: '2d', tags: ['학식', '복지'] },
      { title: '시험 기간 야식 마차 안내', author: '중앙학생회', category: '행사', time: '3d', image: '/notice_thumb.png', tags: ['행사', '간식'] },
      { title: '동아리 연합회 예산 공고', author: '동아리연합회', category: '공지', time: '4d', tags: ['예산', '공지'] },
      { title: '장학금 신청 기간 연장', author: '교학처', category: '안내', time: '5d', tags: ['장학금', '안내'] },
      { title: '캠퍼스 내 흡연구역 재지정', author: '시설팀', category: '안내', time: '1w', tags: ['금연', '안내'] },
      { title: '도서관 24시간 개방 공지', author: '학술정보원', category: '공지', time: '8d', tags: ['도서관', '안내'] },
      { title: '체육대회 대진표 공개', author: '체육국', category: '소식', time: '9d', tags: ['체육대회', '대진표'] },
      { title: '학생증 재발급 절차 안내', author: '학생지원팀', category: '안내', time: '10d', tags: ['학생증', '정보'] },
      { title: '셔틀버스 시간표 변경', author: '총무팀', category: '안내', time: '2w', tags: ['셔틀버스', '안내'] },
    ],
    jobPosts: [
      { title: '신입 프론트엔드 개발자 구인', company: '에이비씨 테크', author: '김선배', time: '1h', tags: ['React', 'TypeScript', '초보가능'] },
      { title: '백엔드 개발자 (Spring Boot)', company: '클라우드 시스템', author: '박수석', time: '3h', tags: ['Java', 'Spring', '경력무관'] },
      { title: 'UI/UX 디자이너 모집', company: '디자인 포스', author: '이디자이너', time: '5h', tags: ['Figma', 'UIUX'] },
      { title: '[급구] 데이터 분석 아르바이트', company: '데이터 랩', author: '최박사', time: '12h', tags: ['Python', 'SQL', '유연근무'] },
      { title: '안드로이드 개발자 채용', company: '모바일 웍스', author: '정팀장', time: '1d', tags: ['Kotlin', 'App'] },
    ],
    projectRecruitment: [
      { title: 'AI 기반 캠퍼스 가이드 서비스 팀원 모집', author: '박준영', time: '30m', tags: ['AI', 'Next.js', 'PyTorch'] },
      { title: '디자인 포트폴리오 스터디원 구해요!', author: '이지은', time: '2h', tags: ['Design', 'UIUX'] },
      { title: '메카트로닉스 경진대회 하드웨어 개발자 1명', author: '최현우', time: '5h', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60', tags: ['H/W', 'Robot'] },
      { title: '졸업 작품 프로젝트 (웹 앱) 같이 하실 분?', author: '정지민', time: '12h', tags: ['React', 'Fullstack'] },
    ]
  };

  const sections = [
    { key: 'recruitment', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10', path: '/recruitment' },
    { key: 'trade', icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-500/10', path: '/trade' },
    { key: 'community', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10', path: '/community' },
    { key: 'council', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-500/10', path: '/council' },
    { key: 'jobPosts', icon: Megaphone, color: 'text-rose-500', bg: 'bg-rose-500/10', path: '/job-posts' },
    { key: 'projectRecruitment', icon: Code, color: 'text-amber-500', bg: 'bg-amber-500/10', path: '/project-recruitment' },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fade-in pb-20 pt-12 px-6 lg:px-12">
      <div className="flex flex-col gap-y-16">
        {sections.map((section) => {
          const sectionConfig = t.sections[section.key as keyof typeof t.sections];
          const items = SECTION_CONTENT[section.key as keyof typeof SECTION_CONTENT];
          
          return (
            <section key={section.key} className="space-y-4">
              <div className="flex items-center justify-between group cursor-pointer border-b border-[var(--card-border)] pb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${section.bg} flex items-center justify-center`}>
                    <section.icon size={18} className={`${section.color} opacity-100`} />
                  </div>
                  <h2 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-wider group-hover:text-cyan-500 transition-colors">
                    {sectionConfig.title}
                  </h2>
                </div>
                <ArrowRight size={14} className="text-[var(--text-secondary)] group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
              </div>

              <div className="space-y-[1px] bg-[var(--card-border)] rounded-lg overflow-visible border border-[var(--card-border)]">
                {items.map((item: any, idx: number) => {
                  const itemId = `${section.key}-${idx}`;
                  return (
                    <div 
                      key={idx}
                      className={`py-3 px-4 bg-[var(--card-bg)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer flex items-center gap-4 group/item relative ${
                        idx === 0 ? 'rounded-t-lg' : idx === items.length - 1 ? 'rounded-b-lg' : ''
                      }`}
                      onMouseEnter={() => setHoveredItemId(itemId)}
                      onMouseLeave={() => setHoveredItemId(null)}
                    >
                      <span className="text-[12px] text-[var(--text-secondary)] font-mono min-w-[18px] text-right">
                        {idx + 1}.
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="relative flex items-center gap-2 mb-0.5">
                          <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover/item:text-cyan-500 transition-colors truncate">
                            {item.title}
                          </h3>
                          {item.image && (
                            <ImageIcon size={14} className="text-[var(--text-secondary)] opacity-50" />
                          )}

                          {hoveredItemId === itemId && item.image && (
                            <div 
                              className="absolute bottom-full left-0 mb-4 pointer-events-none z-[100] max-w-[160px] max-h-[200px] w-auto h-auto bg-white rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-fade-in border border-gray-100 p-1 origin-bottom-left transition-all"
                            >
                              <img src={item.image} alt="Preview" className="w-full h-auto max-h-[190px] rounded-lg object-contain" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)] font-medium">
                          {section.key === 'trade' && item.price && (
                            <>
                              <span className="text-amber-600 dark:text-amber-400 font-extrabold">{item.price}</span>
                              <span className="opacity-30">|</span>
                            </>
                          )}
                          {section.key === 'jobPosts' && item.company && (
                            <>
                              <span className="text-rose-500 font-black">{item.company}</span>
                              <span className="opacity-30">|</span>
                            </>
                          )}
                          <span>{item.author || 'Anonymous'}</span>
                          <span className="opacity-30">|</span>
                          <span>{item.time}{language === 'ko' ? ' 전' : ' ago'}</span>
                          {section.key === 'recruitment' && (
                            <>
                              <span className="opacity-30">|</span>
                              <span>{Math.floor(Math.random() * 100)} {t.ui.points}</span>
                            </>
                          )}
                          <span className="opacity-30">|</span>
                          <span>{Math.floor(Math.random() * 50)} {t.ui.comments}</span>
                          
                          {/* Tags Display */}
                          {item.tags && (
                            <>
                              <span className="opacity-30">|</span>
                              <div className="flex items-center gap-1.5 overflow-hidden ml-1">
                                {item.tags.map((tag: string) => (
                                  <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--card-border)] whitespace-nowrap hover:text-cyan-500 hover:border-cyan-500/30 transition-colors">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {section.key === 'recruitment' && (
                        <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                          idx % 3 === 0 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                          idx % 3 === 1 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                          'bg-purple-500/10 text-purple-400 border-purple-500/20'
                        }`}>
                          {item.badge}
                        </div>
                      )}
                      {section.key === 'council' && (
                        <div className="px-2 py-0.5 rounded text-[9px] font-bold text-cyan-500 border border-cyan-500/20 bg-cyan-500/5">
                          {item.category}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
