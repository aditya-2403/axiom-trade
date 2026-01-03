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

  const tabs = [
    { id: "all", label: "All Tokens" },
    { id: "new", label: "New Pairs" },
    { id: "final-stretch", label: "Final Stretch" },
    { id: "migrated", label: "Migrated" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-axiom-border bg-axiom-bg/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-100">Axiom Trade</h1>
              <p className="text-xs text-gray-500">Token Discovery</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search tokens, contracts, or pairs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-axiom-card border border-axiom-border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-axiom-border rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <button className="p-2 hover:bg-axiom-border rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>

            <button className="p-2 hover:bg-axiom-border rounded-lg transition-colors">
              <User className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => dispatch(setActiveTab(tab.id as any))}
                className={cn(
                  "px-5 py-2.5 text-sm font-medium rounded-lg transition-colors relative",
                  activeTab === tab.id
                    ? "text-gray-100 bg-axiom-card"
                    : "text-gray-400 hover:text-gray-300 hover:bg-axiom-border/50"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-400 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-300 hover:bg-axiom-border rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>

            <div className="flex items-center bg-axiom-card border border-axiom-border rounded-lg p-1">
              <button
                onClick={() => dispatch(setViewMode("table"))}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  viewMode === "table"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-gray-300"
                )}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => dispatch(setViewMode("grid"))}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-gray-300"
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
