"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  breakpoint?: "sm" | "md" | "lg" | "xl";
}

export default function ResponsiveContainer({
  children,
  className,
  breakpoint = "lg",
}: ResponsiveContainerProps) {
  const breakpointClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
  };

  return (
    <div
      className={cn(
        "w-full mx-auto px-4",
        breakpointClasses[breakpoint],
        className
      )}
    >
      {children}
    </div>
  );
}
