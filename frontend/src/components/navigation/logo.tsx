import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "navy" | "white";
  onClick?: () => void;
  showText?: boolean;
}

export function Logo({
  className,
  variant = "navy",
  onClick,
  showText = true,
}: LogoProps) {
  const isWhite = variant === "white";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("flex items-center gap-3 group select-none", className)}
    >
      {/* Large Crisp Emblem Icon */}
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-xs">
        <Image
          src="/fav.png"
          alt="GoMatric"
          fill
          sizes="56px"
          priority
          className="object-contain"
        />
      </div>

      {/* Horizontal Brand Typography */}
      {showText && (
        <span
          className={cn(
            "font-sora font-bold text-2xl sm:text-[26px] tracking-tight transition-colors duration-300",
            isWhite ? "text-white" : "text-[#061474]"
          )}
        >
          GoMatric
        </span>
      )}
    </Link>
  );
}
