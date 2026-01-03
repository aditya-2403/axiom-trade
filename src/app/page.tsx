"use client";

import { Suspense } from "react";
import TokenTable from "@/components/trading-table/TokenTable";
import TableSkeleton from "@/components/trading-table/TableSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { activeTab } = useSelector((state: RootState) => state.ui);

  const stats = [
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

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
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

      {/* Active Tab Indicator */}
      <div className="bg-axiom-card border border-axiom-border rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-100">
              {activeTab === "all" && "All Tokens"}
              {activeTab === "new" && "New Pairs"}
              {activeTab === "final-stretch" && "Final Stretch"}
              {activeTab === "migrated" && "Migrated Tokens"}
            </h2>
            <p className="text-sm text-gray-400">
              Real-time price updates • Sorted by liquidity
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">
              <span className="text-gray-300 font-medium">3s</span> refresh rate
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-gray-400">Live updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <Suspense fallback={<TableSkeleton />}>
        <TokenTable />
      </Suspense>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-100 mb-1">Trading Hotkeys</h3>
            <p className="text-sm text-gray-400">
              Press{" "}
              <kbd className="px-2 py-1 bg-axiom-border rounded text-xs font-mono">
                ⌘K
              </kbd>{" "}
              to open command palette or{" "}
              <kbd className="px-2 py-1 bg-axiom-border rounded text-xs font-mono">
                Space
              </kbd>{" "}
              to quickly trade selected token.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
