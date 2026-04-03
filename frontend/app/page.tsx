import Link from "next/link";
import Image from "next/image";
import {
  Zap, Brain, Video, Activity, Users, Shield, ArrowRight,
  Target, BarChart3, Sparkles, ChevronRight
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "GPT-Powered AI Advisor",
    description: "Ask complex questions about biomechanics, strategy, and performance — backed by a domain-specific knowledge base and GPT intelligence.",
  },
  {
    icon: Video,
    title: "Video Biomechanics Engine",
    description: "Upload raw sports footage and receive instant AI-generated form analysis with actionable coaching cues.",
  },
  {
    icon: Activity,
    title: "Real-Time Athlete Monitoring",
    description: "Track daily wellness, readiness, sleep quality, and recovery metrics to optimize training loads.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Historical trend analysis, performance indexing, and AI-generated progress reports for every athlete.",
  },
  {
    icon: Users,
    title: "Team & Squad Management",
    description: "Manage rosters, scouting pipelines, and tournament brackets in one unified platform.",
  },
  {
    icon: Shield,
    title: "Injury Prevention AI",
    description: "Predictive models that flag injury risk based on training load, wellness, and biomechanical patterns.",
  },
];

const portals = [
  {
    title: "Athlete Portal",
    description: "Built for individual optimization and daily performance tracking.",
    features: [
      "Track readiness & sleep quality",
      "Receive AI generated analyses",
      "Upload wearable CSV data",
      "View automated training history"
    ],
    icon: Target,
  },
  {
    title: "Coach Portal",
    description: "Command center for managing drills, videos, and tactical strategy.",
    features: [
      "Access GPT Sports Advisor",
      "Upload & run Video Biomechanics",
      "Manage comprehensive Drill Library",
      "Review squad-level health"
    ],
    icon: Brain,
  },
  {
    title: "Management Portal",
    description: "High-level overview logic for directors and talent scouts.",
    features: [
      "Department budget & retention",
      "Grassroot pipeline tracking",
      "Tournament match configurations",
      "Roster depth generation AI"
    ],
    icon: BarChart3,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-surface-800/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-neon-green flex items-center justify-center glow-green-subtle">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-wider">SPORT<span className="neon-text">MIND</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-surface-400 hover:text-brand-400 transition-colors">Features</a>
            <a href="#portals" className="text-sm text-surface-400 hover:text-brand-400 transition-colors">Portals</a>
            <Link href="/pricing" className="text-sm text-surface-400 hover:text-brand-400 transition-colors">Pricing</Link>
            <Link href="/auth/login" className="btn-secondary text-sm !py-2 !px-4">Sign In</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section with Stadium Image */}
      <section className="relative pt-24 pb-0 overflow-hidden">
        {/* Stadium Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-stadium.png"
            alt="Sports stadium with green illumination"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-40 z-[1]" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center px-6 pt-20 pb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-medium text-brand-300">Powered by GPT Intelligence</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight animate-slide-up">
            <span className="text-white">The Future of</span><br />
            <span className="gradient-text animate-glow-pulse">Sports Intelligence</span>
          </h1>
          <p className="text-lg sm:text-xl text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "0.15s" }}>
            AI-driven coaching, video biomechanics analysis, and athlete management — unified in a single, 
            next-generation platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Link href="/coach/dashboard" className="btn-primary inline-flex items-center justify-center gap-2 text-base">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/pricing" className="btn-secondary inline-flex items-center justify-center gap-2 text-base">
              View Pricing
            </Link>
          </div>
        </div>

        {/* Green Glow Orbs */}
        <div className="absolute top-32 left-10 w-72 h-72 bg-brand-500/15 rounded-full blur-[120px] animate-float z-0" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-green/8 rounded-full blur-[150px] animate-float z-0" style={{ animationDelay: "3s" }} />
      </section>

      {/* Athlete Silhouette Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 field-gradient z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                <span className="text-white">AI That Understands</span><br />
                <span className="gradient-text">Every Movement</span>
              </h2>
              <p className="text-surface-400 leading-relaxed mb-8">
                SportMind uses GPT-powered intelligence combined with computer vision to analyze 
                biomechanics, predict injury risk, and generate personalized training recommendations 
                in real time.
              </p>
              <div className="space-y-4">
                {["Biomechanical analysis with sub-degree accuracy", "GPT-powered training recommendations", "Real-time performance indexing"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(0,255,136,0.5)]" />
                    <span className="text-surface-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-surface-800/30 glow-green-subtle">
                <Image
                  src="/athlete-silhouette.png"
                  alt="AI-powered athlete motion analysis"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features — with tech pattern background */}
      <section id="features" className="relative py-20 px-6">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/tech-pattern.png"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-white">Everything You Need to </span>
              <span className="gradient-text">Win</span>
            </h2>
            <p className="text-surface-400 max-w-xl mx-auto">
              From individual athlete tracking to organization-wide analytics, SportMind covers every layer of sports performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card-hover p-6 group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center mb-4 group-hover:glow-green-subtle transition-all duration-300">
                    <Icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-surface-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portals */}
      <section id="portals" className="py-20 px-6 mesh-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-white">Choose Your </span>
              <span className="gradient-text">Portal</span>
            </h2>
            <p className="text-surface-400 max-w-xl mx-auto">
              Different roles, different needs — one platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portals.map((portal) => {
              const Icon = portal.icon;
              return (
                <div
                  key={portal.title}
                  className="group glass-card p-8 hover:border-brand-500/30 transition-all duration-300 relative overflow-hidden flex flex-col"
                >
                  {/* Subtle scan effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent" />
                  </div>

                  <div className="relative z-10 flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:glow-green-subtle transition-all duration-300 border border-brand-500/20">
                      <Icon className="w-7 h-7 text-brand-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{portal.title}</h3>
                    <p className="text-surface-400 text-sm leading-relaxed mb-6">{portal.description}</p>
                    
                    <ul className="space-y-3">
                      {portal.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-surface-300">
                          <Sparkles className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-800/30 py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-neon-green flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="font-display font-bold text-white tracking-wider">SPORT<span className="text-brand-400">MIND</span></span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-sm text-surface-400 hover:text-brand-400 transition-colors">Pricing</Link>
            <Link href="/auth/login" className="text-sm text-surface-400 hover:text-brand-400 transition-colors">Sign In</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-surface-800/50 pt-6 text-center">
          <p className="text-sm text-surface-500 max-w-2xl mx-auto leading-relaxed">
            Developed by <span className="text-brand-400 font-medium">Dr. Rajesh Kumar K V</span>, <br />
            Sports Data Scientist & AI Architect - AI Research Centre, Hyderabad.
          </p>
          <p className="text-xs text-surface-600 mt-4">&copy; 2026 SportMind AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
