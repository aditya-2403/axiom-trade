"use client";

import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";
import { memo } from "react";

interface PriceChangeProps {
  value: number;
  percent?: boolean;
  showIcon?: boolean;
  className?: string;
}

const PriceChange = memo(function PriceChange({
  value,
  percent = false,
  showIcon = true,
  className,
}: PriceChangeProps) {
  const isPositive = value >= 0;
  const absValue = Math.abs(value);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-md transition-colors",
        isPositive
          ? "bg-positive/10 text-positive"
          : "bg-negative/10 text-negative",
        className
      )}
    >
      {showIcon &&
        (isPositive ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        ))}
      <span className="font-medium tabular-nums">
        {isPositive ? "+" : "-"}
        {percent ? `${absValue.toFixed(2)}%` : `$${absValue.toFixed(2)}`}
      </span>
    </div>
  );
});

PriceChange.displayName = "PriceChange";

export default PriceChange;
