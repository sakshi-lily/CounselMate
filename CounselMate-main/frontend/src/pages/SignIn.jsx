// pages/SignIn.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const serverURL = "http://localhost:5000"; // backend URL

export default function SignIn() {
  const navigate = useNavigate();
  const { loginContext } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSubmitting = React.useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting.current) return;
    
    setError("");
    setLoading(true);
    isSubmitting.current = true;

    try {
      const res = await axios.post(
        `${serverURL}/api/auth/login`,
        { email, password },
        { withCredentials: true } // ensures cookies sent if using session
      );

      console.log("Login successful:", res.data);
      loginContext(res.data.user);
      
      // Redirect to dashboard or profile page
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
      isSubmitting.current = false;
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen px-4 pt-28 bg-transparent text-[#f8fafc] font-body">
      <div className="w-full max-w-md glass-card p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
        
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400 mb-6 text-center font-headline">
          Sign In
        </h2>

        {error && (
          <p className="text-red-400 text-center mb-4 font-semibold">{error}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-outline-variant/30 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-600"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-outline-variant/30 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-600"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-primary text-on-primary font-bold hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/20 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-on-surface-variant">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
