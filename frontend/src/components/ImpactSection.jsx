import React from "react";
import { Users, Target, BookOpen, Award } from "lucide-react";

export default function ImpactSection() {
  const stats = [
    {
      icon: <Users size={32} className="text-[#bd5e2b]" />,
      value: "50,000+",
      label: "Students Guided",
      description: "Empowered to make informed career choices.",
    },
    {
      icon: <Target size={32} className="text-[#1e90ff]" />,
      value: "95%",
      label: "Success Rate",
      description: "Match accuracy based on interests and aptitude.",
    },
    {
      icon: <BookOpen size={32} className="text-[#28a745]" />,
      value: "200+",
      label: "Career Paths",
      description: "Detailed roadmaps across diverse industries.",
    },
    {
      icon: <Award size={32} className="text-purple-500" />,
      value: "50+",
      label: "Top Colleges",
      description: "Partnered institutions across the region.",
    },
  ];

  return (
    <section
      id="impact"
      className="relative w-full min-h-screen flex items-center justify-center bg-black py-20 px-6 overflow-hidden"
    >
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#bd5e2b] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1e90ff] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-6xl w-full z-10">
        <div className="text-center mb-16">
          <span className="text-[#bd5e2b] font-semibold tracking-wider uppercase text-sm mb-2 block">Our Impact</span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd5e2b] to-orange-400">Futures</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            CounselMate is completely redefining how students plan their careers. With the right mentorship, personalized roadmaps, and motivational guidance, students unlock opportunities and step confidently into their future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="group bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_0_40px_rgba(189,94,43,0.15)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-[#bd5e2b]/10 transition duration-500"></div>
              
              <div className="w-16 h-16 bg-black/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5 shadow-inner">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">{stat.value}</h3>
              <h4 className="text-xl font-semibold text-gray-200 mb-3">{stat.label}</h4>
              <p className="text-gray-400 leading-relaxed text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
