// src/pages/Aptitude.jsx
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const questionSets = {
  "10th": [
    { q: "If you have a strong interest in machines, which stream is best?", options: ["Science", "Commerce", "Arts"], answer: "Science" },
    { q: "Which subject deals with the study of human history?", options: ["Physics", "History", "Accountancy"], answer: "History" },
    { q: "What is 15% of 200?", options: ["30", "40", "25"], answer: "30" },
    { q: "Which field involves debit and credit?", options: ["Engineering", "Commerce", "Medicine"], answer: "Commerce" },
    { q: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome"], answer: "Mitochondria" },
    { q: "Which stream focuses on business and finance?", options: ["Arts", "Commerce", "Science"], answer: "Commerce" },
    { q: "If you want to become a lawyer, which stream is most directly related?", options: ["Arts", "Science", "Commerce"], answer: "Arts" },
    { q: "H2O is the chemical formula for?", options: ["Oxygen", "Water", "Hydrogen"], answer: "Water" },
    { q: "What is 8 * 7?", options: ["54", "56", "64"], answer: "56" },
    { q: "Which of these is a programming language?", options: ["HTML", "Python", "CSS"], answer: "Python" }
  ],
  "Science": [
    { q: "What is the SI unit of Force?", options: ["Joule", "Newton", "Pascal"], answer: "Newton" },
    { q: "Derivative of x^2 is?", options: ["x", "2x", "x^3/3"], answer: "2x" },
    { q: "Which organ pumps blood?", options: ["Brain", "Lungs", "Heart"], answer: "Heart" },
    { q: "Formula for velocity is?", options: ["distance/time", "mass*acceleration", "volume/time"], answer: "distance/time" },
    { q: "Atomic number of Carbon?", options: ["6", "8", "12"], answer: "6" },
    { q: "What is the speed of light?", options: ["3x10^8 m/s", "300 m/s", "1500 m/s"], answer: "3x10^8 m/s" },
    { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter"], answer: "Mars" },
    { q: "What is the chemical symbol for Gold?", options: ["Go", "Ag", "Au"], answer: "Au" },
    { q: "Which of the following is a scalar quantity?", options: ["Velocity", "Force", "Speed"], answer: "Speed" },
    { q: "What is the pH of pure water?", options: ["5", "7", "9"], answer: "7" }
  ],
  "Commerce": [
    { q: "What is the primary objective of a business?", options: ["Charity", "Profit", "Employment"], answer: "Profit" },
    { q: "Assets = Liabilities + ?", options: ["Revenue", "Expenses", "Equity"], answer: "Equity" },
    { q: "Which of the following is a direct tax?", options: ["Income Tax", "GST", "Custom Duty"], answer: "Income Tax" },
    { q: "GDP stands for?", options: ["Gross Domestic Product", "General Domestic Profit", "Gross Daily Product"], answer: "Gross Domestic Product" },
    { q: "In accounting, P&L stands for?", options: ["Profit & Loss", "Price & Labour", "Pay & Leave"], answer: "Profit & Loss" },
    { q: "Which document contains the rules of a company?", options: ["Prospectus", "Articles of Association", "Memorandum"], answer: "Articles of Association" },
    { q: "A bull market means stock prices are?", options: ["Falling", "Rising", "Stable"], answer: "Rising" },
    { q: "What does ROI mean?", options: ["Return on Investment", "Rate of Interest", "Return on Income"], answer: "Return on Investment" },
    { q: "Which is a liability for a bank?", options: ["Loans given", "Deposits received", "Cash in vault"], answer: "Deposits received" },
    { q: "FDI stands for?", options: ["Foreign Direct Investment", "Federal Direct Income", "Fixed Deposit Interest"], answer: "Foreign Direct Investment" }
  ],
  "Arts": [
    { q: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen"], answer: "William Shakespeare" },
    { q: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Ganges"], answer: "Nile" },
    { q: "The French Revolution started in?", options: ["1789", "1812", "1914"], answer: "1789" },
    { q: "Father of the Indian Constitution is?", options: ["Mahatma Gandhi", "B.R. Ambedkar", "Jawaharlal Nehru"], answer: "B.R. Ambedkar" },
    { q: "Which discipline studies the human mind?", options: ["Sociology", "Psychology", "Philosophy"], answer: "Psychology" },
    { q: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra"], answer: "Canberra" },
    { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso"], answer: "Da Vinci" },
    { q: "Which ancient civilization built the pyramids?", options: ["Maya", "Mesopotamia", "Egypt"], answer: "Egypt" },
    { q: "Economics is generally classified as a?", options: ["Natural Science", "Social Science", "Humanity"], answer: "Social Science" },
    { q: "Which continent has the most countries?", options: ["Asia", "Africa", "Europe"], answer: "Africa" }
  ]
};

export default function AptitudeTest({ userProfile, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [selectedStream, setSelectedStream] = useState("");
  
  const questions = useMemo(() => {
    if (selectedStream && questionSets[selectedStream]) {
      return questionSets[selectedStream];
    }
    if (userProfile?.stream && questionSets[userProfile.stream]) {
      return questionSets[userProfile.stream];
    }
    return questionSets["10th"]; // fallback
  }, [selectedStream, userProfile]);

  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    // Initialize answers when test starts
    if (testStarted) {
      setAnswers(Array(questions.length).fill(null));
      setCurrent(0);
      setTimeLeft(15 * 60); // Reset timer
    }
  }, [testStarted, questions]);

  useEffect(() => {
    if (!testStarted) return;
    
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, testStarted]);

  const handleAnswer = (option) => {
    const updated = [...answers];
    updated[current] = option;
    setAnswers(updated);
    if (current + 1 < questions.length) setCurrent(current + 1);
  };

  const handleSkip = () => {
    if (current + 1 < questions.length) setCurrent(current + 1);
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      alert("Please answer all questions before submitting!");
      return;
    }
    // Scale score to 10 points
    const correctCount = answers.filter((a, idx) => a === questions[idx].answer).length;
    const score = Math.round((correctCount / questions.length) * 10);
    
    try {
      await axios.post("http://localhost:5000/api/aptitude/score", { score }, {
        withCredentials: true,
      });
      onComplete(score, selectedStream); // send score and stream to dashboard
    } catch (err) {
      console.error("Failed to save score:", err);
      alert("There was an error saving your score. Please try again.");
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!testStarted) {
    return (
      <div className="flex bg-[#0a0a0a] text-white rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-h-[600px] items-center justify-center animate-fadeIn">
        <div className="max-w-md w-full bg-white/5 p-8 rounded-xl border border-white/10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#bd5e2b]">Before We Begin</h2>
          <p className="text-gray-300 mb-6">
            Please select the stream or category you want to take the aptitude test for. This will tailor the questions to your interests.
          </p>
          
          <select 
            className="w-full bg-black border border-white/20 p-3 rounded-lg text-white mb-6 focus:outline-none focus:ring-2 focus:ring-[#bd5e2b]"
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
          >
            <option value="" disabled>Select your stream</option>
            <option value="10th">10th Grade / General</option>
            <option value="Science">Science (PCM/PCB)</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts / Humanities</option>
          </select>

          <button
            onClick={() => {
              if (!selectedStream) {
                alert("Please select a stream first!");
                return;
              }
              setTestStarted(true);
            }}
            className="w-full py-3 bg-[#bd5e2b] text-white font-bold rounded-lg hover:bg-[#a44e22] transition-colors"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#0a0a0a] text-white rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-h-[600px] animate-fadeIn">
      <div className="w-1/4 p-4 border-r border-gray-700">
        <h3 className="text-lg font-bold mb-4">Questions</h3>
        <ul className="space-y-2">
          {questions.map((_, idx) => (
            <li
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`p-2 rounded cursor-pointer ${
                idx === current ? "bg-[#bd5e2b]" : answers[idx] ? "bg-green-600" : "bg-gray-800"
              }`}
            >
              Question {idx + 1}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Aptitude Test ({selectedStream})</h2>
          <span className="text-lg font-semibold text-[#bd5e2b]">
            Time Left: {formatTime(timeLeft)}
          </span>
        </div>

        <div>
          <p className="text-lg mb-4">{questions[current]?.q}</p>
          <div className="space-y-3">
            {questions[current]?.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                className={`block w-full p-3 rounded text-left ${
                  answers[current] === opt
                    ? "bg-[#bd5e2b] text-white"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleSkip}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
          >
            Skip
          </button>
          {current === questions.length - 1 && (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded text-white"
              style={{ backgroundColor: "#bd5e2b" }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
