import { useState } from 'react';
import { useUIStore } from '../store/uiStore';
import { Search, Filter, Star, Image as ImageIcon } from 'lucide-react';

const DEPARTMENTS = [
  '전체',
  'AI융합소프트웨어과',
  '메카트로닉스공학과',
  '디지털디자인과',
  '반도체전자과',
  '건축설계과',
  '기계공학과',
  '반도체공정과',
  '반도체시스템과',
  '방송미디어과',
  '산업설비자동화과',
  '자동차공학과',
  '전기공학과',
  '컴퓨터공학과'
];

type PostCategory = '공지' | '잡담' | '질문';

interface Post {
  id: string;
  category: PostCategory;
  title: string;
  author: string;
  department: string;
  date: string;
  views: number;
  likes: number;
  imageUrl?: string;
  hasVideo?: boolean;
}

const DUMMY_POSTS: Post[] = [
  {
    id: '1',
    category: '공지',
    title: '전공 심화 과정 신청 안내 및 규정',
    author: '학과사무실',
    department: 'AI융합소프트웨어과',
    date: '24.03.15',
    views: 1200,
    likes: 45,
  },
  {
    id: '2',
    category: '공지',
    title: '신입생 오리엔테이션 자료집 배포',
    author: '학생회',
    department: 'AI융합소프트웨어과',
    date: '24.03.10',
    views: 890,
    likes: 32,
  },
  {
    id: '3',
    category: '질문',
    title: '이거 리액트 쿼리 캐시 처리가 이상해요 도와주세요.jpg',
    author: '오해원',
    department: 'AI융합소프트웨어과',
    date: '14:25',
    views: 156,
    likes: 12,
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '4',
    category: '잡담',
    title: '오늘 점심 메뉴 돈까스 진짜 맛있네요 ㅋㅋㅋ',
    author: '김철수',
    department: 'AI융합소프트웨어과',
    date: '14:20',
    views: 342,
    likes: 15,
    imageUrl: 'https://images.unsplash.com/photo-1593504049359-74330189a345?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '5',
    category: '잡담',
    title: '반도체 공정 실습실 리뉴얼 됐네요 대박 ㄷㄷ 1',
    author: '이영희',
    department: '반도체공정과',
    date: '14:18',
    views: 203,
    likes: 8,
  },
  {
    id: '6',
    category: '질문',
    title: '[긴급] 캐드 라이선스 갱신 어떻게 하나요?',
    author: '박지민',
    department: '컴퓨터공학과',
    date: '14:15',
    views: 89,
    likes: 5,
  },
  {
    id: '7',
    category: '잡담',
    title: '폴리텍 도서관 24시간 개방 진짜인가요? 1',
    author: '최민석',
    department: '기계공학과',
    date: '13:58',
    views: 120,
    likes: 3,
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=60',
  }
];

