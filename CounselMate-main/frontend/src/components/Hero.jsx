// components/Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <header
      id="home"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Spline background */}
      <iframe
        src="https://my.spline.design/rollingrectangles-0Fb36sdUKNxi1CUYVsjzUjMw/"
        frameBorder="0"
        className="absolute top-0 left-0 w-full h-full"
        allow="fullscreen"
      ></iframe>

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight font-headline">
          <span className="block text-white">Unlock Your Career</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">
            Potential with CounselMate
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-on-surface-variant max-w-2xl">
          Discover the right path, build your future roadmap, and get
          motivated to achieve success.
        </p>

        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <button 
            onClick={() => navigate('/start-journey')}
            className="px-6 py-3 bg-primary text-on-primary rounded-full font-bold hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/20 transition duration-300"
          >
            Start Journey with CounselMate
          </button>
          <button 
            onClick={() => navigate('/learn-more')}
            className="px-6 py-3 border border-white/20 text-white rounded-full font-bold hover:bg-primary hover:text-on-primary hover:border-transparent transition duration-300"
          >
            Learn More about CounselMate
          </button>
        </div>
      </div>
    </header>
  );
}
