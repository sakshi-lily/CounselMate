import React from "react";
import { Mail, MessageCircle, FileText } from "lucide-react";

export default function Help() {
  const faqs = [
    {
      question: "How do I update my profile?",
      answer: "You can update your profile by navigating to the Profile section in the menu. Only your education level and relevant academic details can be updated."
    },
    {
      question: "Can I retake the Aptitude Test?",
      answer: "Currently, you can take the aptitude test once to receive your initial career guidance. Re-evaluations will be coming in a future update."
    },
    {
      question: "How does the career matchmaking work?",
      answer: "We use a combination of your educational background, aptitude test score, and personal interests to suggest the most relevant career paths and college degrees."
    }
  ];

  return (
    <div className="w-full text-white pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            How Can We <span className="text-[#bd5e2b]">Help</span>?
          </h1>
          <p className="text-gray-400 text-lg">
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg flex items-start space-x-4 border border-gray-800">
            <Mail className="text-[#bd5e2b] flex-shrink-0" size={28} />
            <div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-gray-400 mb-3">Send us an email and we'll get back to you within 24 hours.</p>
              <a href="mailto:support@counselmate.com" className="text-[#1e90ff] hover:underline transition">support@counselmate.com</a>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg flex items-start space-x-4 border border-gray-800">
            <MessageCircle className="text-[#bd5e2b] flex-shrink-0" size={28} />
            <div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-400 mb-3">Chat directly with our team or community members.</p>
              <button disabled className="text-[#1e90ff] opacity-50 cursor-not-allowed">Coming Soon</button>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
            <FileText className="text-[#bd5e2b]" size={28} />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                <h4 className="text-lg font-semibold mb-2 text-white">{faq.question}</h4>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
