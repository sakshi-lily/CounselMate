// App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ImpactSection from "./components/ImpactSection";
import HelpSection from "./components/HelpSection";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const scrollToId = location.state?.scrollTo;
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // slight delay ensures DOM is loaded
      }
    }
  }, [location]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ImpactSection />
              <HelpSection />
            </>
          }
        />
        <Route path="/signin" element={user ? <Navigate to="/dashboard" /> : <SignIn />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignUp />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/signin" />} />
      </Routes>
    </div>
  );
}
