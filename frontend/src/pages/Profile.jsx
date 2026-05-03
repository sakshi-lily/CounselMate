// src/pages/Profile.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Calendar, Phone, GraduationCap, BookOpen, Save, CheckCircle, AlertCircle, Camera } from 'lucide-react';

export default function Profile({ userProfile, onProfileUpdate }) {
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    age: userProfile?.age || '',
    phone: userProfile?.phone || '',
    email: userProfile?.email || '',
    education: userProfile?.education || '',
    stream: userProfile?.stream || '',
    profilePic: userProfile?.profilePic || '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setMessage({ type: 'error', text: 'Image size must be less than 2MB.' });
        // Clear message after 3 seconds
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/profile",
        formData,
        { withCredentials: true }
      );
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      if (onProfileUpdate) {
        onProfileUpdate(res.data.profile);
      }
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
       setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animation-fade-in relative z-10 w-full">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 rounded-3xl opacity-50 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#bd5e2b] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#332670] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/50 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10 pb-8 border-b border-gray-800">
          <div className="relative group">
            <input 
              type="file" 
              id="photo-upload" 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              className="hidden" 
            />
            <label htmlFor="photo-upload" className="block cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#bd5e2b] to-[#51369a] flex items-center justify-center p-1 shadow-lg shadow-[#bd5e2b]/20 transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center overflow-hidden relative">
                  {formData.profilePic ? (
                    <img src={formData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      {formData.name ? formData.name.charAt(0).toUpperCase() : <User size={40} className="text-gray-400" />}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 bg-[#bd5e2b] w-8 h-8 rounded-full border-4 border-gray-900 flex items-center justify-center transform translate-x-2 translate-y-2 z-10">
                <div className="w-2 h-2 bg-white rounded-full animate-ping absolute"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </label>
          </div>
          
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-2">
              Your Profile
            </h2>
            <p className="text-gray-400 font-medium">Manage your personal information and education details.</p>
          </div>
        </div>

        {/* Success/Error Message */}
        {message.text && (
          <div className={`flex items-center gap-3 p-4 mb-8 rounded-xl font-medium animate-fadeIn
            ${message.type === 'error' 
              ? 'bg-red-900/30 text-red-400 border border-red-800/50 shadow-[0_0_15px_rgba(220,38,38,0.1)]' 
              : 'bg-green-900/30 text-green-400 border border-green-800/50 shadow-[0_0_15px_rgba(22,163,74,0.1)]'
            }`}
          >
            {message.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Full Name */}
            <div className="space-y-2 group">
              <label className="text-sm font-semibold text-gray-400 ml-1 transition-colors group-focus-within:text-[#bd5e2b]">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-500 group-focus-within:text-[#bd5e2b] transition-colors" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-[#bd5e2b] focus:ring-1 focus:ring-[#bd5e2b] transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2 group">
              <label className="text-sm font-semibold text-gray-400 ml-1 transition-colors group-focus-within:text-[#bd5e2b]">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-500 group-focus-within:text-[#bd5e2b] transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-[#bd5e2b] focus:ring-1 focus:ring-[#bd5e2b] transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Age */}
            <div className="space-y-2 group">
              <label className="text-sm font-semibold text-gray-400 ml-1 transition-colors group-focus-within:text-[#bd5e2b]">Age</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-500 group-focus-within:text-[#bd5e2b] transition-colors" />
                </div>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="18"
                  className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-[#bd5e2b] focus:ring-1 focus:ring-[#bd5e2b] transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2 group">
              <label className="text-sm font-semibold text-gray-400 ml-1 transition-colors group-focus-within:text-[#bd5e2b]">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-500 group-focus-within:text-[#bd5e2b] transition-colors" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-[#bd5e2b] focus:ring-1 focus:ring-[#bd5e2b] transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2 group md:col-span-2">
              <label className="text-sm font-semibold text-gray-400 ml-1 transition-colors group-focus-within:text-[#bd5e2b]">Education Level</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <GraduationCap size={18} className="text-gray-500 group-focus-within:text-[#bd5e2b] transition-colors" />
                </div>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-[#bd5e2b] focus:ring-1 focus:ring-[#bd5e2b] transition-all shadow-inner appearance-none"
                  required
                >
                  <option value="" className="bg-gray-800">Select Education</option>
                  <option value="10th" className="bg-gray-800">10th Grade</option>
                  <option value="12th" className="bg-gray-800">12th Grade</option>
                  <option value="Undergraduate" className="bg-gray-800">Undergraduate</option>
                  <option value="Graduate" className="bg-gray-800">Graduate</option>
                </select>
                {/* Custom select arrow overlay since appearance is none */}
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Stream */}
            {formData.education !== '10th' && (
              <div className="space-y-2 group md:col-span-2 animate-fadeIn">
                <label className="text-sm font-semibold text-gray-400 ml-1 transition-colors group-focus-within:text-[#bd5e2b]">Stream / Specialization</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BookOpen size={18} className="text-gray-500 group-focus-within:text-[#bd5e2b] transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="stream"
                    value={formData.stream}
                    onChange={handleChange}
                    placeholder="e.g. Science, Arts, Commerce, B.Tech"
                    className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-[#bd5e2b] focus:ring-1 focus:ring-[#bd5e2b] transition-all shadow-inner"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-800">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto sm:ml-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#bd5e2b] to-[#a44e22] hover:from-[#c96936] hover:to-[#bd5e2b] text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(189,94,43,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Save size={20} className={loading ? 'animate-pulse' : ''} />
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      
      {/* Required Custom CSS for animations if Tailwind defaults aren't enough */}
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
