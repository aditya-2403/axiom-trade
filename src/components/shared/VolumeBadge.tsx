"use client";

import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import { memo } from "react";

interface VolumeBadgeProps {
  volume: number;
  className?: string;
}

const VolumeBadge = memo(function VolumeBadge({
  volume,
  className,
}: VolumeBadgeProps) {
  const getVolumeLevel = (vol: number) => {
    if (vol > 500000000) return "high";
    if (vol > 100000000) return "medium";
    return "low";
  };

  const level = getVolumeLevel(volume);
  const levelClasses = {
    high: "bg-green-500/20 text-green-400 border-green-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border",
        levelClasses[level],
        className
      )}
    >
      <TrendingUp className="w-3 h-3" />
      <span className="font-medium text-sm">
        {volume >= 1e9
          ? `$${(volume / 1e9).toFixed(1)}B`
          : volume >= 1e6
            ? `$${(volume / 1e6).toFixed(1)}M`
            : `$${(volume / 1e3).toFixed(0)}K`}
      </span>
    </div>
  );
});

VolumeBadge.displayName = "VolumeBadge";

export default VolumeBadge;
