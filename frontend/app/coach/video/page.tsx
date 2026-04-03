"use client";

import { useState } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Video, Upload, Sparkles, FileVideo, Loader2, CheckCircle } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function VideoAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState(
    "Analyze this athlete's form and technique. Identify 3 key areas for improvement with specific, actionable coaching cues."
  );
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setAnalysis("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${API_BASE}/api/ai/video/analyze?prompt=${encodeURIComponent(prompt)}`, { method: "POST", body: formData });
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch {
      setAnalysis("Error analyzing the video. Ensure the backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="coach">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center">
            <Video className="w-5 h-5 text-brand-400" />
          </div>
          AI Video Coaching
        </h1>
        <p className="text-surface-500">Upload sports footage and get GPT-powered biomechanics analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-brand-400" /> Upload Video
            </h3>
            <label className={`block w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${file ? "border-brand-500/40 bg-brand-500/5 glow-green-subtle" : "border-surface-700/50 hover:border-brand-500/30 hover:bg-brand-500/5"}`}>
              <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
              {file ? (
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle className="w-8 h-8 text-brand-400" />
                  <p className="font-medium text-white">{file.name}</p>
                  <p className="text-xs text-surface-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <FileVideo className="w-8 h-8 text-surface-600" />
                  <p className="text-sm text-surface-400">Click to select a video file</p>
                  <p className="text-xs text-surface-600">MP4, MOV, AVI — up to 500MB</p>
                </div>
              )}
            </label>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-300" /> Coaching Focus
            </h3>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="input-field h-32 resize-none" placeholder="Describe what you want the AI to analyze..." />
          </div>

          <button onClick={handleUpload} disabled={loading || !file} className="btn-primary w-full flex items-center justify-center gap-2 text-base">
            {loading ? (<><Loader2 className="w-5 h-5 animate-spin" /> Analyzing with GPT... (up to 60s)</>) : (<><Video className="w-5 h-5" /> Start Analysis</>)}
          </button>
        </div>

        <div className="glass-card p-6 flex flex-col">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-400" /> Analysis Results
          </h3>
          {!analysis && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-surface-900/50 border border-surface-800/30 flex items-center justify-center mb-4">
                <Video className="w-8 h-8 text-surface-700" />
              </div>
              <p className="text-surface-500 text-sm max-w-xs">Upload a video and click &ldquo;Start Analysis&rdquo; to get GPT-powered coaching feedback.</p>
            </div>
          )}
          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center py-12 animate-fade-in">
              <Loader2 className="w-10 h-10 text-brand-400 animate-spin mb-4" />
              <p className="text-surface-300 font-medium">Processing your video...</p>
              <p className="text-xs text-surface-600 mt-1">GPT is analyzing biomechanics and generating feedback</p>
            </div>
          )}
          {analysis && (
            <div className="flex-1 overflow-y-auto animate-fade-in">
              <div className="whitespace-pre-wrap text-surface-300 leading-relaxed text-sm">{analysis}</div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
