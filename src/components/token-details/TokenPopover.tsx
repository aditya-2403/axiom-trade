"use client";

import * as Popover from "@radix-ui/react-popover";
import { Token } from "@/types";
import { cn } from "@/lib/utils";
import {
  Copy,
  Star,
  Bell,
  Share2,
  BarChart3,
  AlertTriangle,
  Wallet,
} from "lucide-react";
import { memo, useState } from "react";

interface TokenPopoverProps {
  token: Token;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const TokenPopover = memo(function TokenPopover({
  token,
  children,
  isOpen,
  onOpenChange,
}: TokenPopoverProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const menuItems = [
    { icon: Star, label: "Add to Watchlist", color: "text-yellow-400" },
    { icon: Bell, label: "Set Price Alert", color: "text-blue-400" },
    { icon: Share2, label: "Share Token", color: "text-green-400" },
    { icon: BarChart3, label: "View Analytics", color: "text-purple-400" },
    { icon: Wallet, label: "Add to Wallet", color: "text-orange-400" },
    { icon: AlertTriangle, label: "Report Issue", color: "text-red-400" },
  ];

  return (
    <Popover.Root {...(isOpen !== undefined && { open: isOpen })} {...(onOpenChange !== undefined && { onOpenChange })}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-50 w-64 bg-axiom-card border border-axiom-border rounded-lg shadow-lg p-2 animate-in fade-in-0 zoom-in-95"
          sideOffset={5}
          collisionPadding={20}
          align="end"
        >
          {/* Token Info */}
          <div className="p-3 border-b border-axiom-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {token.symbol.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-100 text-sm">
                  {token.name}
                </h4>
                <p className="text-xs text-gray-400">{token.symbol}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 p-2 bg-gray-900/50 rounded-lg">
              <code className="flex-1 text-xs text-gray-400 font-mono truncate">
                {token.address.slice(0, 12)}...{token.address.slice(-6)}
              </code>
              <button
                onClick={handleCopyAddress}
                className="p-1.5 hover:bg-gray-800 rounded-md transition-colors"
                title="Copy address"
              >
                <Copy
                  className={cn(
                    "w-3.5 h-3.5",
                    copied ? "text-green-400" : "text-gray-400"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-900/50 rounded-md transition-colors"
              >
                <item.icon className={cn("w-4 h-4", item.color)} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-t border-axiom-border">
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                Buy
              </button>
              <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm font-medium transition-colors">
                Sell
              </button>
            </div>
          </div>

          <Popover.Arrow className="fill-axiom-border" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
});

TokenPopover.displayName = "TokenPopover";

export default TokenPopover;
