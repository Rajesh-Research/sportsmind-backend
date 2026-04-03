"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  role: "athlete" | "coach" | "management";
  children: ReactNode;
}

export default function DashboardLayout({ role, children }: DashboardLayoutProps) {
  return (
    <div className="page-container flex min-h-screen">
      <Sidebar role={role} />
      <main className="flex-1 lg:pl-0 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in flex flex-col justify-between min-h-[calc(100vh-2rem)]">
          <div>
            {children}
          </div>
          <footer className="mt-12 border-t border-surface-800/30 pt-6 pb-2 text-center">
            <p className="text-xs text-surface-500 max-w-2xl mx-auto leading-relaxed">
              Developed by <span className="text-brand-400 font-medium">Dr. Rajesh Kumar K V</span>, <br />
              Sports Data Scientist & AI Architect - AI Research Centre, Hyderabad.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
