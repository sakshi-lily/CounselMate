import React, { useMemo } from "react";

const getRoadmap = (stream, score) => {
  const isHighPerformer = score >= 7;

  const roadmaps = {
    "10th": [
      {
        phase: "Phase 1: Explore & Decide",
        date: "11th Grade",
        title: isHighPerformer ? "Fast-Track Stream Selection" : "Careful Stream Selection",
        description: isHighPerformer 
          ? "Your strong fundamentals give you the flexibility to choose any demanding stream (like Science/Math). Start foundational prep for competitive exams early." 
          : "Based on your aptitude, choose a stream you feel confident in. Focus on building strong fundamentals and consistent study habits.",
        status: "Upcoming",
      },
      {
        phase: "Phase 2: Deep Dive",
        date: "12th Grade",
        title: isHighPerformer ? "Competitive Edge & Board Excellence" : "Master Core Concepts",
        description: isHighPerformer
          ? "Balance board exams with rigorous competitive exam prep (JEE/NEET/CLAT). Aim for top percentile scores."
          : "Prepare rigorously for board exams. Focus on NCERT/state textbooks and research undergraduate courses suited for you.",
        status: "Upcoming",
      },
      {
        phase: "Phase 3: Higher Education",
        date: "Post 12th",
        title: isHighPerformer ? "Top-Tier University/College" : "Undergraduate Studies",
        description: isHighPerformer
          ? "Enroll in a premier institute. Leverage honors programs, international exchange, and early research opportunities."
          : "Enroll in a college/university program aligned with your career goals. Participate in extracurriculars and skill-building.",
        status: "Upcoming",
      },
      {
        phase: "Phase 4: Career Launch",
        date: "Post Graduation",
        title: "Enter the Professional World",
        description: "Secure an internship or entry-level job. Consider postgraduate studies or specialized certifications if needed.",
        status: "Upcoming",
      }
    ],
    "Science": [
      {
        phase: "Phase 1: Foundation",
        date: "11th & 12th Grade",
        title: isHighPerformer ? "Advanced PCM/PCB Mastery" : "Core PCM/PCB Fundamentals",
        description: isHighPerformer
          ? "Target top ranks. Solve advanced problems (H.C. Verma, Irodov) and take national-level mock tests frequently."
          : "Focus intensely on grasping core concepts. Strengthen weak areas and start preparation for state-level or private competitive exams.",
        status: "Upcoming",
      },
      {
        phase: "Phase 2: Entrance Exams",
        date: "End of 12th",
        title: isHighPerformer ? "Crack Top Tier Exams" : "Secure Admissions",
        description: isHighPerformer
          ? "Appear for JEE Advanced, top-tier NEET, or IISER aptitude test. Aim for IITs, NITs, AIIMS, or equivalent institutions."
          : "Appear for engineering/medical/science entrances (CETs, CUET). Keep options open for B.Sc or BCA programs.",
        status: "Upcoming",
      },
      {
        phase: "Phase 3: Degree & Skills",
        date: "Undergrad",
        title: isHighPerformer ? "Elite Programs & Research" : "B.Tech / MBBS / B.Sc",
        description: isHighPerformer
          ? "Engage in competitive programming (for tech) or publish undergraduate research (for medical/science). Secure top-tier internships."
          : "Pursue your degree with a focus on practical skills. For engineering, focus on coding and projects. For medical/science, focus on clinical/lab skills.",
        status: "Upcoming",
      },
      {
        phase: "Phase 4: Specialization",
        date: "Post Graduation",
        title: isHighPerformer ? "Global Masters / FAANG / Top Hospitals" : "M.Tech / MD / Placement",
        description: isHighPerformer
          ? "Transition into a high-paying FAANG role, top residency program, or pursue a Master's at a global top-50 university."
          : "Secure a campus placement in tech/medical firms, or pursue higher studies for specialization in your region.",
        status: "Upcoming",
      }
    ],
    "Commerce": [
      {
        phase: "Phase 1: Core Principles",
        date: "11th & 12th Grade",
        title: isHighPerformer ? "Advanced Accounting & Economics" : "Accounting Fundamentals",
        description: isHighPerformer
          ? "Master 12th syllabus and immediately begin CA Foundation / IPMAT (for IIMs) / Actuarial science preparation."
          : "Build a strong foundation in Accountancy, Economics, and Business Studies. Consider preparing for CUET.",
        status: "Upcoming",
      },
      {
        phase: "Phase 2: Professional Path",
        date: "Post 12th",
        title: isHighPerformer ? "Premium BBA / Fast-track CA" : "B.Com / BBA / CS",
        description: isHighPerformer
          ? "Enroll in a top BBA program (like IIM IPM) or pursue CA Intermediate alongside a premier B.Com (Hons) degree."
          : "Enroll in a standard commerce/business degree while simultaneously pursuing certifications like CS or CMA if interested.",
        status: "Upcoming",
      },
      {
        phase: "Phase 3: Practical Experience",
        date: "During Degree",
        title: isHighPerformer ? "Big 4 Articleship / Elite Internships" : "Articleship & Corporate Internships",
        description: isHighPerformer
          ? "Target articleships at Big 4 accounting firms or summer analyst roles at top investment banks / consulting firms."
          : "Gain hands-on experience through standard articleships or corporate internships in finance, marketing, or HR.",
        status: "Upcoming",
      },
      {
        phase: "Phase 4: Corporate Career",
        date: "Post Graduation",
        title: isHighPerformer ? "Investment Banking / Top Tier MBA" : "Join the Industry / General MBA",
        description: isHighPerformer
          ? "Start as a financial analyst at a top tier firm, clear CA Finals, or prepare for CAT to enter an elite MBA program."
          : "Start working as an accountant or business executive. Alternatively, prepare for CAT/GMAT for a general MBA.",
        status: "Upcoming",
      }
    ],
    "Arts": [
      {
        phase: "Phase 1: Exploration",
        date: "11th & 12th Grade",
        title: isHighPerformer ? "Intensive Humanities & Social Sciences" : "Explore Humanities",
        description: isHighPerformer
          ? "Dive deep into subjects. Prepare for elite entrance exams like CLAT (Law) or NID/NIFT (Design) early."
          : "Study subjects like History, Political Science, Psychology, or Literature. Identify your primary area of passion.",
        status: "Upcoming",
      },
      {
        phase: "Phase 2: Specialization",
        date: "Post 12th",
        title: isHighPerformer ? "Top National Law / Design / Arts Colleges" : "B.A. / Media / Design",
        description: isHighPerformer
          ? "Gain admission into NLUs, NID, or premier central universities. Engage in rigorous academic reading and debate."
          : "Pursue a Bachelor's degree in your chosen field. Consider entrance exams for state-level Law, Design, or Journalism.",
        status: "Upcoming",
      },
      {
        phase: "Phase 3: Portfolio & Skills",
        date: "During Degree",
        title: isHighPerformer ? "Elite Moot Courts / Top Publications" : "Build Your Profile",
        description: isHighPerformer
          ? "Win national moot courts, publish in renowned journals, or build an award-winning design portfolio."
          : "Write articles, build a design portfolio, participate in college debates, or volunteer. Practical experience is crucial.",
        status: "Upcoming",
      },
      {
        phase: "Phase 4: Professional Realm",
        date: "Post Graduation",
        title: isHighPerformer ? "Top Corporate Law / Civil Services" : "Career or Govt Exams",
        description: isHighPerformer
          ? "Join a Tier-1 law firm, secure a top journalism spot, or clear UPSC Civil Services (IAS/IPS)."
          : "Enter fields like media, law, writing, or design. Many Arts graduates also prepare for state/national government exams.",
        status: "Upcoming",
      }
    ]
  };

  return roadmaps[stream] || roadmaps["10th"];
};

