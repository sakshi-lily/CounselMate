import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StartJourney() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    interests: '',
    goals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call and redirect
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#bd5e2b] rounded-full blur-[150px] opacity-30"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-[#bd5e2b] rounded-full blur-[180px] opacity-20"></div>

      <div className="max-w-3xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10 animate-fade-in-up">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Begin Your <span className="text-[#bd5e2b] drop-shadow-lg">CounselMate</span> Journey
          </h1>
          <p className="text-[#ffffffcc] text-lg max-w-xl mx-auto">
            Let's understand your aspirations to tailor the perfect career path and mentorship roadmap for you.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-10 relative px-4">
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-white/10 rounded-full z-0"></div>
          <div 
            className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#bd5e2b] to-[#e87a3e] rounded-full z-0 transition-all duration-700 ease-in-out"
            style={{ width: `calc(${((step - 1) / 2) * 100}% - ${step === 1 ? 0 : 3}rem)` }}
          ></div>
          
          {[1, 2, 3].map((num) => (
            <div 
              key={num} 
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg relative z-10 transition-all duration-500 ${
                step >= num 
                  ? 'bg-gradient-to-br from-[#bd5e2b] to-[#e87a3e] text-white shadow-[0_0_20px_rgba(189,94,43,0.6)] scale-110' 
                  : 'bg-black/50 text-gray-500 border-2 border-white/10'
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 min-h-[300px] flex flex-col justify-between">
          <div className="space-y-6 flex-1 transition-all duration-300">
            {step === 1 && (
              <div className="space-y-5 animate-slide-in-right">
                <h2 className="text-2xl font-bold mb-4 text-white/90">Personal Details</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#bd5e2b] focus:border-transparent transition-all placeholder:text-gray-600 shadow-inner"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Current Education / Role</label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#bd5e2b] focus:border-transparent transition-all placeholder:text-gray-600 shadow-inner"
                    placeholder="e.g. B.Tech Computer Science, High School Student"
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 animate-slide-in-right">
                <h2 className="text-2xl font-bold mb-4 text-white/90">Your Interests</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Key Areas of Interest</label>
                  <textarea
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    rows="5"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#bd5e2b] focus:border-transparent transition-all placeholder:text-gray-600 shadow-inner resize-none"
                    placeholder="Tell us what subjects or career paths excite you (e.g., Artificial Intelligence, Graphic Design, Medicine...)"
                    required
                  ></textarea>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-slide-in-right">
                <h2 className="text-2xl font-bold mb-4 text-white/90">Future Aspirations</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Career Goals</label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    rows="5"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#bd5e2b] focus:border-transparent transition-all placeholder:text-gray-600 shadow-inner resize-none"
                    placeholder="Where do you see yourself in 3-5 years? What are your ultimate career related goals?"
                    required
                  ></textarea>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-8 border-t border-white/10 mt-6">
            <button
              type="button"
              onClick={handlePrev}
              className={`px-6 py-3 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 ${
                step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={step === 1 ? (!formData.name || !formData.education) : !formData.interests}
                className="px-8 py-3 bg-[#bd5e2b] text-white rounded-full font-semibold hover:bg-[#a04e25] hover:shadow-[0_0_25px_rgba(189,94,43,0.5)] transition-all duration-300 disabled:opacity-40 disabled:hover:shadow-none disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={!formData.goals || isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-[#bd5e2b] to-[#e87a3e] text-white rounded-full font-bold hover:shadow-[0_0_30px_rgba(189,94,43,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit & Begin'
                  )}
                </span>
              </button>
            )}
          </div>
        </form>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.4s ease-out forwards;
        }
      `}} />
    </div>
  );
}
