import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, User, ArrowRight, Loader2, BookOpen, UserCheck } from 'lucide-react';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // 'student' | 'teacher'
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!name || !email || !password || !role) {
      setFormError('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err) {
      setFormError(err.message || 'Registration failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090d16] text-white relative overflow-hidden px-4 py-10">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-brandIndigo/20 blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brandViolet/15 blur-[120px] animate-pulse-slow"></div>

      {/* Main Glass Panel Card */}
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl shadow-2xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-brandIndigo to-brandViolet flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4">
            <GraduationCap size={28} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Create Account</h2>
          <p className="text-sm text-gray-400 mt-2">Join SmartLearn and start learning</p>
        </div>

        {/* Error Notification */}
        {formError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm font-medium text-center">
            {formError}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Custom Select Cards */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">Join As</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  role === 'student'
                    ? 'border-brandIndigo bg-brandIndigo/10 text-white shadow-lg shadow-indigo-500/15'
                    : 'border-gray-800 bg-gray-900/30 text-gray-400 hover:border-gray-700'
                }`}
              >
                <BookOpen size={20} className="mb-1 text-brandIndigo" />
                <span className="text-sm font-semibold text-xs">Student</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  role === 'teacher'
                    ? 'border-brandViolet bg-brandViolet/10 text-white shadow-lg shadow-violet-500/15'
                    : 'border-gray-800 bg-gray-900/30 text-gray-400 hover:border-gray-700'
                }`}
              >
                <UserCheck size={20} className="mb-1 text-brandViolet" />
                <span className="text-sm font-semibold text-xs">Teacher</span>
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <User size={18} />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo text-gray-100 placeholder-gray-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">Email Address</label>
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo text-gray-100 placeholder-gray-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">Password</label>
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo text-gray-100 placeholder-gray-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full glow-btn flex items-center justify-center gap-2 py-3 px-4 mt-2 rounded-xl bg-gradient-to-r from-brandIndigo via-brandViolet to-brandBlue text-white font-bold hover:shadow-lg hover:shadow-indigo-500/20 transition-all cursor-pointer"
          >
            {submitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer Redirect */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brandIndigo hover:text-indigo-400 transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
