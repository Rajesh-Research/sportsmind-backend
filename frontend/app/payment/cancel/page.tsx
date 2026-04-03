import Link from "next/link";
import { XCircle, ArrowRight } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-black mesh-bg flex items-center justify-center px-6">
      <div className="text-center max-w-md animate-fade-in glass-card p-10 border border-rose-500/30 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-rose-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-3">Payment Cancelled</h1>
        <p className="text-surface-400 mb-8 leading-relaxed">
          Your payment was not processed. No charges were made. You can try again or choose a different plan to continue.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
          <Link href="/pricing" className="btn-primary !bg-rose-600 hover:!bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)] inline-flex items-center justify-center gap-2">
            View Plans <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/" className="btn-secondary inline-flex items-center justify-center gap-2">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
