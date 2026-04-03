"use client";

import { useState } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Search, Filter, Play, Dumbbell, Clock, ExternalLink } from "lucide-react";

const drillData = [
  {
    id: "1",
    title: "Ladder Speed Drill",
    category: "Speed & Agility",
    difficulty: "Intermediate",
    duration: "15 min",
    target: "Foot speed, coordination",
    description: "High-frequency foot patterns through an agility ladder to improve central nervous system firing rate.",
    color: "brand",
  },
  {
    id: "2",
    title: "Reactive Sprint Starts",
    category: "Speed",
    difficulty: "Advanced",
    duration: "20 min",
    target: "Reaction time, block clearance",
    description: "Explosive starts with varied auditory and visual cues to enhance first-step explosiveness.",
    color: "emerald",
  },
  {
    id: "3",
    title: "Plyometric Box Jumps",
    category: "Power",
    difficulty: "Advanced",
    duration: "20 min",
    target: "Vertical power, stretch-shortening cycle",
    description: "Progressive box jump heights focusing on landing mechanics and explosive power.",
    color: "teal",
  },
  {
    id: "4",
    title: "Dynamic Core Stability",
    category: "Pre-hab",
    difficulty: "Beginner",
    duration: "10 min",
    target: "Core activation, stabilization",
    description: "Anti-rotation and anti-extension exercises to prepare the core for heavy loading.",
    color: "lime",
  },
  {
    id: "5",
    title: "Hamstring Nordics",
    category: "Strength",
    difficulty: "Elite",
    duration: "15 min",
    target: "Eccentric strength, injury prevention",
    description: "Partner-assisted eccentric hamstring curls focusing on maximizing time under tension.",
    color: "rose",
  },
];

export default function DrillLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...Array.from(new Set(drillData.map((d) => d.category)))];

  const filtered = drillData.filter((drill) => {
    const matchesSearch = drill.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || drill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout role="coach">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center glow-green-subtle">
            <Dumbbell className="w-5 h-5 text-brand-400" />
          </div>
          Drill Library
        </h1>
        <p className="text-surface-500">Curated training protocols and exercise programming.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
          <input
            type="text"
            placeholder="Search drills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field !pl-11"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-brand-600 text-white shadow-[0_0_15px_rgba(0,255,136,0.15)]"
                  : "bg-surface-900/60 text-surface-400 hover:text-white hover:bg-surface-800 border border-surface-800/30"
              }`}
            >
              {cat === "all" ? "All Drills" : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((drill) => (
          <div key={drill.id} className="glass-card-hover flex flex-col h-full overflow-hidden">
            <div className={`h-2 w-full bg-${drill.color}-500 opacity-80`} style={{ boxShadow: `0 0 10px var(--color-${drill.color}-500)` }} />
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <span className={`badge badge-${drill.color}`}>{drill.category}</span>
                <span className={`text-xs font-bold font-display ${
                  drill.difficulty === "Beginner" ? "text-emerald-400" :
                  drill.difficulty === "Intermediate" ? "text-amber-400" :
                  drill.difficulty === "Advanced" ? "text-rose-400" : "text-purple-400"
                }`}>
                  {drill.difficulty}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{drill.title}</h3>
              <p className="text-sm text-surface-400 mb-4 flex-1">{drill.description}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-surface-400">
                  <Clock className="w-4 h-4 text-surface-500" /> <span>{drill.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-surface-400">
                  <Dumbbell className="w-4 h-4 text-surface-500" /> <span>Targets: <span className="text-surface-300">{drill.target}</span></span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <button className="flex-1 btn-secondary !py-2.5 flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Details
                </button>
                <button className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center text-brand-400 hover:bg-brand-500 hover:text-white transition-all glow-green-subtle">
                  <Play className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
