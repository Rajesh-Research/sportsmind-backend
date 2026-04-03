"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Activity, ClipboardCheck, History, User, Upload,
  Brain, Video, Dumbbell, Users, Search, Trophy, ChevronLeft,
  ChevronRight, Zap, Menu, X, Home
} from "lucide-react";

interface SidebarProps {
  role: "athlete" | "coach" | "management";
}

const navConfig = {
  athlete: {
    title: "Athlete",
    items: [
      { label: "Dashboard", href: "/athlete/dashboard", icon: LayoutDashboard },
      { label: "Analysis", href: "/athlete/analysis", icon: Activity },
      { label: "Daily Check-in", href: "/athlete/checkin", icon: ClipboardCheck },
      { label: "History", href: "/athlete/history", icon: History },
      { label: "Profile", href: "/athlete/profile", icon: User },
      { label: "Upload Data", href: "/athlete/upload", icon: Upload },
    ],
  },
  coach: {
    title: "Coach",
    items: [
      { label: "Dashboard", href: "/coach/dashboard", icon: LayoutDashboard },
      { label: "AI Advisor", href: "/coach/advisor", icon: Brain },
      { label: "Video Analysis", href: "/coach/video", icon: Video },
      { label: "Drill Library", href: "/coach/drills", icon: Dumbbell },
    ],
  },
  management: {
    title: "Management",
    items: [
      { label: "Dashboard", href: "/management/dashboard", icon: LayoutDashboard },
      { label: "Squad", href: "/management/squad", icon: Users },
      { label: "Scouting", href: "/management/scouting", icon: Search },
      { label: "Tournaments", href: "/management/tournament", icon: Trophy },
    ],
  },
};

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const config = navConfig[role];

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="p-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-neon-green flex items-center justify-center flex-shrink-0 glow-green-subtle">
          <Zap className="w-5 h-5 text-black" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="font-display font-bold text-white text-base leading-none tracking-wider">SPORTMIND</h1>
            <p className="text-[10px] text-brand-400 font-medium tracking-widest uppercase mt-0.5">
              {config.title} Portal
            </p>
          </div>
        )}
      </div>

      {/* Separator with glow */}
      <div className="px-5 mb-2">
        <div className="h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {config.items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "sidebar-link-active" : "sidebar-link"}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-brand-400 drop-shadow-[0_0_6px_rgba(0,255,136,0.4)]" : ""}`} />
              {!collapsed && <span className="animate-fade-in">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* R&D Feature Banner */}
      {!collapsed && (
        <div className="px-4 mb-4 animate-fade-in">
          <div className="p-3 rounded-lg bg-brand-500/10 border border-brand-500/20 text-center relative overflow-hidden group hover:border-brand-500/40 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-500/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <h4 className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">R & D Feature</h4>
            <p className="text-[10px] text-surface-400 leading-snug">Research Paper Learning & Data Parsing models releasing soon...</p>
          </div>
        </div>
      )}

      {/* Bottom */}
      <div className="p-3 border-t border-surface-800/50">
        <Link href="/" className="sidebar-link" title={collapsed ? "Home" : undefined}>
          <Home className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Back to Home</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-link w-full hidden lg:flex"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 flex-shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 glass-card"
        id="sidebar-mobile-toggle"
      >
        <Menu className="w-5 h-5 text-brand-400" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 bottom-0 w-64 z-50 
          bg-black/95 backdrop-blur-xl border-r border-surface-800/50
          transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
        `}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-1 text-surface-400 hover:text-brand-400"
        >
          <X className="w-5 h-5" />
        </button>
        <NavContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-30
          bg-black/90 backdrop-blur-xl border-r border-surface-800/30
          transition-all duration-300
          ${collapsed ? "w-[72px]" : "w-64"}
        `}
      >
        <NavContent />
      </aside>

      {/* Spacer */}
      <div className={`hidden lg:block flex-shrink-0 transition-all duration-300 ${collapsed ? "w-[72px]" : "w-64"}`} />
    </>
  );
}
