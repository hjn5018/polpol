import { Plus, Edit2, FileText, Briefcase, Award, Settings, User, HelpCircle, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface UserInfo {
  studentId: string;
  email: string;
  name: string;
}

function SectionCard({ title, icon, action, children }: { title?: string, icon?: React.ReactNode, action?: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="bg-[#1c1d24] border border-[#2a2b36] rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      {(title || action) && (
        <div className="flex items-center justify-between mb-2 relative z-10">
          {title && (
            <div className="flex items-center gap-2">
              {icon}
              <h3 className="text-lg font-bold text-gray-200 tracking-wide">{title}</h3>
            </div>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function StatCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-[#1c1d24] border border-[#2a2b36] rounded-2xl p-5 flex flex-col justify-center">
      <span className="text-gray-500 text-sm font-medium mb-1">{label}</span>
      <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{value}</span>
    </div>
  );
}

function PrimaryButton({ children, icon }: { children: React.ReactNode, icon?: React.ReactNode }) {
  return (
    <button className="text-xs font-bold uppercase tracking-wider bg-[#2a2b36] hover:bg-[#3f4051] text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-lg border border-[#3f4051] hover:border-cyan-500/50 transition-all flex items-center gap-1.5 shadow-sm">
      {icon}
      {children}
    </button>
  );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-1.5 rounded-lg bg-[#2a2b36] hover:bg-[#3f4051] text-gray-400 hover:text-cyan-400 border border-[#3f4051] hover:border-cyan-500/50 transition-all shadow-sm">
      {icon}
    </button>
  );
}

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in relative z-10 pb-20">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">My Page</h1>
          <p className="text-gray-400">Manage your profile, resumes, and projects in one place.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-8">
          <SectionCard>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-1 shadow-[0_0_20px_rgba(6,182,212,0.3)] mb-4 relative">
                <div className="w-full h-full bg-[#1c1d24] rounded-full flex items-center justify-center overflow-hidden">
                  <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {user?.name?.charAt(0) || 'P'}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-[#2a2b36] rounded-xl border border-[#3f4051] text-gray-300 hover:text-cyan-400 transition-colors">
                  <Edit2 size={14} />
                </button>
              </div>
              <h2 className="text-xl font-bold text-white mb-1">{user?.name || 'Pol User'}</h2>
              <p className="text-sm text-cyan-400 font-medium mb-4">Student</p>
              <div className="w-full text-left space-y-3 mt-2">
                <div className="flex justify-between text-sm py-2 border-b border-[#2a2b36]">
                  <span className="text-gray-500">Email</span>
                  <span className="text-gray-300 font-medium">{user?.email || 'user@office.kopo.ac.kr'}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-[#2a2b36]">
                  <span className="text-gray-500">Student ID</span>
                  <span className="text-gray-300 font-medium">{user?.studentId || '1234567890'}</span>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Quick Settings" icon={<Settings size={18} className="text-gray-400" />}>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#2a2b36] text-gray-300 transition-colors group">
                <div className="flex items-center gap-3">
                  <User size={18} className="text-blue-400" />
                  <span className="text-sm">Account Settings</span>
                </div>
                <ChevronDown size={14} className="-rotate-90 text-gray-600 group-hover:text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#2a2b36] text-gray-300 transition-colors group">
                <div className="flex items-center gap-3">
                  <HelpCircle size={18} className="text-cyan-400" />
                  <span className="text-sm">Support & Help</span>
                </div>
                <ChevronDown size={14} className="-rotate-90 text-gray-600 group-hover:text-gray-400" />
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Skills" icon={<Award size={18} className="text-blue-400" />} action={<IconButton icon={<Plus size={16} />} />}>
            <div className="text-center py-6 border-2 border-dashed border-[#2a2b36] rounded-xl">
              <p className="text-gray-500 text-xs">No skills added yet.</p>
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard label="Total Projects" value="0" />
            <StatCard label="Job Applications" value="0" />
          </div>

          <SectionCard title="My Resumes" icon={<FileText size={18} className="text-cyan-400" />} action={<PrimaryButton icon={<Plus size={16} />}>Create Resume</PrimaryButton>}>
            <div className="text-center py-10 border-2 border-dashed border-[#2a2b36] rounded-xl">
              <p className="text-gray-500 text-sm">No resumes created yet.</p>
            </div>
          </SectionCard>

          <SectionCard title="Projects" icon={<Briefcase size={18} className="text-indigo-400" />} action={<PrimaryButton icon={<Plus size={16} />}>Add Project</PrimaryButton>}>
            <div className="text-center py-10 border-2 border-dashed border-[#2a2b36] rounded-xl">
              <p className="text-gray-500 text-sm">No projects added yet.</p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
