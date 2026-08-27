"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { GuestGuard } from "@/components/auth/guest-guard";
import { loginSchema, LoginFormData } from "@/lib/validations/auth";
import { useAuth } from "@/providers/auth-provider";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await login(data);
      setSuccessMessage("Signed in successfully! Redirecting...");
      
      // If email is not verified, redirect to verify-email
      if (response.user && !response.user.isEmailVerified) {
        setTimeout(() => {
          router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
        }, 800);
      } else {
        setTimeout(() => {
          router.push(redirectUrl);
        }, 800);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-md p-7 sm:p-9 md:p-10 shadow-sm transition-colors duration-300">
        
        {/* ======================================================== */}
        {/* Top Brand Header                                         */}
        {/* ======================================================== */}
        <div className="text-center space-y-1.5 mb-8">
          {/* Flight Emblem Icon */}
          <div className="inline-flex items-center justify-center mb-2">
            <div className="relative w-12 h-12 rounded-full flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <Image
                src="/fav.png"
                alt="GoMatric"
                width={36}
                height={36}
                priority
                className="object-contain"
              />
            </div>
          </div>

          <h2 className="font-sora font-extrabold text-2xl tracking-tight text-[#061474] dark:text-white">
            GoMatric
          </h2>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Your Journey Starts Here
          </p>

          <div className="pt-3">
            <h1 className="font-sora font-bold text-2xl text-[#061474] dark:text-white">
              Welcome back.
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Sign in to continue planning your next journey.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-md bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 flex items-center gap-2.5 text-red-800 dark:text-red-300 text-xs sm:text-sm animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* Sign In Form                                             */}
        {/* ======================================================== */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AuthFormField
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <AuthFormField
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            rightLabelAction={
              <Link href="/forgot-password">
                Forgot password?
              </Link>
            }
            error={errors.password?.message}
            {...register("password")}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-2 rounded-md bg-[#061474] hover:bg-[#030A3A] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold text-sm sm:text-[15px] flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* ======================================================== */}
        {/* OR Divider                                               */}
        {/* ======================================================== */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-slate-200 dark:border-slate-700" />
          </div>
          <span className="relative bg-white dark:bg-slate-900 px-3 text-[11px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
            Or
          </span>
        </div>

        {/* ======================================================== */}
        {/* Social Login Button                                      */}
        {/* ======================================================== */}
        <button
          type="button"
          onClick={() => {
            console.log("Social Login Triggered: Google OAuth");
          }}
          className="w-full h-12 rounded-md border border-slate-200 dark:border-slate-700/90 bg-[#F8FAFC]/70 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-xs hover:border-slate-300 dark:hover:border-slate-600"
        >
          {/* Google G SVG */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* ======================================================== */}
        {/* Bottom Switch Link                                       */}
        {/* ======================================================== */}
        <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-8">
          New to GoMatric?{" "}
          <Link
            href="/register"
            className="font-bold text-[#061474] dark:text-blue-400 hover:text-[#ED1B26] dark:hover:text-[#ED1B26] transition-colors"
          >
            Create an account
          </Link>
        </p>

      </div>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <GuestGuard>
      <Suspense
        fallback={
          <AuthShell>
            <div className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-md p-10 flex items-center justify-center min-h-[350px]">
              <Loader2 className="w-6 h-6 animate-spin text-[#061474] dark:text-blue-400" />
            </div>
          </AuthShell>
        }
      >
        <LoginForm />
      </Suspense>
    </GuestGuard>
  );
}
