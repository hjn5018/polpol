import { ChevronLeft, HelpCircle, Book, MessageSquare, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUIStore } from '../store/uiStore';

const translations = {
  en: {
    backToHelp: "Back to Help Center",
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about using POLPOL.",
    stillQuestions: "Still have questions?",
    stillQuestionsDesc: "If you couldn't find the answer you were looking for, feel free to contact our support team.",
    contactSupport: "Contact Support",
    categories: [
      {
        title: 'General',
        faqs: [
          { q: 'What is POLPOL?', a: 'POLPOL is a comprehensive portfolio management and recruitment platform designed specifically for students and professionals to showcase their skills and track job applications.' },
          { q: 'Is it free to use?', a: 'Yes, the basic features of POLPOL are completely free for students. We also offer premium features for advanced users.' },
          { q: 'How do I create an account?', a: 'You can sign up using your student ID and university email address to verify your academic status.' }
        ]
      },
      {
        title: 'Portfolio & Resume',
        faqs: [
          { q: 'How do I set a default resume?', a: 'Go to My Portfolio, find the resume you want to use, and click the "Set Default" button in its card. This will be the resume shown to recruiters.' },
          { q: 'Can I upload images of my projects?', a: 'Yes, you can add project details and upload relevant images to your portfolio to provide visual proof of your work.' },
          { q: 'How do I edit my skills?', a: 'Skills are automatically synchronized from your default resume. Update your resume and upload it again to reflect changes in your skills section.' }
        ]
      },
      {
        title: 'Job Applications',
        faqs: [
          { q: 'How do I track my job applications?', a: 'Use the Job Application Tracking section on your Dashboard. You can add company details, status, and set reminders for follow-ups.' },
          { q: 'Who can see my applications?', a: 'Job applications are private to you. Recruiters can only see your public portfolio if you share the link or apply to their postings.' }
        ]
      }
    ]
  },
  ko: {
    backToHelp: "고객 센터로 돌아가기",
    title: "자주 묻는 질문",
    subtitle: "POLPOL 이용에 관한 궁금한 점들을 확인하세요.",
    stillQuestions: "여전히 궁금한 점이 있으신가요?",
    stillQuestionsDesc: "원하는 답변을 찾지 못하셨다면, 저희 지원팀에 직접 문의해 주세요.",
    contactSupport: "고객 지원 센터 문의",
    categories: [
      {
        title: '일반',
        faqs: [
          { q: 'POLPOL이란 무엇인가요?', a: 'POLPOL은 학생과 전문가들이 자신의 역량을 보여주고 구직 활동을 관리할 수 있도록 설계된 종합 포트폴리오 및 채용 플랫폼입니다.' },
          { q: '무료로 이용할 수 있나요?', a: '네, POLPOL의 기본 기능은 학생들에게 완전히 무료입니다. 고급 사용자를 위한 프리미엄 기능도 제공하고 있습니다.' },
          { q: '계정은 어떻게 생성하나요?', a: '학번과 학교 이메일 주소를 사용하여 회원가입을 하고 학생 인증을 거치면 계정을 생성할 수 있습니다.' }
        ]
      },
      {
        title: '포트폴리오 및 이력서',
        faqs: [
          { q: '기본 이력서는 어떻게 설정하나요?', a: '포트폴리오 메뉴에서 설정하려는 이력서를 찾아 카드에 있는 "기본 설정" 버튼을 클릭하세요. 이 이력서가 채용 담당자에게 노출됩니다.' },
          { q: '프로젝트 이미지를 업로드할 수 있나요?', a: '네, 프로젝트 상세 내용에 이미지를 업로드하여 작업물을 시각적으로 증명할 수 있습니다.' },
          { q: '보유 기술은 어떻게 수정하나요?', a: '보유 기술은 기본 이력서에서 자동으로 동기화됩니다. 이력서를 업데이트하고 다시 업로드하면 기술 섹션에 반영됩니다.' }
        ]
      },
      {
        title: '지원 현황',
        faqs: [
          { q: '구직 지원 현황은 어떻게 관리하나요?', a: '지원 현황 메뉴를 이용하세요. 기업 상세 정보, 상태를 추가하고 후속 조치를 위한 알림을 설정할 수 있습니다.' },
          { q: '누가 제 지원 내역을 볼 수 있나요?', a: '지원 내역은 본인만 볼 수 있는 비공개 정보입니다. 채용 담당자는 본인이 링크를 공유하거나 직접 지원한 경우에만 포트폴리오를 볼 수 있습니다.' }
        ]
      }
    ]
  }
};

const icons = {
  'General': <HelpCircle className="text-cyan-400" size={24} />,
  '일반': <HelpCircle className="text-cyan-400" size={24} />,
  'Portfolio & Resume': <Book className="text-blue-400" size={24} />,
  '포트폴리오 및 이력서': <Book className="text-blue-400" size={24} />,
  'Job Applications': <Zap className="text-amber-400" size={24} />,
  '지원 현황': <Zap className="text-amber-400" size={24} />,
};

export default function FAQPage() {
  const { language } = useUIStore();
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20 px-4 mt-8">
      <div className="mb-12">
        <Link 
          to="/help" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group transition-all"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">{t.backToHelp}</span>
        </Link>
        <h1 className="text-5xl font-black text-[var(--text-primary)] tracking-tighter mb-4">{t.title}</h1>
        <p className="text-[var(--text-secondary)] text-lg">{t.subtitle}</p>
      </div>

      <div className="space-y-12">
        {t.categories.map((category) => {
          const icon = icons[category.title as keyof typeof icons] || <HelpCircle size={24} />;
          
          return (
            <section key={category.title} className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[40px] p-10 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                {icon}
              </div>
              
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-gray-400">
                  {icon}
                </div>
                <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">{category.title}</h2>
              </div>

              <div className="grid gap-8">
                {category.faqs.map((faq, index) => (
                  <div key={index} className="group">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-3 group-hover:text-cyan-400 transition-colors flex items-start gap-3">
                      <span className="text-cyan-500/30 font-black mt-1">?</span>
                      {faq.q}
                    </h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed font-medium pl-6 border-l border-white/5 group-hover:border-cyan-500/30 transition-all">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-20 p-12 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-[40px] text-center">
        <MessageSquare className="mx-auto text-cyan-400 mb-6" size={48} />
        <h3 className="text-2xl font-black text-[var(--text-primary)] mb-4">{t.stillQuestions}</h3>
        <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto font-medium">
          {t.stillQuestionsDesc}
        </p>
        <Link 
          to="/help"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-black rounded-2xl uppercase tracking-[0.2em] transition-all hover:scale-[1.05] active:scale-95 shadow-xl"
        >
          {t.contactSupport}
        </Link>
      </div>
    </div>
  );
}

