import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LearnMore() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Personalized Roadmaps",
      description: "Get a custom-tailored career trajectory based on your unique skills, interests, and aspirations. No more generic advice—your path is yours alone.",
      icon: "🗺️"
    },
    {
      title: "Expert Mentorship",
      description: "Connect with seasoned professionals who have walked the path you want to take. Gain invaluable insights and guidance from those who know best.",
      icon: "🤝"
    },
    {
      title: "Actionable Insights",
      description: "Access real-time data on industry trends, demanded skills, and emerging opportunities to stay ahead of the curve in a competitive market.",
      icon: "📈"
    },
    {
      title: "Comprehensive Aptitude",
      description: "Discover your hidden strengths through our scientifically backed psychological and aptitude assessments, designed for career precision.",
      icon: "🧠"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#bd5e2b] rounded-full blur-[200px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[#e87a3e] rounded-full blur-[200px] opacity-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 text-sm font-medium text-[#bd5e2b] uppercase tracking-widest">
            About The Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Empowering Your <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd5e2b] to-[#e87a3e] drop-shadow-sm">
              Professional Destiny
            </span>
          </h1>
          <p className="text-xl text-[#ffffffaa] leading-relaxed">
            CounselMate isn't just an advisory platform; it's your dedicated career compass. 
            We bridge the gap between where you are today and where you want to be tomorrow.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1 group"
              style={{ animation: `fade-in-up 0.5s ease-out ${index * 0.15}s forwards`, opacity: 0 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#bd5e2b]/20 to-[#e87a3e]/10 flex items-center justify-center text-3xl mb-6 shadow-inner border border-[#bd5e2b]/30 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white/95">{feature.title}</h3>
              <p className="text-[#ffffff88] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-[#bd5e2b]/10 to-transparent border border-[#bd5e2b]/20 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 mb-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#bd5e2b] to-[#e87a3e]"></div>
          <div className="flex-1 z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-[#ffffffcc] leading-relaxed">
              We believe that true potential is often masked by confusion and lack of direction. 
              CounselMate was fundamentally built to democratize elite career guidance. We leverage 
              intelligent mapping and human empathy to transform uncertainty into profound clarity, 
              ensuring every student and professional finds their true north.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center z-10">
             <div className="w-48 h-48 rounded-full border-4 border-[#bd5e2b]/30 flex items-center justify-center relative">
               <div className="absolute inset-0 rounded-full border border-[#bd5e2b] animate-ping opacity-20"></div>
               <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#bd5e2b] to-[#e87a3e] flex items-center justify-center shadow-[0_0_50px_rgba(189,94,43,0.4)]">
                 <span className="text-5xl">🎯</span>
               </div>
             </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to take the leap?</h2>
          <p className="text-lg text-[#ffffffaa] mb-8 max-w-2xl mx-auto">
            Your idealized future isn't a distant dream. It's a structured sequence of steps we can build together today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/start-journey')}
              className="px-8 py-4 bg-gradient-to-r from-[#bd5e2b] to-[#e87a3e] text-white rounded-full font-bold hover:shadow-[0_0_30px_rgba(189,94,43,0.5)] transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Start Your Journey Now
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 w-full sm:w-auto"
            >
              Back to Home
            </button>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
}
