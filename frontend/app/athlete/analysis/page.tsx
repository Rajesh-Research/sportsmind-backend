"use client";

import { useState } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import ProgressRing from "@/components/common/ProgressRing";
import { Brain, Sparkles } from "lucide-react";

const analysisModules = [
  {
    title: "Biomechanical Efficiency",
    score: 87,
    color: "#10b981",
    insights: [
      "Left hip drop during late-phase acceleration improved by 2.1°",
      "Ground contact time averaging 0.18s — above elite threshold",
      "Stride length consistency: 94% (excellent)",
    ],
  },
  {
    title: "Endurance Profile",
    score: 79,
    color: "#00ff88",
    insights: [
      "VO2 max estimated at 52.3 ml/kg/min",
      "Lactate threshold pace improved to 4:12/km",
      "Aerobic base showing steady improvement over 8 weeks",
    ],
  },
  {
    title: "Strength & Power",
    score: 91,
    color: "#34d399",
    insights: [
      "Vertical jump: 68cm (95th percentile for position)",
      "Rate of force development improved 8% since last test",
      "Asymmetry index: 3.2% (within healthy range)",
    ],
  },
  {
    title: "Injury Risk Assessment",
    score: 22,
    color: "#f43f5e",
    insights: [
      "Low overall risk — all key indicators in safe zones",
      "Monitor right hamstring: slight stiffness trend detected",
      "Recommended: additional hip mobility work 2x/week",
    ],
  },
];

export default function AthleteAnalysis() {
  const [selectedModule, setSelectedModule] = useState(0);
  const current = analysisModules[selectedModule];

  return (
    <DashboardLayout role="athlete">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Performance Analysis</h1>
        <p className="text-surface-500">AI-generated insights from your latest training data and assessments.</p>
      </div>

      {/* Overall Score */}
      <div className="glass-card p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ProgressRing value={84} max={100} size={160} strokeWidth={10} color="#00ff88" label="Overall Score" sublabel="Composite Performance Index" />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-3">Performance Summary</h2>
            <p className="text-surface-400 leading-relaxed mb-4">
              Your composite performance index has increased by 3.8% over the past 30 days.
              Strength & power metrics are at an all-time high, while endurance shows room for targeted improvement.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="badge badge-green">↑ 3.8% overall</span>
              <span className="badge badge-grey">8 sessions analyzed</span>
              <span className="badge badge-amber">2 focus areas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          {analysisModules.map((mod, i) => (
            <button
              key={mod.title}
              onClick={() => setSelectedModule(i)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                selectedModule === i
                  ? "glass-card border-brand-500/30 glow-green-subtle"
                  : "bg-surface-900/40 hover:bg-surface-900/60 border border-transparent"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">{mod.title}</span>
                <span className="text-lg font-bold font-display" style={{ color: mod.color }}>{mod.score}</span>
              </div>
              <div className="progress-bar mt-2">
                <div className="progress-bar-fill" style={{ width: `${mod.score}%`, backgroundColor: mod.color, boxShadow: `0 0 6px ${mod.color}44` }} />
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{current.title}</h3>
              <p className="text-xs text-surface-500">AI-generated analysis</p>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <ProgressRing value={current.score} max={100} size={100} strokeWidth={8} color={current.color} />
            <div>
              <p className="text-3xl font-bold text-white font-display">{current.score}<span className="text-lg text-surface-500">/100</span></p>
              <p className="text-sm text-surface-400 mt-1">
                {current.score >= 80 ? "Excellent" : current.score >= 60 ? "Good" : current.score >= 40 ? "Average" : "Needs Attention"}
              </p>
            </div>
          </div>

          <h4 className="text-sm font-semibold text-surface-400 uppercase tracking-wider mb-4">Key Insights</h4>
          <div className="space-y-3">
            {current.insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-surface-900/50 border border-surface-800/20">
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: current.color, boxShadow: `0 0 6px ${current.color}66` }} />
                <p className="text-sm text-surface-300 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
