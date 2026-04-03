import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "stable";
  icon?: ReactNode;
  color?: "green" | "emerald" | "lime" | "teal" | "grey";
}

export default function StatCard({
  label,
  value,
  change,
  trend = "stable",
  icon,
  color = "green",
}: StatCardProps) {
  const trendColors = {
    up: "text-brand-400",
    down: "text-rose-400",
    stable: "text-surface-400",
  };

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-surface-400">{label}</p>
        {icon && (
          <div className="p-2 rounded-lg bg-brand-500/10 border border-brand-500/10">
            {icon}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-white mb-2 font-display">{value}</p>
      {change !== undefined && (
        <div className={`flex items-center gap-1 text-sm ${trendColors[trend]}`}>
          <TrendIcon className="w-4 h-4" />
          <span>{Math.abs(change)}%</span>
          <span className="text-surface-500 ml-1">vs last week</span>
        </div>
      )}
    </div>
  );
}
