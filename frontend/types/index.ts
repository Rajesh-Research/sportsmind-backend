export interface Athlete {
  id: string;
  name: string;
  sport: string;
  position?: string;
  age?: number;
  avatar?: string;
  status: "active" | "injured" | "resting";
}

export interface PerformanceMetric {
  label: string;
  value: number;
  max: number;
  unit?: string;
  trend?: "up" | "down" | "stable";
  change?: number;
}

export interface CheckInEntry {
  id: string;
  date: string;
  sleepHours: number;
  sleepQuality: number;
  energyLevel: number;
  soreness: number;
  mood: number;
  notes?: string;
}

export interface Drill {
  id: string;
  name: string;
  sport: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "elite";
  duration: number;
  description: string;
  objectives: string[];
}

export interface VideoAnalysisResult {
  analysis: string;
  timestamp?: string;
}

export interface RAGResponse {
  response: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export interface PricingTier {
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface TournamentMatch {
  id: string;
  team1: string;
  team2: string;
  score1?: number;
  score2?: number;
  date: string;
  status: "upcoming" | "live" | "completed";
  sport: string;
}

export interface ScoutingReport {
  id: string;
  athleteName: string;
  sport: string;
  rating: number;
  strengths: string[];
  age: number;
  status: "watching" | "contacted" | "trial" | "signed";
}
