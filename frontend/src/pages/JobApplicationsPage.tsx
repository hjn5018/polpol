import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, MessageSquare, Award, Clock, ArrowUpRight } from 'lucide-react';

interface JobApplication {
  id: number;
  title: string;
  author: string;
  time: string;
  points: number;
  comments: number;
  status: 'Interview Passed' | 'Pending Review' | 'Offer Extended' | 'Hired' | 'Rejected';
}

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data based on the screenshot
    const dummyData: JobApplication[] = [
      { id: 1, title: 'Junior Web Developer | John Doe', author: 'Alice Smith', time: '2 hours ago', points: 48, comments: 12, status: 'Interview Passed' },
      { id: 2, title: 'UX/UI Designer | Ben Carter', author: 'Ben Carter', time: '3 hours ago', points: 11, comments: 7, status: 'Interview Passed' },
      { id: 3, title: 'Data Scientist | Emily Chen', author: 'Emily Chen', time: '5 hours ago', points: 37, comments: 5, status: 'Pending Review' },
      { id: 4, title: 'ML Engineer | David Lee', author: 'David Lee', time: '8 hours ago', points: 87, comments: 1, status: 'Offer Extended' },
      { id: 5, title: 'Data Analyst Intern (SQL/Tableau)', author: 'Alice Smith', time: '1 hours ago', points: 48, comments: 12, status: 'Hired' },
      { id: 6, title: 'Full Stack Developer | Alice Smith', author: 'Ben Carter', time: '3 hours ago', points: 48, comments: 7, status: 'Interview Passed' },
      { id: 7, title: 'Senior Software Engineer (Python/AWS)', author: 'Emily Chen', time: '5 hours ago', points: 37, comments: 8, status: 'Pending Review' },
    ];
    setApplications(dummyData);
    setLoading(false);
  }, []);

  const getStatusColor = (status: JobApplication['status']) => {
    switch (status) {
      case 'Interview Passed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Pending Review': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Offer Extended': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'Hired': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
      case 'Rejected': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            Student Resumes <span className="text-gray-500 font-normal text-xl">| (281 found)</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
             <input 
               type="text" 
               placeholder="Search applications..." 
               className="bg-[#1c1d24] border border-[#2a2b36] rounded-xl py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-cyan-500 transition-all w-64"
             />
           </div>
           <button className="p-2 bg-[#1c1d24] border border-[#2a2b36] rounded-xl text-gray-400 hover:text-white transition-colors">
             <Filter size={18} />
           </button>
        </div>
      </div>

      <div className="space-y-1">
        {applications.map((app, index) => (
          <div key={app.id} className="group flex items-center justify-between p-4 bg-transparent hover:bg-[#1c1d24]/50 border-b border-[#1f2028] transition-all cursor-pointer">
            <div className="flex items-start gap-5">
              <span className="text-gray-600 font-medium pt-1 w-6">{index + 1}.</span>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[#e2e2e2] group-hover:text-white font-medium text-lg transition-colors">
                    {app.title}
                  </h3>
                  <ArrowUpRight size={14} className="text-gray-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="hover:text-gray-300 cursor-pointer">{app.author}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {app.time}</span>
                  <span className="flex items-center gap-1">by recruiter</span>
                  <span className="flex items-center gap-1"><Award size={12} /> {app.points} points</span>
                  <span className="flex items-center gap-1"><MessageSquare size={12} /> {app.comments} comments</span>
                </div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(app.status)}`}>
              {app.status}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 bg-[#1c1d24] border border-[#2a2b36] rounded-xl text-gray-400 hover:text-cyan-400 transition-all text-sm font-medium">
          Load More Results
        </button>
      </div>
    </div>
  );
}
