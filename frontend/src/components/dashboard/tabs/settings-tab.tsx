"use client";

import { useState } from "react";
import { User, Mail, Phone, Lock, Bell, Shield, Check } from "lucide-react";
import { AuthUser } from "@/lib/api/auth";
import { Role } from "@/lib/permissions";

interface SettingsTabProps {
  user: AuthUser | null;
  role: Role;
}

export function SettingsTab({ user, role }: SettingsTabProps) {
  const [name, setName] = useState(user?.name || "Alexander Rossi");
  const [email, setEmail] = useState(user?.email || "alexander@gomatric.com");
  const [phone, setPhone] = useState(user?.phone || "+1 555-0192");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="font-sora font-bold text-xl text-slate-900 dark:text-white">
            Profile & Account Settings
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Manage your personal profile details, notification preferences, and security credentials
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Avatar Row */}
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#061474] to-blue-500 text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
              {name ? name.slice(0, 2).toUpperCase() : "AR"}
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-white block">
                {name}
              </span>
              <span className="text-xs text-slate-400">
                Assigned Role: <strong className="text-[#061474] dark:text-blue-400 font-bold">[{role}]</strong>
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed opacity-75"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {isSaved ? (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Profile updated successfully!</span>
              </span>
            ) : <span />}

            <button
              type="submit"
              className="h-10 px-6 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-xs transition-all shadow-xs"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
