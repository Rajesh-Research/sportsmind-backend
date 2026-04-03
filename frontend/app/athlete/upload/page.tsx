"use client";

import { useState } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Upload, FileUp, Database, CheckCircle, Brain, Loader2 } from "lucide-react";

export default function UploadData() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFile(null);
      }, 3000);
    }, 2000);
  };

  return (
    <DashboardLayout role="athlete">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center glow-green-subtle">
            <Database className="w-5 h-5 text-brand-400" />
          </div>
          Data Ingestion
        </h1>
        <p className="text-surface-500">Upload CSVs from wearables (Garmin, Whoop, Oura) or optical tracking systems.</p>
      </div>

      <div className="max-w-3xl glass-card p-8 text-center">
        {!success && (
          <>
            <label className={`block w-full border-2 border-dashed rounded-2xl p-16 cursor-pointer transition-all duration-300 mb-8 ${file ? "border-brand-500/40 bg-brand-500/5 glow-green-subtle" : "border-surface-700/50 hover:border-brand-500/30 hover:bg-surface-900/40"}`}>
              <input 
                type="file" 
                accept=".csv,.json"
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
                className="hidden" 
              />
              {file ? (
                <div className="flex flex-col items-center gap-4">
                  <CheckCircle className="w-12 h-12 text-brand-400" />
                  <div>
                    <p className="text-lg font-medium text-white mb-1">{file.name}</p>
                    <p className="text-sm text-surface-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-surface-800/80 flex items-center justify-center mb-2">
                    <FileUp className="w-8 h-8 text-surface-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-white mb-2">Click to browse or drag file here</p>
                    <p className="text-sm text-surface-500 border border-surface-700/50 inline-block px-3 py-1 rounded-full">Supports CSV, JSON containing timeseries biomechanics</p>
                  </div>
                </div>
              )}
            </label>

            <button 
              onClick={handleUpload}
              disabled={!file || uploading} 
              className="btn-primary w-full max-w-sm mx-auto flex items-center justify-center gap-2 text-lg py-4"
            >
              {uploading ? (
                <><Loader2 className="w-6 h-6 animate-spin" /> Ingesting Data...</>
              ) : (
                <><Upload className="w-6 h-6" /> Process into Knowledge Base</>
              )}
            </button>
            <p className="text-xs text-surface-500 mt-4 flex items-center justify-center gap-1">
              <Brain className="w-3 h-3" /> Data is automatically parsed and embedded for the GPT Advisor.
            </p>
          </>
        )}

        {success && (
          <div className="py-16 animate-fade-in flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-brand-500/15 flex items-center justify-center mb-6 glow-green border border-brand-500/20">
              <CheckCircle className="w-12 h-12 text-brand-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Ingestion Complete</h2>
            <p className="text-surface-400 max-w-md mx-auto">
              Your data has been successfully embedded into the SportMind vector database. The GPT Advisor can now reference this context.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