export default function Roadmap({ userProfile, score }) {
  
  const roadmapData = useMemo(() => {
    let targetStream = "10th"; // default

    if (userProfile?.testStream) {
      targetStream = userProfile.testStream;
    } else if (userProfile?.stream) {
      targetStream = userProfile.stream;
    } else if (userProfile?.education === "12th") {
      targetStream = userProfile.stream || "Science"; // Fallback
    }

    return getRoadmap(targetStream, score || 0);
  }, [userProfile, score]);

  const profileDisplay = useMemo(() => {
    if (!userProfile) return "General";
    if (userProfile.testStream) return `Selected Path: ${userProfile.testStream}`;
    if (userProfile.education === "12th") return `12th ${userProfile.stream}`;
    return "10th Grade";
  }, [userProfile]);

  return (
    <div className="w-full text-white pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Personalized <span className="text-[#bd5e2b]">Career Roadmap</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Based on your profile ({profileDisplay}) and aptitude score ({score || 0}/10), here is a guided path tailored to your performance to help you achieve your career aspirations.
          </p>
        </div>

        <div className="relative border-l border-white/20 ml-4 md:ml-6">
          {roadmapData.map((item, index) => {
            // Determine status dynamically based on current user stage (simulated)
            // In a real app, this would be tied to user progress tracking
            let status = "Upcoming";
            if (index === 0) status = "Completed";
            if (index === 1) status = "In Progress";
            
            return (
              <div key={index} className="mb-12 ml-8 group">
                {/* Timeline Dot */}
                <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-black
                  ${status === 'Completed' ? 'bg-[#bd5e2b]' : 
                    status === 'In Progress' ? 'bg-orange-400' : 'bg-gray-600'}
                `}>
                </span>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition duration-300 hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="flex items-center text-xl font-bold text-white mb-2 md:mb-0">
                      {item.phase}
                    </h3>
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/10 text-[#bd5e2b] w-fit">
                      {item.date}
                    </span>
                  </div>
                  <h4 className="text-2xl font-semibold mb-3">{item.title}</h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  <span className={`text-sm font-semibold uppercase tracking-wider
                    ${status === 'Completed' ? 'text-green-400' : 
                      status === 'In Progress' ? 'text-yellow-400' : 'text-gray-500'}
                  `}>
                    {status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
