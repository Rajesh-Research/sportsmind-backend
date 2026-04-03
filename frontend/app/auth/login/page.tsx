"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isForgotPasswordMode) return handleForgotPassword(e);

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          setError("Incorrect password or account not found.");
        } else {
          setError("An error occurred during login. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);

      router.push("/pricing");
    } catch (err) {
      setError("Network error. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setForgotPasswordSuccess("");

    if (!email) {
      setError("Please enter your email address to reset password.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setError("Failed to process request. Please try again.");
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      setForgotPasswordSuccess(data.message || "Recovery email sent successfully.");
      setIsLoading(false);
    } catch (err) {
      setError("Network error. Please try again later.");
      setIsLoading(false);
    }
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
          <h1 className="text-2xl font-bold text-white mb-2">
            {isForgotPasswordMode ? "Reset Password" : "Welcome back"}
          </h1>
          <p className="text-surface-500">
            {isForgotPasswordMode 
              ? "Enter your email to receive recovery instructions."
              : "Sign in to access your sports intelligence dashboard."}
          </p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {forgotPasswordSuccess && (
            <div className="bg-brand-500/10 border border-brand-500/30 text-brand-400 p-3 rounded-lg text-sm flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{forgotPasswordSuccess}</p>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-surface-400 mb-1.5 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-600" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="input-field !pl-10" 
                placeholder="you@team.com" 
                required 
              />
            </div>
          </div>

          {!isForgotPasswordMode && (
            <div>
              <label className="text-xs font-medium text-surface-400 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-600" />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="input-field !pl-10" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            {!isForgotPasswordMode ? (
              <>
                <label className="flex items-center gap-2 text-surface-500 cursor-pointer">
                  <input type="checkbox" className="rounded border-surface-700 accent-brand-500" /> Remember me
                </label>
                <button 
                  type="button" 
                  onClick={() => {
                    setIsForgotPasswordMode(true);
                    setError("");
                    setForgotPasswordSuccess("");
                  }} 
                  className="text-brand-400 hover:text-brand-300 transition-colors"
                >
                  Forgot password?
                </button>
              </>
            ) : (
              <button 
                type="button" 
                onClick={() => {
                  setIsForgotPasswordMode(false);
                  setError("");
                  setForgotPasswordSuccess("");
                }} 
                className="text-surface-400 hover:text-white transition-colors"
              >
                Back to Sign in
              </button>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {isForgotPasswordMode ? "Send Recovery Email" : "Sign In"} <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-surface-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-brand-400 hover:text-brand-300 transition-colors font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
