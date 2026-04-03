"use client";

import DashboardLayout from "@/components/common/DashboardLayout";
import { Clock, Activity, Target, Brain, Award, ChevronRight } from "lucide-react";

// Mock history data
const sessions = [
  {
    id: "1",
    date: "Today, 10:00 AM",
    type: "Sprint Intervals",
    duration: "45 min",
    load: 120,
    readinessBefore: 92,
    score: "A",
    icon: Activity,
    color: "brand",
  },
  {
    id: "2",
    date: "Yesterday, 3:30 PM",
    type: "Recovery Yoga",
    duration: "30 min",
    load: 15,
    readinessBefore: 88,
    score: "N/A",
    icon: HeartFill, // mock
    color: "emerald",
  },
  {
    id: "3",
    date: "Oct 24, 09:15 AM",
    type: "Strength: Lower Body",
    duration: "65 min",
    load: 145,
    readinessBefore: 85,
    score: "B+",
    icon: DumbbellFill, // mock
    color: "teal",
  },
  {
    id: "4",
    date: "Oct 22, 11:00 AM",
    type: "Technical: Block Clearances",
    duration: "40 min",
    load: 85,
    readinessBefore: 95,
    score: "A+",
    icon: Target,
    color: "amber",
  },
  {
    id: "5",
    date: "Oct 21, 10:00 AM",
    type: "Sprint Intervals",
    duration: "50 min",
    load: 135,
    readinessBefore: 90,
    score: "A-",
    icon: Activity,
    color: "brand",
  },
];

// SVG mocks for missing lucide-react icons in this scope, or just use alternatives
function HeartFill(props: any) { return <Activity {...props} />; }
function DumbbellFill(props: any) { return <Activity {...props} />; }

export default function TrainingHistory() {
  return (
    <DashboardLayout role="athlete">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center glow-green-subtle">
            <Clock className="w-5 h-5 text-brand-400" />
          </div>
          Training History
        </h1>
        <p className="text-surface-500">Past sessions, loads, and AI-graded performance logs.</p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4">
          <p className="text-sm text-surface-500 mb-1">Total Sessions</p>
          <p className="text-2xl font-bold text-white font-display">42</p>
          <p className="text-xs text-brand-400 mt-1 flex items-center gap-1">This month</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-sm text-surface-500 mb-1">Avg Load</p>
          <p className="text-2xl font-bold text-white font-display">115</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-sm text-surface-500 mb-1">Hours Logged</p>
          <p className="text-2xl font-bold text-white font-display">32.5</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-sm text-surface-500 mb-1">AI Grade Avg</p>
          <p className="text-2xl font-bold text-brand-400 font-display">A-</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="glass-card overflow-hidden relative">
        {/* Continuous vertical line */}
        <div className="absolute left-[2.25rem] md:left-[3.25rem] top-0 bottom-0 w-px bg-surface-800/50" />

        <div className="divide-y divide-surface-800/30">
          {sessions.map((session) => {
            const Icon = session.icon;
            return (
              <div key={session.id} className="p-4 md:p-6 flex items-start gap-4 md:gap-6 hover:bg-surface-800/20 transition-colors relative group">
                <div className={`w-10 h-10 rounded-full bg-${session.color}-500/10 border border-${session.color}-500/20 flex items-center justify-center text-${session.color}-400 flex-shrink-0 relative z-10 group-hover:bg-${session.color}-500/30 transition-colors`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{session.type}</h3>
                    <span className="text-sm text-surface-500">{session.date}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm mb-3">
                    <span className="text-surface-400 flex items-center gap-1.5"><Clock className="w-4 h-4 text-surface-500" /> {session.duration}</span>
                    <span className="text-surface-400 flex items-center gap-1.5"><Activity className="w-4 h-4 text-surface-500" /> Load: {session.load}</span>
                    <span className="text-surface-400 flex items-center gap-1.5"><Target className="w-4 h-4 text-surface-500" /> Readiness: {session.readinessBefore}%</span>
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-center justify-center pl-6 border-l border-surface-800/30 min-w-[100px]">
                  <span className="text-xs text-surface-500 uppercase tracking-wider mb-1">AI Grade</span>
                  <span className="text-2xl font-bold text-white font-display text-center">{session.score}</span>
                </div>
                
                <div className="h-full flex items-center">
                  <ChevronRight className="w-5 h-5 text-surface-600 group-hover:text-brand-400 transition-colors ml-2" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
