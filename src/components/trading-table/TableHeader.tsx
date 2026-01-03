"use client";

import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";
import { memo } from "react";
import { COLUMNS } from "@/lib/constants";
import { Token } from "@/types";

interface TableHeaderProps {
  sortBy: keyof Token | null;
  sortDirection: "asc" | "desc";
  onSort: (column: keyof Token) => void;
}

const TableHeader = memo(function TableHeader({
  sortBy,
  sortDirection,
  onSort,
}: TableHeaderProps) {
  return (
    <div
      className="px-6 py-4 border-b border-axiom-border bg-axiom-card/50 sticky top-0 z-10"
      style={{
        display: "grid",
        gridTemplateColumns:
          "192px 128px 144px 112px 160px 144px 112px 128px 96px",
        gap: "19px",
        alignItems: "center",
      }}
    >
      {COLUMNS.map((column) => (
        <div
          key={column.key}
          className={cn(
            "flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider",
            column.sortable && "cursor-pointer hover:text-gray-300 select-none"
          )}
          onClick={() => column.sortable && onSort(column.key as keyof Token)}
        >
          <span className="truncate">{column.label}</span>
          {column.sortable && sortBy === column.key && (
            <div className="flex flex-col flex-shrink-0">
              <ChevronUp
                className={cn(
                  "w-3 h-3 -mb-1",
                  sortDirection === "asc" ? "text-gray-300" : "text-gray-600"
                )}
              />
              <ChevronDown
                className={cn(
                  "w-3 h-3 -mt-1",
                  sortDirection === "desc" ? "text-gray-300" : "text-gray-600"
                )}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

TableHeader.displayName = "TableHeader";

export default TableHeader;