export default function CommunityPage() {
  const { language } = useUIStore();
  const [selectedDept, setSelectedDept] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);

  const t = {
    ko: {
      category: '탭',
      title: '제목',
      author: '글쓴이',
      date: '날짜',
      views: '조회',
      likes: '추천',
      searchPlaceholder: '게시글 검색...',
      filterAll: '전체',
      catNotice: '공지',
      catChat: '잡담',
      catQuestion: '질문',
    },
    en: {
      category: 'Cat',
      title: 'Title',
      author: 'Author',
      date: 'Date',
      views: 'Views',
      likes: 'Rec',
      searchPlaceholder: 'Search posts...',
      filterAll: 'All',
      catNotice: 'Notice',
      catChat: 'Chat',
      catQuestion: 'Question',
    }
  }[language as 'ko' | 'en'] || {
    category: '탭',
    title: '제목',
    author: '글쓴이',
    date: '날짜',
    views: '조회',
    likes: '추천',
    searchPlaceholder: '게시글 검색...',
    filterAll: '전체',
    catNotice: '공지',
    catChat: '잡담',
    catQuestion: '질문',
  };

  const filteredPosts = DUMMY_POSTS.filter(post => {
    const matchesDept = selectedDept === '전체' || post.department === selectedDept;
    const matchesCat = selectedCategory === '전체' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesCat && matchesSearch;
  });

  const getCategoryColor = (cat: PostCategory) => {
    switch (cat) {
      case '공지': return 'text-red-500';
      case '잡담': return 'text-gray-500';
      case '질문': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="animate-fade-in space-y-6 pb-20 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[var(--card-bg)] p-6 rounded-[32px] border border-[var(--card-border)] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-[var(--primary)] rounded-full mr-1"></div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] flex items-center gap-2">
            {selectedDept === '전체' ? (language === 'ko' ? '캠퍼스 전체 게시판' : 'Campus Bulletin Board') : selectedDept}
            <Star size={20} className="text-yellow-400 fill-yellow-400 ml-1" />
          </h1>
        </div>
        
        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] focus-within:text-[var(--primary)]" size={16} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]/50 transition-all text-sm shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar: Department Selection */}
        <aside className="space-y-4">
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[32px] p-5 shadow-sm sticky top-24">
            <h3 className="text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-4 flex items-center gap-2 px-3">
              <Filter size={12} />
              {language === 'ko' ? '게시판 목록' : 'Boards'}
            </h3>
            <div className="space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => { setSelectedDept(dept); setSelectedCategory('전체'); }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selectedDept === dept 
                    ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20 shadow-primary-glow' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content: Board List */}
        <div className="space-y-4">
          {/* Sub Tabs */}
          <div className="flex items-center gap-1 bg-[var(--card-bg)] p-1 rounded-2xl border border-[var(--card-border)] w-fit shadow-sm">
            {['전체', '공지', '잡담', '질문'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                  ? 'bg-[var(--card-border)] text-[var(--primary)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]'
                }`}
              >
                {cat === '전체' ? t.filterAll : cat}
              </button>
            ))}
          </div>

          {/* Board Table */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[32px] overflow-visible shadow-sm">
            <div>
              <table className="w-full text-left border-collapse">
                <thead className="bg-[var(--bg-subtle)] text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 w-20 text-center">{t.category}</th>
                    <th className="px-4 py-4">{t.title}</th>
                    <th className="px-4 py-4 w-32">{t.author}</th>
                    <th className="px-4 py-4 w-20 text-center">{t.date}</th>
                    <th className="px-4 py-4 w-16 text-center">{t.views}</th>
                    <th className="px-6 py-4 w-16 text-center">{t.likes}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--card-border)]">
                  {filteredPosts.map((post) => (
                    <tr 
                      key={post.id} 
                      className={`group hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer ${post.category === '공지' ? 'bg-red-500/5' : ''}`}
                      onMouseEnter={() => setHoveredPostId(post.id)}
                      onMouseLeave={() => setHoveredPostId(null)}
                    >
                      <td className={`px-6 py-4 text-xs font-black text-center ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </td>
                      <td className="px-4 py-4">
                        <div className="relative flex items-center gap-2">
                          <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                            {post.title}
                          </span>
                          {post.imageUrl && (
                            <ImageIcon size={14} className="text-[var(--text-secondary)] opacity-50" />
                          )}
                          {post.id === '3' && <span className="text-[var(--primary)] text-[10px] font-black ml-1">1</span>}

                          {/* Hover Image Popup - Positioned at title's top-left */}
                          {hoveredPostId === post.id && post.imageUrl && (
                            <div 
                              className="absolute bottom-full left-0 mb-4 pointer-events-none z-[100] max-w-[160px] max-h-[200px] w-auto h-auto bg-white rounded-xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.3)] animate-fade-in border border-gray-100 p-1 origin-bottom-left transition-all"
                            >
                              <img src={post.imageUrl} alt="Preview" className="w-full h-auto max-h-[190px] rounded-lg object-contain" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
                          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[var(--primary)]/20 to-purple-500/20 border border-white/10 flex items-center justify-center overflow-hidden">
                            <span className="text-[8px] text-[var(--primary)] font-black">{post.author[0]}</span>
                          </div>
                          {post.author}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-xs text-[var(--text-secondary)] font-medium">
                        {post.date}
                      </td>
                      <td className="px-4 py-4 text-center text-xs text-[var(--text-secondary)] font-medium">
                        {post.views >= 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}
                      </td>
                      <td className="px-6 py-4 text-center text-xs font-black text-[var(--primary)]">
                        {post.likes > 0 ? post.likes : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredPosts.length === 0 && (
              <div className="p-20 text-center text-[var(--text-secondary)] italic">
                {language === 'ko' ? '게시글이 존재하지 않습니다.' : 'No posts found.'}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
