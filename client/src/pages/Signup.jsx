import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/auth/register', { name, email, password });
      login(response.data.token, response.data.user);
      toast.success(`Account created! Welcome, ${response.data.user.name}!`);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
      toast.error('Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px] bg-white border border-[#E0D9CF] rounded-xl p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#1C1917] m-0">Tascova</h1>
          <p className="text-xs text-stone-400 font-medium tracking-wide mt-1">Your tasks, elevated.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#78716C] tracking-wider mb-2">FULL NAME</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-[#D6CFC6] rounded-lg text-sm text-[#1C1917] focus:border-[#D97706] outline-none transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#78716C] tracking-wider mb-2">EMAIL ADDRESS</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-[#D6CFC6] rounded-lg text-sm text-[#1C1917] focus:border-[#D97706] outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#78716C] tracking-wider mb-2">PASSWORD</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-[#D6CFC6] rounded-lg text-sm text-[#1C1917] focus:border-[#D97706] outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#78716C] tracking-wider mb-2">CONFIRM PASSWORD</label>
            <input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-[#D6CFC6] rounded-lg text-sm text-[#1C1917] focus:border-[#D97706] outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-xs font-medium text-[#B91C1C]">{error}</p>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-[#D97706] text-white rounded-lg text-sm font-medium hover:bg-[#B45309] transition-colors flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="text-center text-xs text-[#78716C] mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#D97706] hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
