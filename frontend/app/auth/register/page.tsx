"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, User, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("athlete");
  const [sport, setSport] = useState("General");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          full_name: name,
          role: role,
          primary_sport: sport
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.detail || "Registration failed. Please try again.");
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);

      window.location.href = role === "athlete" ? "/athlete/dashboard" : role === "coach" ? "/coach/dashboard" : "/management/dashboard";
    } catch (err) {
      setError("Network error. Please try again later.");
      setIsLoading(false);
    }
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
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

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
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field !pl-10" placeholder="Min 8 characters" required minLength={8} />
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
          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>Create Account <ArrowRight className="w-4 h-4" /></>
            )}
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
