"use client";

import { useState } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Moon, Zap, Heart, MessageSquare, CheckCircle, Send } from "lucide-react";

const sliderFields = [
  { key: "sleepQuality", label: "Sleep Quality", icon: Moon, emoji: ["😴", "😪", "😐", "😊", "😴✨"] },
  { key: "energyLevel", label: "Energy Level", icon: Zap, emoji: ["🪫", "😮‍💨", "😐", "⚡", "🔥"] },
  { key: "soreness", label: "Muscle Soreness", icon: Heart, emoji: ["😩", "😣", "😐", "🙂", "💪"] },
  { key: "mood", label: "Mood", icon: MessageSquare, emoji: ["😞", "😕", "😐", "😊", "🤩"] },
];

export default function AthleteCheckin() {
  const [submitted, setSubmitted] = useState(false);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [values, setValues] = useState<Record<string, number>>({ sleepQuality: 3, energyLevel: 3, soreness: 3, mood: 4 });
  const [notes, setNotes] = useState("");

  const handleSlider = (key: string, val: number) => setValues((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <DashboardLayout role="athlete">
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-brand-500/15 flex items-center justify-center mb-6 glow-green">
            <CheckCircle className="w-10 h-10 text-brand-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Check-in Complete!</h1>
          <p className="text-surface-500 text-center max-w-md mb-6">
            Your daily wellness data has been recorded. Your coach will be able to see this and adjust your training accordingly.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-secondary">Submit Another</button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="athlete">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Daily Check-in</h1>
        <p className="text-surface-500">How are you feeling today? This helps optimize your training load.</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Moon className="w-5 h-5 text-brand-400" />
            <h3 className="font-semibold text-white">Hours of Sleep</h3>
          </div>
          <div className="flex items-center gap-4">
            <input type="range" min="0" max="12" step="0.5" value={sleepHours} onChange={(e) => setSleepHours(parseFloat(e.target.value))} className="flex-1 accent-brand-500 h-2" />
            <span className="text-2xl font-bold text-brand-400 w-16 text-right font-display">{sleepHours}h</span>
          </div>
          <div className="flex justify-between text-xs text-surface-600 mt-1"><span>0h</span><span>6h</span><span>12h</span></div>
        </div>

        {sliderFields.map((field) => {
          const Icon = field.icon;
          const val = values[field.key];
          return (
            <div key={field.key} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-brand-400" />
                  <h3 className="font-semibold text-white">{field.label}</h3>
                </div>
                <span className="text-2xl">{field.emoji[val - 1]}</span>
              </div>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => handleSlider(field.key, n)} className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${val === n ? "bg-brand-600 text-white shadow-[0_0_15px_rgba(0,255,136,0.15)]" : "bg-surface-900/60 text-surface-400 hover:bg-surface-800 border border-surface-800/30"}`}>
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-surface-600 mt-2"><span>Poor</span><span>Excellent</span></div>
            </div>
          );
        })}

        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-5 h-5 text-surface-500" />
            <h3 className="font-semibold text-white">Additional Notes</h3>
          </div>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any injuries, concerns, or positive developments..." className="input-field h-24 resize-none" />
        </div>

        <button onClick={handleSubmit} className="btn-primary w-full flex items-center justify-center gap-2 text-base">
          <Send className="w-5 h-5" /> Submit Check-in
        </button>
      </div>
    </DashboardLayout>
  );
}
