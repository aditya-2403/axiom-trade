"use client";

import { cn } from "@/lib/utils";
import { Token } from "@/types";
import { memo, useState } from "react";
import {
  ExternalLink,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertCircle,
} from "lucide-react";
import PriceChange from "../shared/PriceChange";
import VolumeBadge from "../shared/VolumeBadge";
import TokenPopover from "../token-details/TokenPopover";
import TokenTooltip from "../token-details/TokenTooltip";
import { CATEGORY_COLORS, CHAINS } from "@/lib/constants";
import { useDispatch } from "react-redux";
import { selectToken } from "@/store/slices/tokenSlice";

interface TokenRowProps {
  token: Token;
  onTokenClick?: (token: Token) => void;
}

const TokenRow = memo(function TokenRow({
  token,
  onTokenClick,
}: TokenRowProps) {
  const dispatch = useDispatch();
  const [showPopover, setShowPopover] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleRowClick = () => {
    if (onTokenClick) {
      onTokenClick(token);
    } else {
      dispatch(selectToken(token));
    }
  };

  const getChainColor = (chainName: string) => {
    const chain = CHAINS.find((c) => c.name === chainName);
    return chain?.color || "bg-gray-500";
  };

  const formatAge = (hours: number) => {
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div
      className={cn(
        "grid grid-cols-9 gap-4 px-6 py-5 border-b border-axiom-border/30",
        "hover:bg-axiom-border/10 cursor-pointer transition-colors group",
        showPopover && "bg-axiom-border/10"
      )}
      onClick={handleRowClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Token Name */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {token.symbol.charAt(0)}
            </span>
          </div>
          <div
            className={cn(
              "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-axiom-bg",
              getChainColor(token.chain)
            )}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-100">{token.name}</span>
            <TokenTooltip token={token} isOpen={showTooltip} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{token.symbol}</span>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full border",
                CATEGORY_COLORS[token.category]
              )}
            >
              {token.category.replace("-", " ")}
            </span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col justify-center">
        <div className="font-medium text-gray-100 tabular-nums">
          $
          {token.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
          })}
        </div>
        <div className="text-xs text-gray-500">updated now</div>
      </div>

      {/* 24h Change */}
      <div className="flex items-center">
        <PriceChange value={token.priceChange24h} />
      </div>

      {/* 24h % */}
      <div className="flex items-center">
        <PriceChange
          value={token.priceChangePercent24h}
          percent
          showIcon={false}
        />
      </div>

      {/* 24h Volume */}
      <div className="flex items-center">
        <VolumeBadge volume={token.volume24h} />
      </div>

      {/* Liquidity */}
      <div className="flex flex-col justify-center">
        <div className="font-medium text-gray-100">
          ${(token.liquidity / 1e6).toFixed(1)}M
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          <span>{((token.volume24h / token.liquidity) * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Age */}
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-500" />
        <span className="font-medium text-gray-300">
          {formatAge(token.age)}
        </span>
      </div>

      {/* Chain */}
      <div className="flex items-center">
        <div
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2",
            "bg-gray-900/50 text-gray-300"
          )}
        >
          <div
            className={cn("w-2 h-2 rounded-full", getChainColor(token.chain))}
          />
          {token.chain}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end">
        <TokenPopover
          token={token}
          isOpen={showPopover}
          onOpenChange={setShowPopover}
        >
          <button
            className="p-2 hover:bg-axiom-border rounded-lg transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setShowPopover(true);
            }}
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </TokenPopover>
      </div>
    </div>
  );
});

TokenRow.displayName = "TokenRow";

export default TokenRow;
