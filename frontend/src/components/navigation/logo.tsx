import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "navy" | "white";
  onClick?: () => void;
}

export function Logo({ className, variant = "navy", onClick }: LogoProps) {
  const isWhite = variant === "white";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("flex items-center gap-2.5 group select-none", className)}
    >
      {/* Red Circular Logo Icon with G */}
      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#ED1B26] flex items-center justify-center text-white shadow-sm ring-2 ring-[#ED1B26]/20 transition-transform duration-300 group-hover:scale-105 shrink-0">
        <span className="font-sora font-extrabold text-base md:text-lg leading-none translate-y-[-0.5px]">
          G
        </span>
      </div>

      {/* Brand Text */}
      <span
        className={cn(
          "font-sora font-bold text-xl md:text-[22px] tracking-tight transition-colors",
          isWhite ? "text-white" : "text-[#061474]"
        )}
      >
        GoMatric
      </span>
    </Link>
  );
}
