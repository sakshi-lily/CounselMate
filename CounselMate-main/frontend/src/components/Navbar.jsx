// components/Navbar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoutContext } = useContext(AuthContext);

  const handleLogout = async () => {
    await logoutContext();
    navigate("/");
  };

  const handleScrollOrNavigate = (sectionId) => {
    if (location.pathname === "/") {
      // Already on homepage: scroll directly
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to homepage and scroll to section
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-surface/30 border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleScrollOrNavigate("home")}>
          <img src="/logo.png" alt="CounselMate Logo" className="w-12 h-12 object-contain" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent font-headline">CounselMate</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-10 font-medium text-on-surface-variant text-lg">
          <button onClick={() => handleScrollOrNavigate("home")} className="hover:text-primary transition duration-300">
            Home
          </button>
          <button onClick={() => handleScrollOrNavigate("impact")} className="hover:text-primary transition duration-300">
            Impact
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <button className="px-5 py-2 rounded-full border border-white/20 text-white hover:bg-primary hover:text-on-primary hover:border-transparent transition duration-300">
                  Dashboard
                </button>
              </Link>
              <button 
                onClick={handleLogout}
                className="px-5 py-2 rounded-full bg-red-600/90 text-white font-semibold hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <button className="px-5 py-2 rounded-full border border-white/20 text-white hover:bg-primary hover:text-on-primary hover:border-transparent transition duration-300">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-5 py-2 rounded-full bg-primary text-on-primary font-bold hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/20 transition duration-300">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
