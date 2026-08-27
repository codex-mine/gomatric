"use client";

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Loader2, CheckCircle2, ShieldCheck, RefreshCw, AlertCircle } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { authApi } from "@/lib/api/auth";
import { useAuth } from "@/providers/auth-provider";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const { verifyEmail } = useAuth();
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [resendCooldown, setResendCooldown] = useState(45);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend Countdown Timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // 3-second redirect countdown to dashboard on successful verification
  useEffect(() => {
    if (!isVerified) return;

    if (countdown <= 0) {
      router.push("/dashboard");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isVerified, countdown, router]);

  const handleDigitChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleanValue;
    setDigits(newDigits);
    setError(null);

    // Auto-advance focus to next input
    if (cleanValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    const newDigits = [...digits];
    for (let i = 0; i < pastedData.length; i++) {
      newDigits[i] = pastedData[i];
    }
    setDigits(newDigits);
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = digits.join("");

    if (verificationCode.length < 6) {
      setError("Please enter all 6 digits of your verification code.");
      return;
    }

    if (!email) {
      setError("Email address is missing. Please return to the registration or login page.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await verifyEmail(email, verificationCode);
      setIsVerified(true);
    } catch (err: any) {
      setError(err.message || "Invalid or expired verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !email) return;
    setResendCooldown(60);
    setError(null);
    setInfoMessage(null);

    try {
      const res = await authApi.resendVerification({ email });
      setInfoMessage(res.message || "A new 6-digit code has been sent to your email.");
    } catch (err: any) {
      setError(err.message || "Failed to resend code. Please try again later.");
    }
  };

  return (
    <AuthShell>
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-md p-7 sm:p-9 md:p-10 shadow-sm transition-colors duration-300">
        
        {/* Header Section */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center mb-1">
            <div className="w-12 h-12 rounded-md flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[#061474] dark:text-blue-400 shadow-xs">
              <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
            </div>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            Email Verification
          </p>
          <h1 className="font-sora font-bold text-2xl text-[#061474] dark:text-white">
            Check your email.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
            We&apos;ve sent a 6-digit verification code to{" "}
            {email ? <strong className="text-slate-700 dark:text-slate-200">{email}</strong> : "your email"}.
            Enter it below to activate your account.
          </p>
        </div>

        {/* Info Message Alert */}
        {infoMessage && (
          <div className="mb-6 p-4 rounded-md bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 flex items-center gap-2.5 text-blue-800 dark:text-blue-300 text-xs sm:text-sm animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
            <span>{infoMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 flex items-center gap-2.5 text-red-800 dark:text-red-300 text-xs sm:text-sm animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Success View */}
        {isVerified ? (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-4 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-900 dark:text-emerald-200">
                  Email verified successfully!
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                  Your GoMatric account is fully activated. Redirecting to your dashboard in{" "}
                  <strong className="text-emerald-950 dark:text-emerald-100 font-bold">{countdown}</strong>{" "}
                  {countdown === 1 ? "second" : "seconds"}...
                </p>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="w-full h-12 rounded-md bg-[#061474] hover:bg-[#030A3A] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <span>Go to Dashboard ({countdown}s)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* 6-Digit OTP Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-center gap-2 sm:gap-2.5">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-11 h-13 sm:w-13 sm:h-14 text-center font-sora font-bold text-xl sm:text-2xl text-[#061474] dark:text-white bg-[#F8FAFC]/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md transition-all duration-200 focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 focus:ring-2 focus:ring-[#061474]/10 dark:focus:ring-blue-500/20 outline-none shadow-xs"
                />
              ))}
            </div>

            {error && (
              <p className="text-center text-xs text-red-500 font-medium animate-fadeIn">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading || digits.join("").length < 6}
              className="w-full h-12 mt-2 rounded-md bg-[#061474] hover:bg-[#030A3A] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold text-sm sm:text-[15px] flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <span>Verify Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Resend Code Action */}
            <div className="text-center pt-1">
              {resendCooldown > 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Resend code in{" "}
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {resendCooldown}s
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#061474] dark:text-blue-400 hover:text-[#ED1B26] dark:hover:text-[#ED1B26] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Resend Verification Code</span>
                </button>
              )}
            </div>
          </form>
        )}

        {/* Back Link */}
        <div className="border-t border-slate-100 dark:border-slate-800 my-6" />

        <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Wrong email address?{" "}
          <Link
            href="/register"
            className="font-bold text-[#061474] dark:text-blue-400 hover:text-[#ED1B26] dark:hover:text-[#ED1B26] transition-colors"
          >
            Change email
          </Link>
        </p>

      </div>
    </AuthShell>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <AuthShell>
          <div className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-md p-10 flex items-center justify-center min-h-[350px]">
            <Loader2 className="w-6 h-6 animate-spin text-[#061474] dark:text-blue-400" />
          </div>
        </AuthShell>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
