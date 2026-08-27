import React from "react";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { MiniSparkline } from "./charts/mini-sparkline";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtext?: string;
  icon: LucideIcon;
  iconColor?: string;
  sparklineData?: number[];
  sparklineColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  subtext,
  icon: Icon,
  iconColor = "text-[#061474] bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400",
  sparklineData,
  sparklineColor,
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 truncate">
            {title}
          </span>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconColor}`}>
            <Icon className="w-4 h-4" />
          </div>
        </div>

        <div className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
          {value}
        </div>
      </div>

      <div className="flex items-end justify-between pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/80">
        <div className="space-y-0.5">
          {change && (
            <div className="flex items-center gap-1 text-xs font-bold">
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 text-red-500 dark:text-red-400 stroke-[2.5]" />
              )}
              <span className={isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}>
                {change}
              </span>
            </div>
          )}
          {subtext && (
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
              {subtext}
            </p>
          )}
        </div>

        {sparklineData && sparklineData.length > 1 && (
          <MiniSparkline
            data={sparklineData}
            color={sparklineColor || (isPositive ? "#10b981" : "#ef4444")}
          />
        )}
      </div>
    </div>
  );
}
