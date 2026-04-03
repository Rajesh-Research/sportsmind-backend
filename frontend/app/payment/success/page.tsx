import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-black mesh-bg flex items-center justify-center px-6">
      <div className="text-center max-w-md animate-fade-in glass-card p-10 border border-brand-500/30 glow-green-subtle relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 w-20 h-20 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mx-auto mb-6 glow-green">
          <CheckCircle className="w-10 h-10 text-brand-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-3">Payment Successful!</h1>
        <p className="text-surface-400 mb-8 leading-relaxed">
          Your subscription is now active. You have full access to all structured SportMind AI features.
        </p>
        
        <Link href="/coach/dashboard" className="btn-primary w-full flex items-center justify-center gap-2">
          Go to Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
