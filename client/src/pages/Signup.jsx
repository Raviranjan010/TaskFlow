import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Check, LockKeyhole, Mail, Sparkles, UserRound } from 'lucide-react';
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
    <div className="app-shell min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="paper-panel w-full rounded-[1.5rem] p-6 sm:p-10">
          <div className="mb-8">
            <div className="brand-mark mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-[#92400e] lg:hidden">
              <Check size={26} strokeWidth={2.8} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#92400e]">Start fresh</p>
            <h1 className="mt-2 font-serif text-4xl text-[#1c1917]">Create account</h1>
            <p className="mt-2 text-sm text-stone-500">Build a workspace that keeps your plans clear and close.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Full name</label>
              <div className="relative">
                <UserRound size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field h-12 w-full rounded-xl pl-10 pr-3 text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

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

            <div className="grid gap-4 sm:grid-cols-2">
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

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Confirm</label>
                <div className="relative">
                  <LockKeyhole size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field h-12 w-full rounded-xl pl-10 pr-3 text-sm"
                    placeholder="Repeat"
                  />
                </div>
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
                'Create Account'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#78716C]">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#D97706] hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <section className="hidden lg:block">
          <div className="mb-8 flex items-center gap-4">
            <div className="brand-mark flex h-14 w-14 items-center justify-center rounded-xl text-[#92400e]">
              <Check size={30} strokeWidth={2.8} />
            </div>
            <div>
              <h2 className="font-serif text-5xl leading-none text-[#1c1917]">Tascova</h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.28em] text-[#92400e]">Plan with clarity</p>
            </div>
          </div>

          <div className="ink-panel overflow-hidden rounded-[1.5rem] p-8 text-[#fffaf2]">
            <Sparkles className="mb-8 text-[#fef3c7]" size={34} />
            <p className="max-w-xl font-serif text-4xl leading-tight">
              Your private task studio, shaped for small wins and quiet momentum.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {['Clarity', 'Rhythm', 'Focus'].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center text-sm font-semibold text-stone-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;
