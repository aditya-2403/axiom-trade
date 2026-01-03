"use client";

import { memo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  Bell,
  Settings,
  User,
  TrendingUp,
  Filter,
  Grid3x3,
  List,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setActiveTab, setViewMode } from "@/store/slices/uiSlice";

const Header = memo(function Header() {
  const dispatch = useDispatch();
  const { activeTab, viewMode } = useSelector((state: RootState) => state.ui);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const tabs = [
    { id: "all", label: "All Tokens" },
    { id: "new", label: "New Pairs" },
    { id: "final-stretch", label: "Final Stretch" },
    { id: "migrated", label: "Migrated" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-axiom-border bg-axiom-bg/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-2 sm:px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-sm sm:text-xl font-bold text-gray-100">
                Axiom Trade
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500">
                Token Discovery
              </p>
            </div>
          </div>

          {/* Search (desktop) */}
          <div className="hidden sm:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search tokens, contracts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-axiom-card border border-axiom-border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Toggle */}
            <button
              className="p-2 sm:hidden"
              onClick={() => setShowMobileSearch((p) => !p)}
            >
              <Search className="w-5 h-5 text-gray-400" />
            </button>

            <button className="p-2 relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <button className="hidden sm:block p-2">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>

            <button className="hidden sm:block p-2">
              <User className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        {showMobileSearch && (
          <div className="sm:hidden px-1 pb-2">
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-axiom-card border border-axiom-border rounded-lg text-gray-100 placeholder-gray-500"
            />
          </div>
        )}

        {/* Tabs + Controls */}
        <div className="flex items-center justify-between h-12 sm:h-14 gap-2">
          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => dispatch(setActiveTab(tab.id as any))}
                className={cn(
                  "whitespace-nowrap px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors",
                  activeTab === tab.id
                    ? "text-gray-100 bg-axiom-card"
                    : "text-gray-400 hover:text-gray-300 hover:bg-axiom-border/50"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-300">
              <Filter className="w-4 h-4" />
              Filters
            </button>

            <div className="flex bg-axiom-card border border-axiom-border rounded-lg p-1">
              <button
                onClick={() => dispatch(setViewMode("table"))}
                className={cn(
                  "p-1.5 rounded",
                  viewMode === "table"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400"
                )}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => dispatch(setViewMode("grid"))}
                className={cn(
                  "p-1.5 rounded",
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400"
                )}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";
export default Header;
