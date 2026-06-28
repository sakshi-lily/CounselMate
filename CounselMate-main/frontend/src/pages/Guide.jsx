// src/pages/Guide.jsx
import React, { useMemo } from 'react';
import { Target, Compass, BookOpen, Star, Zap, TrendingUp, Briefcase } from 'lucide-react';

// Custom sparkles icon for that extra flair
function Sparkles(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}

export default function Guide({ userProfile, score }) {
  // Logic to generate personalized content
  const guideData = useMemo(() => {
    const education = userProfile?.education || '';
    
    // Determine the active stream (prioritize test selection)
    let activeStream = '';
    if (userProfile?.testStream) {
      activeStream = userProfile.testStream.toLowerCase();
    } else if (userProfile?.stream) {
      activeStream = userProfile.stream.toLowerCase();
    }
    
    const aptitudeScore = score || 0; // Out of 10

    let pathTitle = "General Career Exploration";
    let recommendations = [];
    let skills = [];
    let nextSteps = [];

    // If 10th pass and no stream selected, show generic 10th advice
    if (education === '10th' && (!activeStream || activeStream === "10th")) {
      pathTitle = "Choosing Your Ideal Stream";
      if (aptitudeScore >= 7) {
        recommendations = ["Science (PCM/PCB)", "Commerce with Math", "Advanced Humanities"];
        skills = ["Analytical Thinking", "Advanced Mathematics", "Scientific Fundamentals"];
      } else if (aptitudeScore >= 4) {
        recommendations = ["Commerce without Math", "Arts / Humanities with Economics", "Science (General)"];
        skills = ["Business Awareness", "Communication", "Data Interpretation"];
      } else {
        recommendations = ["Arts / Humanities", "Vocational Studies", "Fine Arts"];
        skills = ["Creative Expression", "Social Sciences", "Practical Application"];
      }
      nextSteps = ["Explore different stream subjects", "Talk to seniors in respective streams", "Review college entry requirements"];

    } else if (activeStream.includes('sci') || activeStream.includes('pcm') || activeStream.includes('pcb')) {
      pathTitle = "Science & Technology Pathways";
      if (aptitudeScore >= 7) {
        recommendations = ["B.Tech / B.E (Computer Science/AI)", "MBBS / Dentistry", "B.Sc Advanced Research"];
        skills = ["Programming (Python/Java)", "Complex Problem Solving", "Clinical Analysis"];
      } else {
        recommendations = ["B.Sc General", "BCA (Computer Applications)", "Pharmacy / Biotech"];
        skills = ["Applied Computing", "Laboratory Techniques", "Research Writing"];
      }
      nextSteps = ["Prepare for Entrance Exams (JEE/NEET/CETs)", "Shortlist top 5 colleges", "Apply for scholarships"];
      
    } else if (activeStream.includes('com')) {
      pathTitle = "Business & Finance Pathways";
      if (aptitudeScore >= 7) {
        recommendations = ["Chartered Accountancy (CA)", "BBA at Top Tier Institutes", "B.Com Honors + CFA"];
        skills = ["Advanced Financial Accounting", "Corporate Law", "Market Analysis & Economics"];
      } else {
        recommendations = ["B.Com General", "BBA (Management)", "Company Secretary (CS)"];
        skills = ["Basic Accounting", "Business Administration", "Taxation Basics"];
      }
      nextSteps = ["Prepare for CA Foundation / CUET", "Review B.Com vs BBA curriculums", "Read business news regularly"];
      
    } else if (activeStream.includes('art')) {
      pathTitle = "Humanities & Law Pathways";
      if (aptitudeScore >= 7) {
        recommendations = ["BA LLB (National Law Universities)", "UPSC / Civil Services Fast-track", "B.Des (Design at NID)"];
        skills = ["Critical Reading & Writing", "Debate / Public Speaking", "Constitutional Law & Politics"];
      } else {
        recommendations = ["BA General / Honors", "Journalism / Mass Comm", "Social Work (BSW)"];
        skills = ["Content Writing", "Social Research", "Communication Skills"];
      }
      nextSteps = ["Prepare for CLAT / Design Entrances", "Build a reading habit for humanities", "Start a blog or portfolio"];
      
    } else if (education === 'Undergraduate' || education === 'Graduate') {
      pathTitle = "Advanced Career Specialization";
      recommendations = ["Postgraduate Studies (Masters)", "Corporate Internships", "Research Fellowship"];
      skills = ["Leadership & Management", "Advanced Industry Tools", "Networking"];
      nextSteps = ["Update your Resume / CV", "Start applying for internships", "Connect with industry professionals on LinkedIn"];
    } else {
      pathTitle = "Career Exploration Journey";
      recommendations = ["Skill Assessment Programs", "Online Certifications", "Mentorship Programs"];
      skills = ["Adaptability", "Basic Digital Literacy", "Continuous Learning"];
      nextSteps = ["Identify your top 3 interests", "Take an introductory online course", "Build a basic portfolio"];
    }

    return { pathTitle, recommendations, skills, nextSteps, aptitudeScore };
  }, [userProfile, score]);

  return (
    <div className="max-w-5xl mx-auto animation-fade-in relative z-10 w-full mb-12 font-body">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 rounded-3xl opacity-40 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-violet-600/10 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="glass-card p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-8 border-b border-outline-variant/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold mb-4 font-label">
              <Sparkles size={14} /> AI-Powered Career Advice
            </div>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-2 font-headline">
              Your Personalized Guide
            </h2>
            <p className="text-on-surface-variant font-medium max-w-2xl">
              Based on your profile as a <span className="text-white font-semibold">{userProfile?.education || "student"}</span> {userProfile?.stream ? `in ${userProfile.stream}` : ""} 
              with an aptitude score of <span className="text-primary font-bold">{guideData.aptitudeScore}</span>, we have curated a tailored success path for you.
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-surface/50 border border-outline-variant/20 p-6 rounded-2xl shadow-inner min-w-[160px]">
            <div className="text-on-surface-variant text-sm font-semibold mb-1 uppercase tracking-wider font-label">Aptitude Score</div>
            <div className="text-5xl font-black bg-gradient-to-tr from-primary to-violet-400 bg-clip-text text-transparent">
              {guideData.aptitudeScore > 0 ? guideData.aptitudeScore : "--"}
            </div>
          </div>
        </div>

        {/* Content Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Path Suggestions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-primary to-violet-500 rounded-xl shadow-lg">
                <Compass className="text-on-primary" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white font-headline">{guideData.pathTitle}</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guideData.recommendations.map((rec, index) => (
                <div key={index} className="group relative bg-surface-variant/20 hover:bg-surface-variant/40 border border-outline-variant/10 hover:border-primary/50 p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)] hover:-translate-y-1">
                  <div className="absolute top-4 right-4 text-gray-600 group-hover:text-primary transition-colors">
                    <Target size={20} />
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-outline-variant/20 text-primary font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-bold text-gray-200 group-hover:text-white mb-2">{rec}</h4>
                  <p className="text-sm text-on-surface-variant">A strong match based on your profile assessing.</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Skills & Steps */}
          <div className="space-y-8">
            
            {/* Key Skills */}
            <div className="bg-surface-variant/20 border border-outline-variant/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <Zap className="text-yellow-400" size={20} />
                <h4 className="text-xl font-bold text-white font-headline">Focus Skills</h4>
              </div>
              <ul className="space-y-3">
                {guideData.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Actionable Steps */}
            <div className="bg-surface-variant/20 border border-outline-variant/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <TrendingUp size={100} />
              </div>
              <div className="flex items-center gap-3 mb-5 relative z-10">
                <BookOpen className="text-blue-400" size={20} />
                <h4 className="text-xl font-bold text-white font-headline">Action Plan</h4>
              </div>
              <div className="space-y-4 relative z-10">
                {guideData.nextSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-500/30">
                        {idx + 1}
                      </div>
                      {idx !== guideData.nextSteps.length - 1 && (
                        <div className="w-px h-full bg-outline-variant/50 my-1"></div>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Call to action */}
        <div className="mt-10 pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-sm flex items-center gap-2">
            <Star className="text-yellow-500" size={16} /> Update your profile or take the test again to refine these suggestions.
          </p>
          <button className="px-6 py-2.5 bg-surface-variant/40 hover:bg-surface-variant/70 text-white font-semibold rounded-xl border border-outline-variant/20 transition-colors flex items-center gap-2 group">
            <Briefcase size={16} className="group-hover:text-primary transition-colors" /> Explore Careers
          </button>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}} />
    </div>
  );
}
