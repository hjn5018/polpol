import { Github, Twitter, Instagram, Mail } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  const { language } = useUIStore();

  const translations = {
    en: {
      desc: 'The all-in-one platform for global students. Connect, trade, and grow together.',
      links: {
        title: 'Platform',
        recruitment: 'Recruitment',
        trade: 'Flea Market',
        community: 'Community',
        council: 'Student Council'
      },
      support: {
        title: 'Support',
        faq: 'FAQ',
        help: 'Help Center'
      },
      legal: {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookie: 'Cookie Policy'
      },
      copyright: '© 2026 POLPOL. All rights reserved.'
    },
    ko: {
      desc: '글로벌 학생들을 위한 올인원 플랫폼. 소통하고, 거래하며, 함께 성장하세요.',
      links: {
        title: '플랫폼',
        recruitment: '지원 현황',
        trade: '중고거래',
        community: '커뮤니티',
        council: '학생회 창구'
      },
      support: {
        title: '고객 지원',
        faq: '자주 묻는 질문',
        help: '도움말 센터'
      },
      legal: {
        privacy: '개인정보 처리방침',
        terms: '이용 약관',
        cookie: '쿠키 정책'
      },
      copyright: '© 2026 POLPOL. All rights reserved.'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <footer className="mt-20 border-t border-[var(--card-border)] bg-[var(--card-bg)] pt-16 pb-8 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer w-fit">
              <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                <img src="/polpol_logo_blue_devil.svg" alt="POLPOL Logo" className="w-8 h-8" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-[var(--text-primary)]">POLPOL</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs font-medium">
              {t.desc}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-cyan-500 hover:border-cyan-500/30 transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-cyan-500 hover:border-cyan-500/30 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-cyan-500 hover:border-cyan-500/30 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-cyan-500 hover:border-cyan-500/30 transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-6">
              {t.links.title}
            </h4>
            <ul className="space-y-4">
              <li>
                <NavLink to="/recruitment" className="text-sm text-[var(--text-secondary)] hover:text-cyan-500 font-bold transition-colors">
                  {t.links.recruitment}
                </NavLink>
              </li>
              <li>
                <NavLink to="/trade" className="text-sm text-[var(--text-secondary)] hover:text-cyan-500 font-bold transition-colors">
                  {t.links.trade}
                </NavLink>
              </li>
              <li>
                <NavLink to="/community" className="text-sm text-[var(--text-secondary)] hover:text-cyan-500 font-bold transition-colors">
                  {t.links.community}
                </NavLink>
              </li>
              <li>
                <NavLink to="/council" className="text-sm text-[var(--text-secondary)] hover:text-cyan-500 font-bold transition-colors">
                  {t.links.council}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-6">
              {t.support.title}
            </h4>
            <ul className="space-y-4">
              <li>
                <NavLink to="/faq" className="text-sm text-[var(--text-secondary)] hover:text-cyan-500 font-bold transition-colors">
                  {t.support.faq}
                </NavLink>
              </li>
              <li>
                <NavLink to="/help" className="text-sm text-[var(--text-secondary)] hover:text-cyan-500 font-bold transition-colors">
                  {t.support.help}
                </NavLink>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--card-border)] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] font-bold text-[var(--text-secondary)]">
            {t.copyright}
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[11px] font-bold text-[var(--text-secondary)] hover:text-cyan-500 transition-colors">
              {t.legal.privacy}
            </a>
            <a href="#" className="text-[11px] font-bold text-[var(--text-secondary)] hover:text-cyan-500 transition-colors">
              {t.legal.terms}
            </a>
            <a href="#" className="text-[11px] font-bold text-[var(--text-secondary)] hover:text-cyan-500 transition-colors">
              {t.legal.cookie}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
