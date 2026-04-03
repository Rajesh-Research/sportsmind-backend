"use client";

import DashboardLayout from "@/components/common/DashboardLayout";
import StatCard from "@/components/common/StatCard";
import ProgressRing from "@/components/common/ProgressRing";
import { BarChart3, Users, Trophy, TrendingUp, DollarSign, Globe } from "lucide-react";

const departments = [
  { name: "Track & Field", athletes: 24, budget: "$45K", performance: 88 },
  { name: "Swimming", athletes: 18, budget: "$38K", performance: 91 },
  { name: "Football", athletes: 30, budget: "$62K", performance: 82 },
  { name: "Basketball", athletes: 15, budget: "$41K", performance: 86 },
];

const recentEvents = [
  { event: "Regional Sprint Championship", date: "Apr 15", status: "upcoming", result: "" },
  { event: "National Swimming Trials", date: "Mar 28", status: "completed", result: "3 qualifiers" },
  { event: "Inter-Club Football Derby", date: "Mar 22", status: "completed", result: "Won 3-1" },
  { event: "Youth Athletics Open", date: "Mar 15", status: "completed", result: "12 medals" },
];

export default function ManagementDashboard() {
  return (
    <DashboardLayout role="management">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Management Dashboard</h1>
        <p className="text-surface-500">Organization-wide performance analytics and resource management.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Athletes" value="87" change={6} trend="up" color="green" icon={<Users className="w-5 h-5 text-brand-400" />} />
        <StatCard label="Active Programs" value="12" change={2} trend="up" color="emerald" icon={<BarChart3 className="w-5 h-5 text-emerald-400" />} />
        <StatCard label="Medals Won" value="34" change={15} trend="up" color="lime" icon={<Trophy className="w-5 h-5 text-lime-400" />} />
        <StatCard label="Total Budget" value="$186K" change={3.5} trend="up" color="teal" icon={<DollarSign className="w-5 h-5 text-teal-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Performance */}
        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Department Performance</h2>
          <div className="space-y-4">
            {departments.map((dept) => (
              <div key={dept.name} className="flex items-center gap-4 p-4 rounded-xl bg-surface-900/50 hover:bg-surface-800/80 transition-colors border border-surface-800/30">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-white">{dept.name}</p>
                    <span className="text-sm font-bold text-brand-400 font-display">{dept.performance}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill bg-gradient-to-r from-brand-600 to-neon-green"
                      style={{ width: `${dept.performance}%`, boxShadow: '0 0 10px rgba(0,255,136,0.3)' }}
                    />
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-surface-500">
                    <span>{dept.athletes} athletes</span>
                    <span>Budget: {dept.budget}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Org Score */}
        <div className="glass-card p-6 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-white mb-6">Organization Score</h2>
          <ProgressRing
            value={87}
            max={100}
            size={150}
            strokeWidth={10}
            color="#00ff88"
            label="Overall Performance"
            sublabel="Across all departments"
          />
          <div className="mt-6 grid grid-cols-2 gap-4 w-full">
            <div className="text-center p-3 rounded-lg bg-surface-900/50 border border-surface-800/30">
              <p className="text-lg font-bold text-brand-400 font-display">94%</p>
              <p className="text-xs text-surface-500">Retention Rate</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-surface-900/50 border border-surface-800/30">
              <p className="text-lg font-bold text-emerald-400 font-display">4.2x</p>
              <p className="text-xs text-surface-500">ROI on Training</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="glass-card p-6 mt-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-400" /> Recent Events
        </h2>
        <div className="divide-y divide-surface-800/50">
          {recentEvents.map((ev, i) => (
            <div key={i} className="py-3 flex items-center justify-between group">
              <div>
                <p className="font-medium text-white group-hover:text-brand-300 transition-colors">{ev.event}</p>
                <p className="text-xs text-surface-500">{ev.date}</p>
              </div>
              <div className="flex items-center gap-3">
                {ev.result && <span className="text-sm text-surface-400">{ev.result}</span>}
                <span className={`badge ${ev.status === "upcoming" ? "badge-amber" : "badge-green"}`}>
                  {ev.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Grassroot Identification & Team Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-400" /> Grassroot Identification & Scouting
          </h2>
          <p className="text-sm text-surface-400 mb-4 leading-relaxed">
            AI-driven pipeline for identifying emerging talent across affiliated schools and academies. 
            Metrics automatically track biomechanical growth and base performance indices to flag potential recruits early.
          </p>
          <div className="space-y-3">
            {[
              { label: "U-16 Regional Talent Pool", count: 142, alert: 3 },
              { label: "Varsity Scholarship Watches", count: 28, alert: 1 },
              { label: "Community Combine Scans", count: 450, alert: 0 }
            ].map((pool, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface-900/50 border border-surface-800/30">
                <span className="font-medium text-white text-sm">{pool.label}</span>
                <div className="flex items-center gap-3">
                  {pool.alert > 0 && <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />}
                  <span className="text-surface-400 text-xs">{pool.count} tracked</span>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-secondary w-full mt-4 text-xs tracking-wider uppercase">View Full Pipeline</button>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-400" /> Team Composition & Player Selection
          </h2>
          <p className="text-sm text-surface-400 mb-4 leading-relaxed">
            Data-driven roster generation. AI cross-references individual performance metrics, 
            readiness scores, and tactical synergy to recommend optimal match-day line-ups and squad rotations.
          </p>
          <div className="space-y-3 mt-4">
            <div className="p-3 rounded-lg border border-brand-500/20 bg-brand-500/5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">AI Recommendation Available</span>
                <span className="text-[10px] text-surface-500">Football - Matchday 15</span>
              </div>
              <p className="text-sm text-white font-medium">Optimal Starting XI configuration ready based on current fatigue levels.</p>
            </div>
            <div className="p-3 rounded-lg border border-surface-800/30 bg-surface-900/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-surface-300 uppercase tracking-wider">Squad Depth Analysis</span>
                <span className="text-[10px] text-surface-500">Track & Field</span>
              </div>
              <p className="text-sm text-surface-400">Weakness detected in relay baton-exchange timings among current top 4 sprinters.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
