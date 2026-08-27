import React from "react";
import { LucideIcon, Clock, CheckCircle2, AlertCircle, FileText, Bookmark, Banknote, Plane } from "lucide-react";

export interface ActivityItem {
  id: string;
  title: string;
  subject: string;
  time: string;
  type?: "application" | "booking" | "payment" | "tour" | "system";
  statusColor?: string;
  icon?: LucideIcon;
}

interface ActivityTimelineProps {
  items: ActivityItem[];
  title?: string;
  subtitle?: string;
}

const TYPE_ICONS: Record<string, LucideIcon> = {
  application: FileText,
  booking: Bookmark,
  payment: Banknote,
  tour: Plane,
  system: CheckCircle2,
};

export function ActivityTimeline({
  items,
  title = "Recent Activities",
  subtitle = "Real-time updates and chronological platform actions",
}: ActivityTimelineProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sora font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <Clock className="w-4 h-4 text-slate-400" />
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const Icon = item.icon || TYPE_ICONS[item.type || "system"] || FileText;
          const isLast = idx === items.length - 1;

          return (
            <div key={item.id} className="relative flex items-start gap-3.5 group">
              {/* Connector line */}
              {!isLast && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800" />
              )}

              {/* Icon Bubble */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  item.statusColor ||
                  "bg-blue-50 dark:bg-blue-950/60 text-[#061474] dark:text-blue-400 border border-blue-100 dark:border-blue-900/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Activity Info */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                  <span className="font-normal">{item.title} </span>
                  <strong className="font-bold text-slate-900 dark:text-white truncate inline-block max-w-[200px] align-bottom">
                    {item.subject}
                  </strong>
                </p>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium block mt-0.5">
                  {item.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
