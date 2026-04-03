"use client";

import { useState } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Users, Search, Filter, Plus, MoreHorizontal, CheckCircle, AlertTriangle, Clock } from "lucide-react";

const squadData = [
  { id: "1", name: "Alex Rivera", sport: "Track & Field", position: "Sprinter", age: 24, status: "active", readiness: 92 },
  { id: "2", name: "Mia Chen", sport: "Track & Field", position: "Hurdler", age: 22, status: "active", readiness: 87 },
  { id: "3", name: "Jordan Taylor", sport: "Swimming", position: "Freestyle", age: 20, status: "injured", readiness: 34 },
  { id: "4", name: "Sam Okafor", sport: "Football", position: "Midfielder", age: 26, status: "active", readiness: 95 },
  { id: "5", name: "Lucia Fernandez", sport: "Track & Field", position: "Pole Vault", age: 23, status: "resting", readiness: 68 },
  { id: "6", name: "Kai Nakamura", sport: "Swimming", position: "Butterfly", age: 21, status: "active", readiness: 90 },
  { id: "7", name: "Priya Sharma", sport: "Basketball", position: "Point Guard", age: 25, status: "active", readiness: 88 },
  { id: "8", name: "Marco Rossi", sport: "Football", position: "Striker", age: 27, status: "active", readiness: 83 },
  { id: "9", name: "Aisha Mohamed", sport: "Track & Field", position: "Middle Distance", age: 19, status: "active", readiness: 91 },
  { id: "10", name: "Lucas Weber", sport: "Swimming", position: "Backstroke", age: 22, status: "resting", readiness: 72 },
];

const statusIcons = {
  active: { icon: CheckCircle, color: "text-emerald-400", badge: "badge-emerald" },
  injured: { icon: AlertTriangle, color: "text-rose-400", badge: "badge-rose" },
  resting: { icon: Clock, color: "text-amber-400", badge: "badge-amber" },
};

export default function SquadManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSport, setFilterSport] = useState("all");

  const sports = ["all", ...Array.from(new Set(squadData.map((s) => s.sport)))];
  const filtered = squadData.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = filterSport === "all" || s.sport === filterSport;
    return matchesSearch && matchesSport;
  });

  return (
    <DashboardLayout role="management">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Squad Management</h1>
          <p className="text-surface-400">Manage your athletes across all departments.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Athlete
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
          <input
            type="text"
            placeholder="Search athletes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field !pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {sports.map((sport) => (
            <button
              key={sport}
              onClick={() => setFilterSport(sport)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filterSport === sport
                  ? "bg-brand-600 text-white"
                  : "bg-surface-800/50 text-surface-400 hover:text-white"
              }`}
            >
              {sport === "all" ? "All Sports" : sport}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">{squadData.filter((s) => s.status === "active").length}</p>
          <p className="text-xs text-surface-400">Active</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-rose-400">{squadData.filter((s) => s.status === "injured").length}</p>
          <p className="text-xs text-surface-400">Injured</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">{squadData.filter((s) => s.status === "resting").length}</p>
          <p className="text-xs text-surface-400">Resting</p>
        </div>
      </div>

      {/* Squad Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-700/50">
                <th className="text-left p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">Athlete</th>
                <th className="text-left p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider hidden sm:table-cell">Sport</th>
                <th className="text-left p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider hidden md:table-cell">Position</th>
                <th className="text-left p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider hidden lg:table-cell">Age</th>
                <th className="text-left p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">Status</th>
                <th className="text-right p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">Readiness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-800/30">
              {filtered.map((athlete) => {
                const status = statusIcons[athlete.status as keyof typeof statusIcons];
                const StatusIcon = status.icon;
                return (
                  <tr key={athlete.id} className="hover:bg-surface-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-700 to-brand-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                          {athlete.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="font-medium text-white">{athlete.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-surface-300 hidden sm:table-cell">{athlete.sport}</td>
                    <td className="p-4 text-sm text-surface-300 hidden md:table-cell">{athlete.position}</td>
                    <td className="p-4 text-sm text-surface-300 hidden lg:table-cell">{athlete.age}</td>
                    <td className="p-4">
                      <span className={`badge ${status.badge}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />{athlete.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`text-lg font-bold ${
                        athlete.readiness >= 80 ? "text-emerald-400" : athlete.readiness >= 50 ? "text-amber-400" : "text-rose-400"
                      }`}>
                        {athlete.readiness}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
