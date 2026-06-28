// src/pages/SignUp.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const serverURL = "http://localhost:5000"; // replace with your backend URL

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSubmitting = React.useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting.current) return;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      isSubmitting.current = true;
      const res = await axios.post(
        `${serverURL}/api/auth/signup`,
        { username, email, password },
        { withCredentials: true }
      );
      console.log("Signup successful:", res.data);
      setError("");
      navigate("/signin"); // redirect after signup
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
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
          Sign Up
        </h2>

        {error && (
          <p className="text-red-400 text-center mb-4 font-semibold">{error}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Full Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-outline-variant/30 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-outline-variant/30 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-outline-variant/30 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-outline-variant/30 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-primary text-on-primary font-bold hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/20 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-on-surface-variant">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary hover:underline font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
