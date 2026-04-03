"use client";

import DashboardLayout from "@/components/common/DashboardLayout";
import { Trophy, Calendar, MapPin, Users, ChevronRight } from "lucide-react";

const tournaments = [
  {
    name: "National Athletics Championship",
    location: "Olympic Stadium, Barcelona",
    date: "Apr 15-18, 2026",
    status: "upcoming" as const,
    sport: "Track & Field",
    teams: 24,
    matches: [
      { team1: "Barcelona AC", team2: "Madrid Elite", date: "Apr 15", status: "upcoming" as const },
      { team1: "Barcelona AC", team2: "Lisbon Stars", date: "Apr 16", status: "upcoming" as const },
    ],
  },
  {
    name: "Regional Swimming Cup",
    location: "Aquatic Center, Valencia",
    date: "Mar 28-30, 2026",
    status: "completed" as const,
    sport: "Swimming",
    teams: 16,
    matches: [
      { team1: "Team Alpha", team2: "Team Delta", score1: 3, score2: 1, date: "Mar 28", status: "completed" as const },
      { team1: "Team Alpha", team2: "Team Gamma", score1: 2, score2: 2, date: "Mar 29", status: "completed" as const },
      { team1: "Team Alpha", team2: "Team Beta", score1: 4, score2: 0, date: "Mar 30", status: "completed" as const },
    ],
  },
  {
    name: "Youth Football League",
    location: "Municipal Field, Seville",
    date: "Ongoing — Matchday 14/22",
    status: "live" as const,
    sport: "Football",
    teams: 12,
    matches: [
      { team1: "Seville FC Youth", team2: "Atletico Youth", score1: 2, score2: 1, date: "Mar 22", status: "completed" as const },
      { team1: "Seville FC Youth", team2: "Real Betis Youth", date: "Apr 5", status: "upcoming" as const },
    ],
  },
];

const statusBadge = {
  upcoming: "badge-amber",
  live: "badge-emerald",
  completed: "badge-grey",
};

export default function TournamentManagement() {
  return (
    <DashboardLayout role="management">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          Tournaments
        </h1>
        <p className="text-surface-500">Track competitions, fixtures, and results across all sports.</p>
      </div>

      <div className="space-y-8">
        {tournaments.map((tournament, i) => (
          <div key={i} className="glass-card overflow-hidden group">
            {/* Tournament Header */}
            <div className={`p-6 border-b border-surface-800/50 ${tournament.status === 'live' ? 'bg-gradient-to-r from-emerald-500/10 to-transparent' : ''}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-white group-hover:text-brand-300 transition-colors">{tournament.name}</h2>
                    <span className={`badge ${statusBadge[tournament.status]}`}>
                      {tournament.status === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />}
                      {tournament.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-5 text-sm text-surface-400">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-surface-500" /> {tournament.location}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-surface-500" /> {tournament.date}</span>
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-surface-500" /> {tournament.teams} teams</span>
                  </div>
                </div>
                <span className="badge badge-green px-3 py-1.5">{tournament.sport}</span>
              </div>
            </div>

            {/* Matches */}
            <div className="divide-y divide-surface-800/30 bg-black/20">
              {tournament.matches.map((match, j) => (
                <div key={j} className="p-4 flex items-center gap-4 hover:bg-surface-800/40 transition-colors">
                  <div className="text-xs text-surface-500 w-20 flex-shrink-0 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />{match.date}
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-4">
                    <span className="font-medium text-white text-sm text-right flex-1">{match.team1}</span>
                    <div className="flex items-center gap-2 bg-surface-900/80 border border-surface-800/50 rounded-xl px-4 py-2 min-w-[80px] justify-center shadow-inner">
                      {match.status === "completed" ? (
                        <span className="text-sm font-bold text-white font-display">
                          <span className={match.score1! > match.score2! ? "text-brand-400" : ""}>{match.score1}</span>
                          <span className="mx-2 text-surface-600">-</span>
                          <span className={match.score2! > match.score1! ? "text-brand-400" : ""}>{match.score2}</span>
                        </span>
                      ) : (
                        <span className="text-xs text-surface-500 font-medium">VS</span>
                      )}
                    </div>
                    <span className="font-medium text-white text-sm text-left flex-1">{match.team2}</span>
                  </div>
                  <div className="w-24 text-right">
                    <span className={`badge ${statusBadge[match.status]} text-[10px]`}>{match.status}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-surface-600" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
