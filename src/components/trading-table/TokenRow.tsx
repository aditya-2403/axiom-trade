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
import TokenImage from "../shared/TokenImage";

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
        "px-6 py-5 border-b border-axiom-border/30",
        "hover:bg-axiom-border/10 cursor-pointer transition-colors group"
      )}
      style={{
        display: "grid",
        gridTemplateColumns:
          "192px 128px 144px 112px 160px 144px 112px 128px 96px",
        gap: "15px",
        alignItems: "center",
      }}
      onClick={handleRowClick}
      // onMouseEnter={() => setShowTooltip(true)}
      // onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Token Name */}
      <div className="flex items-center gap-3 min-w-0">
        <TokenImage
          symbol={token.symbol}
          name={token.name}
          imageUrl={token.imageUrl as string}
          chain={token.chain}
          size="md"
        />
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-medium text-gray-100 truncate">
              {token.name}
            </span>
            <TokenTooltip token={token} isOpen={showTooltip} />
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm text-gray-400">{token.symbol}</span>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full border flex-shrink-0",
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
        <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
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
            className={cn(
              "w-2 h-2 rounded-full flex-shrink-0",
              getChainColor(token.chain)
            )}
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
            className="p-2 hover:bg-axiom-border rounded-lg transition-colors flex-shrink-0"
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
