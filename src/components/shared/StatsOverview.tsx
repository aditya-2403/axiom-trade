"use client";

import { DollarSign, Users, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Stat = {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend: "up" | "down";
};

const stats: Stat[] = [
  {
    label: "Total Volume",
    value: "$2.4B",
    change: "+12.5%",
    icon: DollarSign,
    trend: "up",
  },
  {
    label: "Active Tokens",
    value: "1,248",
    change: "+5.2%",
    icon: Users,
    trend: "up",
  },
  {
    label: "Avg. ROI",
    value: "+45.3%",
    change: "+8.1%",
    icon: TrendingUp,
    trend: "up",
  },
  {
    label: "Risk Score",
    value: "7.2/10",
    change: "-2.3%",
    icon: TrendingDown,
    trend: "down",
  },
];

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-axiom-card border border-axiom-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <stat.icon
              className={cn(
                "w-5 h-5",
                stat.trend === "up" ? "text-green-400" : "text-red-400"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium px-2 py-1 rounded",
                stat.trend === "up"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              )}
            >
              {stat.change}
            </span>
          </div>

          <div className="text-2xl font-bold text-gray-100 mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
