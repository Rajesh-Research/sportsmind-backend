"use client";

import DashboardLayout from "@/components/common/DashboardLayout";
import StatCard from "@/components/common/StatCard";
import Link from "next/link";
import { Brain, Video, Dumbbell, Users, Activity, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const teamMembers = [
  { name: "Alex Rivera", sport: "Sprint", status: "active", readiness: 92, avatar: "AR" },
  { name: "Mia Chen", sport: "Hurdles", status: "active", readiness: 87, avatar: "MC" },
  { name: "Jordan Taylor", sport: "Long Jump", status: "injured", readiness: 34, avatar: "JT" },
  { name: "Sam Okafor", sport: "Sprint", status: "active", readiness: 95, avatar: "SO" },
  { name: "Lucia Fernandez", sport: "Pole Vault", status: "resting", readiness: 68, avatar: "LF" },
];

const statusConfig = {
  active: { badge: "badge-green", icon: CheckCircle, label: "Active" },
  injured: { badge: "badge-rose", icon: AlertTriangle, label: "Injured" },
  resting: { badge: "badge-amber", icon: Activity, label: "Resting" },
};

const tools = [
  {
    title: "GPT Sports Advisor",
    description: "Ask expert questions about biomechanics, strategy, and training science — powered by GPT.",
    href: "/coach/advisor",
    icon: Brain,
  },
  {
    title: "Video Analysis",
    description: "Upload footage for AI-powered biomechanical analysis and coaching cues.",
    href: "/coach/video",
    icon: Video,
  },
  {
    title: "Drill Library",
    description: "Browse and customize training drills for your athletes.",
    href: "/coach/drills",
    icon: Dumbbell,
  },
];

export default function CoachDashboard() {
  return (
    <DashboardLayout role="coach">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Coach Dashboard</h1>
        <p className="text-surface-500">Manage your team and leverage AI-powered insights.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Active Athletes" value="12" change={2} trend="up" color="green" icon={<Users className="w-5 h-5 text-brand-400" />} />
        <StatCard label="Avg Team Readiness" value="84%" change={3.1} trend="up" color="emerald" icon={<Activity className="w-5 h-5 text-brand-300" />} />
        <StatCard label="Sessions This Week" value="38" change={5} trend="up" color="teal" icon={<TrendingUp className="w-5 h-5 text-teal-400" />} />
        <StatCard label="Injury Alerts" value="1" change={-50} trend="down" color="grey" icon={<AlertTriangle className="w-5 h-5 text-rose-400" />} />
      </div>

      {/* AI Tools */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">AI Coaching Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.title}
                href={tool.href}
                className="glass-card-hover p-6 group relative overflow-hidden"
              >
                {/* Green ambient on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-brand-500/5 to-transparent" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center mb-4 group-hover:glow-green-subtle transition-all duration-300">
                    <Icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{tool.title}</h3>
                  <p className="text-sm text-surface-500">{tool.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Team Overview */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-surface-800/30 flex items-center justify-between">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-400" /> Team Overview
          </h2>
          <span className="text-xs text-surface-500">{teamMembers.length} athletes</span>
        </div>
        <div className="divide-y divide-surface-800/20">
          {teamMembers.map((member) => {
            const config = statusConfig[member.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;
            return (
              <div key={member.name} className="p-4 flex items-center gap-4 hover:bg-surface-800/20 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 border border-brand-500/20">
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">{member.name}</p>
                  <p className="text-xs text-surface-500">{member.sport}</p>
                </div>
                <div className="hidden sm:block">
                  <span className={`badge ${config.badge}`}>
                    <StatusIcon className="w-3 h-3 mr-1" /> {config.label}
                  </span>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold font-display ${member.readiness >= 80 ? "text-brand-400" : member.readiness >= 50 ? "text-amber-400" : "text-rose-400"}`}>
                    {member.readiness}%
                  </p>
                  <p className="text-xs text-surface-600">Readiness</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
