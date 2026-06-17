import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setFormError(err.message || 'Login failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090d16] text-white relative overflow-hidden px-4">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-brandIndigo/20 blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brandViolet/15 blur-[120px] animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brandBlue/10 blur-[150px]"></div>

      {/* Main Glass Panel Card */}
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl shadow-2xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-brandIndigo to-brandViolet flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4">
            <GraduationCap size={28} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Welcome Back</h2>
          <p className="text-sm text-gray-400 mt-2">Sign in to continue your learning journey</p>
        </div>

        {/* Error Notification */}
        {formError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm font-medium text-center">
            {formError}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <Mail size={18} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo text-gray-100 placeholder-gray-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <Lock size={18} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo text-gray-100 placeholder-gray-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full glow-btn flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brandIndigo via-brandViolet to-brandBlue text-white font-bold hover:shadow-lg hover:shadow-indigo-500/20 transition-all cursor-pointer"
          >
            {submitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer Redirect */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-brandIndigo hover:text-indigo-400 transition-colors">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
