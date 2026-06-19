import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Check, LockKeyhole, Mail, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/auth/login', { email, password });
      login(response.data.token, response.data.user);
      toast.success(`Welcome back, ${response.data.user.name}!`);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
      toast.error('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden lg:block">
          <div className="mb-8 flex items-center gap-4">
            <div className="brand-mark flex h-14 w-14 items-center justify-center rounded-xl text-[#92400e]">
              <Check size={30} strokeWidth={2.8} />
            </div>
            <div>
              <h1 className="font-serif text-5xl leading-none text-[#1c1917]">Tascova</h1>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.28em] text-[#92400e]">Your tasks, elevated</p>
            </div>
          </div>

          <div className="paper-panel relative overflow-hidden rounded-[1.5rem] p-8">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-[#c46205]/20" />
            <div className="relative">
              <Sparkles className="mb-8 text-[#d97706]" size={34} />
              <p className="max-w-xl font-serif text-4xl leading-tight text-[#1c1917]">
                Simple, focused, and personal enough to make your day feel intentional.
              </p>
              <div className="mt-8 grid gap-3">
                {['Stay organized', 'Focus better', 'Keep momentum visible'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-stone-300/60 bg-white/55 p-3 text-sm font-semibold text-stone-700">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff7ed] text-[#92400e]">
                      <Check size={16} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="paper-panel w-full rounded-[1.5rem] p-6 sm:p-10">
          <div className="mb-8">
            <div className="brand-mark mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-[#92400e] lg:hidden">
              <Check size={26} strokeWidth={2.8} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#92400e]">Welcome back</p>
            <h2 className="mt-2 font-serif text-4xl text-[#1c1917]">Sign in</h2>
            <p className="mt-2 text-sm text-stone-500">Return to your workspace and pick up the next clear task.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Email address</label>
              <div className="relative">
                <Mail size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field h-12 w-full rounded-xl pl-10 pr-3 text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Password</label>
              <div className="relative">
                <LockKeyhole size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field h-12 w-full rounded-xl pl-10 pr-3 text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-[#B91C1C]">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="copper-button flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#78716C]">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-[#D97706] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
