// src/pages/Dashboard.jsx
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import UserForm from "./UserForm";
import AptitudeTest from "./Aptitude";
import Profile from "./Profile";
import Guide from "./Guide";
import Roadmap from "./Roadmap";
import Help from "./Help";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ArrowRight } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logoutContext } = useContext(AuthContext);
  const [formDone, setFormDone] = useState(false);
  const [testDone, setTestDone] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [userProfile, setUserProfile] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile of current logged-in user
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          withCredentials: true,
        });

        if (res.data?.profile) {
          setUserProfile(res.data.profile);
          setFormDone(true);
          if (res.data.profile.aptitudeScore != null) {
            setScore(res.data.profile.aptitudeScore);
            setTestDone(true);
          }
        } else {
          setFormDone(false);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          // No profile yet → show the form
          setFormDone(false);
        } else if (err.response?.status === 401) {
          console.warn("Session expired or unauthorized.");
          logoutContext();
          navigate("/signin");
        } else {
          console.error("Failed to fetch profile", err);
          setFormDone(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle aptitude test completion
  const handleTestComplete = async (userScore, testStream) => {
    try {
      await axios.post(
        "http://localhost:5000/api/aptitude/score",
        { score: userScore },
        { withCredentials: true }
      );

      setScore(userScore);
      setTestDone(true);
      if (testStream) {
        setUserProfile(prev => ({ ...prev, testStream }));
      }
      setActiveSection("progress");
    } catch (err) {
      console.error(err);
      alert("Failed to save test score.");
    }
  };

  if (loading) return <div className="text-white p-8">Loading your profile...</div>;

  // Show UserForm if profile is not completed
  if (!formDone)
    return (
      <UserForm
        onComplete={(profile) => {
          setUserProfile(profile);
          setFormDone(true);
        }}
      />
    );

  // Pie chart data based on education and score
  const interestData =
    userProfile.education === "12th"
      ? [
          { name: "Engineering", value: score ?? 0 },
          { name: "Medical", value: score != null ? 100 - score : 0 },
          { name: "Commerce", value: 15 },
          { name: "Arts", value: 10 },
        ]
      : [
          { name: "Science Stream", value: score ?? 0 },
          { name: "Commerce Stream", value: score != null ? 100 - score : 0 },
          { name: "Arts Stream", value: 20 },
        ];

  const COLORS = ["#bd5e2b", "#332670", "#1e90ff", "#28a745"];

  const roadmapSteps = [
    "Complete Profile",
    "Take Aptitude Test",
    "See Progress",
    "Suggested Course/Stream",
    "Get Career Guide",
  ];

  const careers =
    userProfile.education === "12th"
      ? ["Software Engineer", "Doctor", "Chartered Accountant", "Architect"]
      : [
          "Science Stream → Engineering/Medical",
          "Commerce Stream → CA/Management",
          "Arts Stream → UPSC/Teaching",
        ];

  const colleges = [
    "Govt. Engineering College Jammu",
    "Govt. Degree College Srinagar",
    "NIT Srinagar",
    "Govt. Polytechnic Jammu",
  ];

  return (
    <div className="min-h-screen bg-black text-white flex pt-[90px]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <nav className="space-y-4">
          {["dashboard", "profile", "progress", "guide", "roadmap", "help"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                  activeSection === item
                    ? "bg-[#bd5e2b] text-white"
                    : "hover:bg-gray-800"
                }`}
              >
                {item === "dashboard" && "Dashboard"}
                {item === "profile" && "Profile"}
                {item === "progress" && "Test & Progress"}
                {item === "guide" && "Personalized Guide"}
                {item === "roadmap" && "Roadmap"}
                {item === "help" && "Help"}
              </button>
            )
          )}
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-8">
        {/* Dashboard Section */}
        {activeSection === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">
              Welcome, {userProfile.name} 👋
            </h1>

            <div className="grid grid-cols-2 gap-6">
              {/* Roadmap */}
              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Career Roadmap</h2>
                <div className="space-y-4">
                  {roadmapSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 bg-[#332670] hover:bg-[#bd5e2b] cursor-pointer px-4 py-3 rounded-lg transition"
                      onClick={() => setActiveSection("roadmap")}
                    >
                      <span className="font-bold">{idx + 1}</span>
                      <span>{step}</span>
                      <ArrowRight className="ml-auto" size={18} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Interest Pie Chart */}
              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4">Your Interests</h2>
                <PieChart width={300} height={250}>
                  <Pie
                    data={interestData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {interestData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
                  />
                  <Legend />
                </PieChart>
              </div>

              {/* Career Guidance */}
              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg col-span-1">
                <h2 className="text-xl font-semibold mb-4">Career Guidance</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
                  {careers.map((career, idx) => (
                    <li key={idx}>{career}</li>
                  ))}
                </ul>
              </div>

              {/* Eligible Colleges */}
              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg col-span-1">
                <h2 className="text-xl font-semibold mb-4">
                  Eligible State Govt. Colleges (J&K)
                </h2>
                <ul className="space-y-3">
                  {colleges.map((college, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-lg"
                    >
                      <span>{college}</span>
                      <button className="px-3 py-1 bg-[#bd5e2b] rounded-lg hover:bg-[#a44e22]">
                        Apply
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Profile Section */}
        {activeSection === "profile" && (
          <div className="animate-fadeIn">
            <Profile 
              userProfile={userProfile} 
              onProfileUpdate={(newProfile) => setUserProfile(newProfile)} 
            />
          </div>
        )}

        {/* Test & Progress Section */}
        {activeSection === "progress" && (
          <div className="animate-fadeIn animate-slideInUp">
            <h1 className="text-3xl font-extrabold mb-8 decoration-[#bd5e2b] underline decoration-4 underline-offset-8">Test & Progress</h1>
            {!testDone ? (
              <AptitudeTest userProfile={userProfile} onComplete={handleTestComplete} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                    ✅
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Aptitude Test Completed</h2>
                  <p className="text-gray-400 text-lg mb-6">You've successfully finished your assessment.</p>
                  
                  <div className="bg-black/30 rounded-2xl p-6 border border-white/5 inline-block">
                    <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Total Score</p>
                    <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#bd5e2b] to-[#e87a3e]">
                      {score} <span className="text-2xl text-gray-600">/ 10</span>
                    </p>
                  </div>
                </div>

                {/* Provide detailed progress insights */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-sm flex flex-col items-center">
                  <h2 className="text-xl font-bold mb-4 w-full text-left">Your Career Affinity</h2>
                  <div className="flex-1 flex items-center justify-center w-full">
                    <PieChart width={300} height={250}>
                      <Pie
                        data={interestData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {interestData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} 
                        itemStyle={{ color: "#fff" }}
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Guide Section */}
        {activeSection === "guide" && (
          <div className="animate-fadeIn">
            <Guide userProfile={userProfile} score={score} />
          </div>
        )}

        {/* Roadmap Section */}
        {activeSection === "roadmap" && (
          <div className="animate-fadeIn">
            <Roadmap userProfile={userProfile} score={score} />
          </div>
        )}

        {/* Help Section */}
        {activeSection === "help" && (
          <div className="animate-fadeIn">
            <Help />
          </div>
        )}
      </main>
    </div>
  );
}