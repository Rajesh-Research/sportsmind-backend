import Link from "next/link";
import { Zap, Check, ArrowRight, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: 0,
    period: "Free forever",
    description: "Perfect for individual athletes getting started.",
    features: ["1 athlete profile", "Basic performance tracking", "3 AI advisor queries/day", "Daily check-in forms", "7-day history"],
    cta: "Select Free Plan",
    highlighted: false,
  },
  {
    name: "Pro",
    price: 29,
    period: "/month",
    description: "For coaches and small teams who want full AI capabilities.",
    features: ["Up to 15 athletes", "Unlimited GPT advisor queries", "Video biomechanics analysis (10/mo)", "Full drill library", "90-day history & trends", "Performance reports", "Priority support"],
    cta: "Select Pro Plan",
    highlighted: true,
  },
  {
    name: "Max",
    price: 99,
    period: "/month",
    description: "For organizations and R & D departments running at scale.",
    features: ["Unlimited athletes", "Unlimited GPT advisor queries", "Unlimited video analysis", "Full drill library + custom drills", "Unlimited history & analytics", "Unlimited R&D Research uploading", "Team management & scouting", "Tournament management", "Custom integrations & API", "Dedicated support manager"],
    cta: "Select Max Plan",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black mesh-bg">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-surface-800/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-neon-green flex items-center justify-center glow-green-subtle">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-wider">SPORT<span className="neon-text">MIND</span></span>
          </Link>
          <Link href="/auth/login" className="btn-secondary text-sm !py-2 !px-4">Sign In</Link>
        </div>
      </header>

      <section className="pt-32 pb-12 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span className="text-sm font-medium text-brand-300">Simple, transparent pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Choose your <span className="gradient-text">plan</span>
        </h1>
        <p className="text-lg text-surface-500 max-w-xl mx-auto">
          From individual athletes to professional organizations — we have a plan that fits.
        </p>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier) => (
            <div key={tier.name} className={`glass-card p-8 relative ${tier.highlighted ? "border-brand-500/40 scale-[1.02] glow-green-subtle" : ""}`}>
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-brand-600 to-neon-green text-xs font-bold text-black">Most Popular</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
              <p className="text-sm text-surface-500 mb-6">{tier.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white font-display">{tier.price === 0 ? "Free" : `$${tier.price}`}</span>
                {tier.price > 0 && <span className="text-surface-500 text-sm">{tier.period}</span>}
              </div>
              <Link href="/athlete/dashboard" className={`w-full flex items-center justify-center gap-2 text-sm py-3 rounded-xl font-semibold transition-all ${tier.highlighted ? "btn-primary" : "btn-secondary"}`}>
                {tier.cta} <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="mt-8 space-y-3">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                    <span className="text-surface-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-surface-800/30 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-surface-600">&copy; 2026 SportMind AI. All rights reserved.</div>
      </footer>
    </div>
  );
}
