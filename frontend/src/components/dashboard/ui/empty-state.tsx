import React, { ReactNode } from "react";
import { FolderOpen, LucideIcon } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  badge?: string;
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon: Icon = FolderOpen,
  badge,
  action,
}: EmptyStateProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-10 sm:p-14 text-center space-y-4 shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto shadow-xs">
        <Icon className="w-7 h-7" />
      </div>

      <div className="space-y-1.5 max-w-md mx-auto">
        {badge && (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            {badge}
          </div>
        )}
        <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {action && <div className="pt-3 flex items-center justify-center gap-3">{action}</div>}
    </div>
  );
}
