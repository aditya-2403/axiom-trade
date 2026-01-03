"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Token } from "@/types";
import { cn } from "@/lib/utils";
import {
  X,
  ExternalLink,
  Copy,
  TrendingUp,
  TrendingDown,
  Users,
  Shield,
  Clock,
  BarChart3,
  Globe,
  MessageSquare,
} from "lucide-react";
import { memo, useState } from "react";
import PriceChange from "../shared/PriceChange";
import VolumeBadge from "../shared/VolumeBadge";

interface TokenModalProps {
  token: Token;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TokenModal = memo(function TokenModal({
  token,
  isOpen,
  onOpenChange,
}: TokenModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "charts" | "trades">(
    "overview"
  );

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "charts", label: "Charts", icon: TrendingUp },
    { id: "trades", label: "Recent Trades", icon: MessageSquare },
  ];

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-in fade-in-0" />

        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] bg-axiom-card border border-axiom-border rounded-xl shadow-2xl z-50 animate-in fade-in-0 zoom-in-95 overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-axiom-card/95 backdrop-blur-sm border-b border-axiom-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {token.symbol.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-axiom-card flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <Dialog.Title className="text-2xl font-bold text-gray-100">
                    {token.name} ({token.symbol})
                  </Dialog.Title>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-lg font-semibold text-gray-100">
                      $
                      {token.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6,
                      })}
                    </span>
                    <PriceChange value={token.priceChangePercent24h} percent />
                    <span className="text-sm text-gray-400">24h</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyAddress}
                  className={cn(
                    "px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors",
                    copied
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  )}
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy Address"}
                </button>
                <Dialog.Close asChild>
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </Dialog.Close>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-axiom-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative",
                    activeTab === tab.id
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-gray-300"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {activeTab === "overview" && (
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Market Stats */}
                  <div className="bg-gray-900/30 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">
                      Market Stats
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Market Cap</span>
                        <span className="font-semibold text-gray-100">
                          ${(token.price * 1000000).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">24h Volume</span>
                        <VolumeBadge volume={token.volume24h} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Liquidity</span>
                        <span className="font-semibold text-gray-100">
                          ${(token.liquidity / 1e6).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">FDV</span>
                        <span className="font-semibold text-gray-100">
                          ${(token.price * 5000000).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Token Info */}
                  <div className="bg-gray-900/30 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">
                      Token Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Age
                        </span>
                        <span className="font-medium text-gray-100">
                          {token.age < 24
                            ? `${token.age}h`
                            : `${Math.floor(token.age / 24)}d`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Chain
                        </span>
                        <span className="font-medium text-gray-100">
                          {token.chain}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Holders
                        </span>
                        <span className="font-medium text-gray-100">1,245</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Price Chart (Mock) */}
                  <div className="bg-gray-900/30 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">
                      Price Chart
                    </h3>
                    <div className="h-48 bg-gradient-to-b from-blue-500/10 to-transparent rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                        <p className="text-gray-400">
                          Live chart integration available
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gray-900/30 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                        Buy {token.symbol}
                      </button>
                      <button className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors">
                        Sell {token.symbol}
                      </button>
                      <button className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors col-span-2">
                        Add to Watchlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "charts" && (
              <div className="h-64 flex items-center justify-center bg-gray-900/30 rounded-xl">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">Advanced charting coming soon</p>
                </div>
              </div>
            )}

            {activeTab === "trades" && (
              <div className="h-64 flex items-center justify-center bg-gray-900/30 rounded-xl">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Recent trades will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

TokenModal.displayName = "TokenModal";

export default TokenModal;
