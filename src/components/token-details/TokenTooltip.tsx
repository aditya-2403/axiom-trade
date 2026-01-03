"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Token } from "@/types";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Shield,
  Clock,
  ExternalLink,
} from "lucide-react";
import { memo } from "react";

interface TokenTooltipProps {
  token: Token;
  isOpen?: boolean;
}

const TokenTooltip = memo(function TokenTooltip({
  token,
  isOpen,
}: TokenTooltipProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root
        {...(isOpen !== undefined && { open: isOpen })}
        delayDuration={300}
      >
        <Tooltip.Trigger asChild>
          <div className="inline-flex">
            <button className="p-1 hover:bg-axiom-border rounded-md transition-colors">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 16v-4M12 8h.01"
                />
              </svg>
            </button>
          </div>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 max-w-sm bg-axiom-card border border-axiom-border rounded-lg shadow-lg p-4 animate-in fade-in-0 zoom-in-95"
            sideOffset={5}
            collisionPadding={20}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {token.symbol.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-100">
                      {token.name}
                    </h4>
                    <p className="text-sm text-gray-400">{token.symbol}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-300">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-axiom-border">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Market Cap</p>
                  <p className="font-medium text-gray-100">
                    ${(token.price * 1000000).toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">FDV</p>
                  <p className="font-medium text-gray-100">
                    ${(token.price * 5000000).toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Holders</p>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span className="font-medium text-gray-100">1,245</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Safety</p>
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-green-400" />
                    <span className="font-medium text-green-400">High</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 pt-2 border-t border-axiom-border">
                {token.category === "new" &&
                  "Recently launched token with growing community."}
                {token.category === "final-stretch" &&
                  "Token in final stages of development with strong fundamentals."}
                {token.category === "migrated" &&
                  "Successfully migrated token with proven track record."}
              </p>

              {/* Actions */}
              <div className="flex gap-2 pt-3">
                <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Trade
                </button>
                <button className="flex-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition-colors">
                  Watchlist
                </button>
              </div>
            </div>

            <Tooltip.Arrow className="fill-axiom-border" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
});

TokenTooltip.displayName = "TokenTooltip";

export default TokenTooltip;
