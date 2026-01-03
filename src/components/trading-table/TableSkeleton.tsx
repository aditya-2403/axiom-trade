"use client";

import { memo } from "react";

const TableSkeleton = memo(function TableSkeleton() {
  return (
    <div className="w-full overflow-hidden">
      {/* Table Header Skeleton */}
      <div className="grid grid-cols-9 gap-4 px-6 py-4 border-b border-axiom-border">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="h-4 skeleton rounded" />
        ))}
      </div>

      {/* Table Rows Skeleton */}
      {[...Array(5)].map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-9 gap-4 px-6 py-5 border-b border-axiom-border/50"
        >
          {/* Token Name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full skeleton" />
            <div className="space-y-2">
              <div className="w-20 h-3 skeleton rounded" />
              <div className="w-12 h-2 skeleton rounded" />
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="w-16 h-4 skeleton rounded" />
            <div className="w-12 h-2 skeleton rounded" />
          </div>

          {/* 24h Change */}
          <div className="w-20 h-6 skeleton rounded-md" />

          {/* 24h % */}
          <div className="w-16 h-6 skeleton rounded-md" />

          {/* Volume */}
          <div className="w-24 h-6 skeleton rounded-md" />

          {/* Liquidity */}
          <div className="w-20 h-6 skeleton rounded-md" />

          {/* Age */}
          <div className="w-16 h-5 skeleton rounded" />

          {/* Chain */}
          <div className="w-20 h-6 skeleton rounded-full" />

          {/* Actions */}
          <div className="w-16 h-8 skeleton rounded-lg" />
        </div>
      ))}

      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
});

TableSkeleton.displayName = "TableSkeleton";

export default TableSkeleton;
