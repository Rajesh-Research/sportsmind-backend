"use client";

import { useState } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Search, Star, Eye, Phone, UserCheck, Plus, MapPin } from "lucide-react";

const scoutingData = [
  { id: "1", athleteName: "Diego Santos", sport: "Football", rating: 9.2, age: 18, location: "São Paulo, Brazil", strengths: ["Speed", "Dribbling", "Vision"], status: "watching" as const },
  { id: "2", athleteName: "Yuki Tanaka", sport: "Swimming", rating: 8.8, age: 17, location: "Tokyo, Japan", strengths: ["Endurance", "Technique", "Mental Toughness"], status: "contacted" as const },
  { id: "3", athleteName: "Elena Volkov", sport: "Track & Field", rating: 9.5, age: 19, location: "Moscow, Russia", strengths: ["Explosiveness", "Form", "Consistency"], status: "trial" as const },
  { id: "4", athleteName: "James Okonkwo", sport: "Basketball", rating: 8.5, age: 20, location: "Lagos, Nigeria", strengths: ["Height", "Athleticism", "Court IQ"], status: "watching" as const },
  { id: "5", athleteName: "Sophie Laurent", sport: "Swimming", rating: 9.0, age: 16, location: "Paris, France", strengths: ["Turn Technique", "Sprint Speed", "Recovery"], status: "contacted" as const },
  { id: "6", athleteName: "Mateo Garcia", sport: "Football", rating: 9.3, age: 19, location: "Buenos Aires, Argentina", strengths: ["Passing", "Positioning", "Leadership"], status: "signed" as const },
];

const statusConfig = {
  watching: { label: "Watching", badge: "badge-grey", icon: Eye },
  contacted: { label: "Contacted", badge: "badge-amber", icon: Phone },
  trial: { label: "Trial", badge: "badge-green", icon: UserCheck },
  signed: { label: "Signed", badge: "badge-emerald", icon: Star },
};

export default function Scouting() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? scoutingData : scoutingData.filter((s) => s.status === filter);

  return (
    <DashboardLayout role="management">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center glow-green-subtle">
              <Search className="w-5 h-5 text-brand-400" />
            </div>
            Talent Scouting
          </h1>
          <p className="text-surface-500">Track and manage your scouting pipeline.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Prospect
        </button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {(["watching", "contacted", "trial", "signed"] as const).map((status) => {
          const config = statusConfig[status];
          const Icon = config.icon;
          const count = scoutingData.filter((s) => s.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setFilter(filter === status ? "all" : status)}
              className={`glass-card p-4 text-center transition-all ${filter === status ? "border-brand-500/40 glow-green-subtle scale-[1.02]" : "hover:border-surface-700 hover:bg-surface-900/60"}`}
            >
              <div className={`w-8 h-8 rounded-full mb-2 mx-auto flex items-center justify-center bg-surface-800 ${filter === status ? "text-brand-400" : "text-surface-500"}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-white font-display">{count}</p>
              <p className="text-xs text-surface-400 mt-1 uppercase tracking-wider">{config.label}</p>
            </button>
          );
        })}
      </div>

      {/* Prospect Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prospect) => {
          const config = statusConfig[prospect.status];
          return (
            <div key={prospect.id} className="glass-card-hover p-6 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl group-hover:bg-brand-500/20 transition-all opacity-0 group-hover:opacity-100" />
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand-300 transition-colors">{prospect.athleteName}</h3>
                  <p className="text-sm text-brand-400 font-medium">{prospect.sport} • Age {prospect.age}</p>
                  <p className="text-xs text-surface-500 flex items-center gap-1 mt-2">
                    <MapPin className="w-3 h-3" /> {prospect.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2 bg-surface-900/80 px-2 py-1 rounded-lg border border-surface-800/50">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                    <span className="text-sm font-bold text-white font-display">{prospect.rating}</span>
                  </div>
                  <span className={`badge ${config.badge}`}>{config.label}</span>
                </div>
              </div>
              <div className="mt-auto relative z-10 pt-4 border-t border-surface-800/30">
                <p className="text-xs text-surface-500 mb-2 uppercase tracking-wider font-semibold">Key Strengths</p>
                <div className="flex flex-wrap gap-2">
                  {prospect.strengths.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-surface-900/60 text-xs text-surface-300 border border-surface-800/50">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
