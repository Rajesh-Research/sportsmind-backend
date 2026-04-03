"use client";

import DashboardLayout from "@/components/common/DashboardLayout";
import StatCard from "@/components/common/StatCard";
import ProgressRing from "@/components/common/ProgressRing";
import { Activity, Flame, Moon, Heart, TrendingUp } from "lucide-react";

const recentActivities = [
  { action: "Completed sprint training session", time: "2 hours ago", type: "training" },
  { action: "Daily wellness check-in submitted", time: "5 hours ago", type: "checkin" },
  { action: "AI analysis: Stride efficiency improved 4%", time: "1 day ago", type: "analysis" },
  { action: "Uploaded 3 training videos", time: "2 days ago", type: "upload" },
  { action: "Coach left feedback on technique drill", time: "3 days ago", type: "feedback" },
];

const weeklyMetrics = [
  { day: "Mon", value: 82 },
  { day: "Tue", value: 91 },
  { day: "Wed", value: 75 },
  { day: "Thu", value: 88 },
  { day: "Fri", value: 95 },
  { day: "Sat", value: 70 },
  { day: "Sun", value: 60 },
];

export default function AthleteDashboard() {
  const maxVal = Math.max(...weeklyMetrics.map((m) => m.value));

  return (
    <DashboardLayout role="athlete">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Athlete 👋</h1>
        <p className="text-surface-500">Here&apos;s your performance overview for this week.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Performance Index"
          value="87.4"
          change={3.2}
          trend="up"
          color="green"
          icon={<Activity className="w-5 h-5 text-brand-400" />}
        />
        <StatCard
          label="Training Load"
          value="742"
          change={5.1}
          trend="up"
          color="emerald"
          icon={<Flame className="w-5 h-5 text-brand-300" />}
        />
        <StatCard
          label="Sleep Score"
          value="8.2h"
          change={1.4}
          trend="up"
          color="teal"
          icon={<Moon className="w-5 h-5 text-teal-400" />}
        />
        <StatCard
          label="Recovery Rate"
          value="92%"
          change={2.1}
          trend="down"
          color="lime"
          icon={<Heart className="w-5 h-5 text-lime-400" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Performance Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Weekly Performance</h2>
            <span className="badge badge-green">+12% avg</span>
          </div>
          <div className="flex items-end gap-3 h-48">
            {weeklyMetrics.map((metric) => (
              <div key={metric.day} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-surface-500 font-medium">{metric.value}</span>
                <div
                  className="w-full rounded-lg transition-all duration-1000 ease-out"
                  style={{
                    height: `${(metric.value / maxVal) * 100}%`,
                    minHeight: "8px",
                    background: `linear-gradient(to top, #059669, #00ff88)`,
                    boxShadow: '0 0 8px rgba(0, 255, 136, 0.2)',
                  }}
                />
                <span className="text-xs text-surface-600">{metric.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Readiness Score */}
        <div className="glass-card p-6 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-white mb-6">Today&apos;s Readiness</h2>
          <ProgressRing
            value={84}
            max={100}
            size={140}
            color="#00ff88"
            label="Ready to Train"
            sublabel="Based on sleep, HRV & wellness"
          />
          <div className="mt-6 grid grid-cols-3 gap-4 w-full text-center">
            <div>
              <p className="text-xl font-bold text-brand-400 font-display">92</p>
              <p className="text-xs text-surface-500">HRV</p>
            </div>
            <div>
              <p className="text-xl font-bold text-brand-300 font-display">48</p>
              <p className="text-xs text-surface-500">RHR</p>
            </div>
            <div>
              <p className="text-xl font-bold text-neon-green font-display">7.8</p>
              <p className="text-xs text-surface-500">Energy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6 mt-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivities.map((activity, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-800/30 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-brand-400 flex-shrink-0 shadow-[0_0_6px_rgba(0,255,136,0.4)]" />
              <div className="flex-1">
                <p className="text-sm text-surface-300">{activity.action}</p>
                <p className="text-xs text-surface-600 mt-0.5">{activity.time}</p>
              </div>
              <TrendingUp className="w-4 h-4 text-surface-700" />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
