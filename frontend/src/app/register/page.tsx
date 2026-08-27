"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  Lock,
  RotateCcw,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plane,
} from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { AuthPhoneField } from "@/components/auth/auth-phone-field";
import { GuestGuard } from "@/components/auth/guest-guard";
import { registerSchema, RegisterFormData } from "@/lib/validations/auth";
import { useAuth } from "@/providers/auth-provider";

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneCode: "+1",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await registerUser(data);
      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to create account. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <GuestGuard>
      <AuthShell>
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-md p-7 sm:p-9 md:p-10 shadow-sm relative overflow-hidden transition-colors duration-300">
          
          {/* Decorative Top-Right Airplane Watermark */}
          <div className="absolute top-4 -right-4 w-32 h-32 opacity-5 dark:opacity-10 pointer-events-none select-none">
            <Plane className="w-full h-full text-[#061474] dark:text-blue-400 rotate-45 stroke-[1.5]" />
          </div>

          {/* ======================================================== */}
          {/* Header Section                                           */}
          {/* ======================================================== */}
          <div className="space-y-1 mb-6 relative z-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Begin Your Journey
            </p>
            <h1 className="font-sora font-bold text-2xl sm:text-[26px] text-[#061474] dark:text-white">
              Create your account.
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Everything you need for a smoother journey, in one place.
            </p>
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
          {/* Registration Form                                        */}
          {/* ======================================================== */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 relative z-10">
            {/* Full Name */}
            <AuthFormField
              label="Full Name"
              icon={User}
              placeholder="Enter your full name"
              autoComplete="name"
              error={errors.fullName?.message}
              {...register("fullName")}
            />

            {/* Email Address */}
            <AuthFormField
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="name@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Country Code & Phone Number Field */}
            <AuthPhoneField
              label="Phone Number"
              error={errors.phoneNumber?.message || errors.phoneCode?.message}
              phoneCodeProps={{
                ...register("phoneCode"),
              }}
              phoneNumberProps={{
                placeholder: "(555) 000-0000",
                ...register("phoneNumber"),
              }}
            />

            {/* Side-by-side Password and Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <AuthFormField
                label="Password"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register("password")}
              />
              <AuthFormField
                label="Confirm"
                type="password"
                icon={RotateCcw}
                placeholder="••••••••"
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-4 rounded-md bg-[#061474] hover:bg-[#030A3A] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold text-sm sm:text-[15px] flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Terms Disclaimer */}
            <p className="text-center text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 pt-2 leading-relaxed">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="text-[#061474] dark:text-blue-400 hover:text-[#ED1B26] dark:hover:text-[#ED1B26] font-semibold underline underline-offset-2"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-[#061474] dark:text-blue-400 hover:text-[#ED1B26] dark:hover:text-[#ED1B26] font-semibold underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </form>

          {/* Divider */}
          <div className="border-t border-slate-100 dark:border-slate-800 my-6" />

          {/* Bottom Switch Link */}
          <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
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
