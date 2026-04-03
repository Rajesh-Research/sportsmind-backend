"use client";

import { useState } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { User, Save, MapPin, Target, LayoutDashboard, Calendar, Activity, CheckCircle } from "lucide-react";

export default function AthleteProfile() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Rivera",
    sport: "Track & Field",
    position: "Sprinter (100m / 200m)",
    age: 24,
    height: 183,
    weight: 78,
    location: "Barcelona, Spain",
    bio: "Professional sprinter focused on 100m and 200m events. Currently training for the upcoming Olympic trials.",
    goals: "Sub-10.20s 100m, improve reaction time off the blocks, maintain 90%+ readiness through the season.",
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <DashboardLayout role="athlete">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center glow-green-subtle">
              <User className="w-5 h-5 text-brand-400" />
            </div>
            Athlete Profile
          </h1>
          <p className="text-surface-500">Manage your personal details, physical metrics, and goals.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className={`btn-primary flex items-center gap-2 ${saved ? "bg-emerald-600 hover:bg-emerald-500" : ""}`}
        >
          {saved ? <><CheckCircle className="w-5 h-5" /> Saved</> : <><Save className="w-5 h-5" /> Save Changes</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {/* Decorative scan line on page */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-3xl">
          <div className="w-full h-1 bg-brand-500/20 shadow-[0_0_20px_rgba(0,255,136,0.3)] animate-scan-line blur-sm" />
        </div>

        {/* Profile Card Summary */}
        <div className="lg:col-span-1 border border-surface-800/50 rounded-2xl glass-card p-6 flex flex-col items-center text-center relative z-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-600 to-neon-green flex items-center justify-center text-3xl font-bold text-black font-display mb-4 shadow-[0_0_30px_rgba(0,255,136,0.2)]">
            AR
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
          <p className="text-brand-400 font-medium mb-4">{profile.sport} • {profile.position}</p>
          
          <div className="w-full space-y-4 text-sm mt-4 text-left border-t border-surface-800/50 pt-6">
            <div className="flex items-center gap-3 text-surface-400">
              <MapPin className="w-4 h-4 text-surface-500" /> {profile.location}
            </div>
            <div className="flex items-center gap-3 text-surface-400">
              <Calendar className="w-4 h-4 text-surface-500" /> Age: {profile.age} years
            </div>
            <div className="flex items-center gap-3 text-surface-400">
              <Activity className="w-4 h-4 text-surface-500" /> {profile.height} cm / {profile.weight} kg
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 space-y-6 relative z-10">
          <div className="glass-card p-6 border border-surface-800/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 border-b border-surface-800/50 pb-3">
              <LayoutDashboard className="w-5 h-5 text-brand-400" /> Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block uppercase tracking-wider">Full Name</label>
                <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="input-field" />
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block uppercase tracking-wider">Location</label>
                <input type="text" value={profile.location} onChange={(e) => setProfile({...profile, location: e.target.value})} className="input-field" />
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block uppercase tracking-wider">Primary Sport</label>
                <input type="text" value={profile.sport} onChange={(e) => setProfile({...profile, sport: e.target.value})} className="input-field" />
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block uppercase tracking-wider">Position / Event</label>
                <input type="text" value={profile.position} onChange={(e) => setProfile({...profile, position: e.target.value})} className="input-field" />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border border-surface-800/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 border-b border-surface-800/50 pb-3">
              <Activity className="w-5 h-5 text-brand-400" /> Physical Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block uppercase tracking-wider">Age (Years)</label>
                <input type="number" value={profile.age} onChange={(e) => setProfile({...profile, age: Number(e.target.value)})} className="input-field font-display" />
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block uppercase tracking-wider">Height (cm)</label>
                <input type="number" value={profile.height} onChange={(e) => setProfile({...profile, height: Number(e.target.value)})} className="input-field font-display" />
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block uppercase tracking-wider">Weight (kg)</label>
                <input type="number" value={profile.weight} onChange={(e) => setProfile({...profile, weight: Number(e.target.value)})} className="input-field font-display" />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border border-surface-800/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 border-b border-surface-800/50 pb-3">
              <Target className="w-5 h-5 text-brand-400" /> Bio & Goals
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block uppercase tracking-wider">Athlete Bio</label>
                <textarea value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} className="input-field h-24 resize-none leading-relaxed" />
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block uppercase tracking-wider">Season Goals</label>
                <textarea value={profile.goals} onChange={(e) => setProfile({...profile, goals: e.target.value})} className="input-field h-24 resize-none leading-relaxed" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
