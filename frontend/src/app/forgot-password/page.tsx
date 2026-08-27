"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowRight, Loader2, CheckCircle2, KeyRound, AlertCircle } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { GuestGuard } from "@/components/auth/guest-guard";
import { forgotPasswordSchema, ForgotPasswordFormData } from "@/lib/validations/auth";
import { authApi } from "@/lib/api/auth";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await authApi.forgotPassword({ email: data.email });
      setSubmittedEmail(data.email);
      setIsSent(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to process password reset request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GuestGuard>
      <AuthShell>
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-md p-7 sm:p-9 md:p-10 shadow-sm transition-colors duration-300">
          
          {/* Header Section */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center justify-center mb-1">
              <div className="w-12 h-12 rounded-md flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[#061474] dark:text-blue-400 shadow-xs">
                <KeyRound className="w-6 h-6 stroke-[1.75]" />
              </div>
            </div>

            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Account Recovery
            </p>
            <h1 className="font-sora font-bold text-2xl text-[#061474] dark:text-white">
              Forgot your password?
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
              Enter the email address associated with your GoMatric account and we&apos;ll send you a password reset link.
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-md bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 flex items-center gap-2.5 text-red-800 dark:text-red-300 text-xs sm:text-sm animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message View */}
          {isSent ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-900 dark:text-emerald-200">
                    Recovery instructions dispatched!
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                    If {submittedEmail ? <strong>{submittedEmail}</strong> : "your email"} exists in our system, we&apos;ve sent a 6-digit recovery code.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/reset-password?email=${encodeURIComponent(submittedEmail)}`}
                  className="w-full h-12 rounded-md bg-[#061474] hover:bg-[#030A3A] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <span>Enter Recovery Code</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/login"
                  className="w-full h-12 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Reset Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <AuthFormField
                label="Email Address"
                type="email"
                icon={Mail}
                placeholder="name@example.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 mt-3 rounded-md bg-[#061474] hover:bg-[#030A3A] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold text-sm sm:text-[15px] flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Back Link */}
          <div className="border-t border-slate-100 dark:border-slate-800 my-6" />

          <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-bold text-[#061474] dark:text-blue-400 hover:text-[#ED1B26] dark:hover:text-[#ED1B26] transition-colors"
            >
              Sign In
            </Link>
          </p>

        </div>
      </AuthShell>
    </GuestGuard>
  );
}
