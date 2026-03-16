import { useUIStore } from '../store/uiStore';
import { Users, ShoppingBag, MessageSquare } from 'lucide-react';

const PlaceholderPage = ({ icon: Icon, titleKey, colorClass }: { icon: any; titleKey: string; colorClass: string }) => {
  const { language } = useUIStore();
  
  const translations = {
    en: {
      community: 'Community',
      trade: 'Used Goods Trading',
      council: 'Student Council Desk',
      comingSoon: 'This feature is coming soon!',
    },
    ko: {
      community: '커뮤니티',
      trade: '중고거래',
      council: '학생회 창구',
      comingSoon: '이 기능은 곧 출시될 예정입니다!',
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;
  const title = t[titleKey as keyof typeof t];

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center space-y-6 animate-fade-in text-center p-4">
      <div className={`p-8 rounded-full bg-opacity-10 ${colorClass.replace('text-', 'bg-')} ${colorClass}`}>
        <Icon size={64} strokeWidth={1.5} />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight capitalize">
          {title}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg">
          {t.comingSoon}
        </p>
      </div>
    </div>
  );
};

export const CommunityPage = () => <PlaceholderPage icon={Users} titleKey="community" colorClass="text-purple-500" />;
export const TradePage = () => <PlaceholderPage icon={ShoppingBag} titleKey="trade" colorClass="text-orange-500" />;
export const CouncilPage = () => <PlaceholderPage icon={MessageSquare} titleKey="council" colorClass="text-green-500" />;
