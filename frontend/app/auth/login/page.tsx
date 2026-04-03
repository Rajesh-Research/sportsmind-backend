"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/pricing"; // Route to subscription pricing selection after login
  };

  return (
    <div className="min-h-screen bg-black mesh-bg flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-neon-green flex items-center justify-center glow-green-subtle">
              <Zap className="w-6 h-6 text-black" />
            </div>
            <span className="font-display font-bold text-2xl text-white tracking-wider">SPORT<span className="neon-text">MIND</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-surface-500">Sign in to access your sports intelligence dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-8 space-y-5">
          <div>
            <label className="text-xs font-medium text-surface-400 mb-1.5 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-600" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field !pl-10" placeholder="you@team.com" required />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-surface-400 mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-600" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field !pl-10" placeholder="••••••••" required />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-surface-500 cursor-pointer">
              <input type="checkbox" className="rounded border-surface-700 accent-brand-500" /> Remember me
            </label>
            <a href="#" className="text-brand-400 hover:text-brand-300 transition-colors">Forgot password?</a>
          </div>
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-sm text-surface-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-brand-400 hover:text-brand-300 transition-colors font-medium">Sign up free</Link>
        </p>
      </div>
    </div>
  );
}
