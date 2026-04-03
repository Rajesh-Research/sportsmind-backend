"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Lock, User, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("athlete");
  const [sport, setSport] = useState("General");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = role === "athlete" ? "/athlete/dashboard" : role === "coach" ? "/coach/dashboard" : "/management/dashboard";
  };

  return (
    <div className="min-h-screen bg-black mesh-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-neon-green flex items-center justify-center glow-green-subtle">
              <Zap className="w-6 h-6 text-black" />
            </div>
            <span className="font-display font-bold text-2xl text-white tracking-wider">SPORT<span className="neon-text">MIND</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-surface-500">Start your journey with AI-powered sports intelligence.</p>
        </div>

        <form onSubmit={handleRegister} className="glass-card p-8 space-y-5">
          <div>
            <label className="text-xs font-medium text-surface-400 mb-1.5 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-600" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field !pl-10" placeholder="Alex Rivera" required />
            </div>
          </div>
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
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field !pl-10" placeholder="Min 8 characters" required />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-surface-400 mb-2 block">Select your Sport</label>
            <select 
              value={sport} 
              onChange={(e) => setSport(e.target.value)}
              className="input-field w-full appearance-none bg-surface-900/60"
            >
              <option value="General">General / Other</option>
              <option value="Football">Football / Soccer</option>
              <option value="Basketball">Basketball</option>
              <option value="Cricket">Cricket</option>
              <option value="Swimming">Swimming</option>
              <option value="Track & Field">Track & Field / Running</option>
              <option value="Gymnastics">Olympics - Gymnastics</option>
              <option value="Tennis">Tennis</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-surface-400 mb-2 block">I am a...</label>
            <div className="grid grid-cols-3 gap-3">
              {[{ value: "athlete", label: "Athlete" }, { value: "coach", label: "Coach" }, { value: "management", label: "Manager" }].map((r) => (
                <button key={r.value} type="button" onClick={() => setRole(r.value)}
                  className={`py-3 rounded-xl text-sm font-medium transition-all ${role === r.value ? "bg-brand-600 text-white shadow-[0_0_15px_rgba(0,255,136,0.15)]" : "bg-surface-900/60 text-surface-400 hover:text-white hover:bg-surface-800 border border-surface-800/30"}`}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            Create Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-sm text-surface-500 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-brand-400 hover:text-brand-300 transition-colors font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
