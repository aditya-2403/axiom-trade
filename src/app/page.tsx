"use client";

import { Suspense } from "react";
import TokenTable from "@/components/trading-table/TokenTable";
import TableSkeleton from "@/components/trading-table/TableSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { TrendingUp } from "lucide-react";
import StatsOverview from "@/components/shared/StatsOverview";

export default function HomePage() {
  const { activeTab } = useSelector((state: RootState) => state.ui);

  return (
    <div className="space-y-6">
      <StatsOverview />

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
