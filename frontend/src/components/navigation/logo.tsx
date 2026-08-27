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
      className={cn("flex items-center gap-2.5 group select-none", className)}
    >
      {/* Large Crisp Emblem Icon */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-xs">
        <Image
          src="/fav.png"
          alt="GoMatric"
          fill
          sizes="40px"
          priority
          className="object-contain"
        />
      </div>

      {/* Horizontal Brand Typography */}
      {showText && (
        <span
          className={cn(
            "font-sora font-bold text-xl sm:text-[22px] tracking-tight transition-colors duration-300",
            isWhite ? "text-white" : "text-[#061474]"
          )}
        >
          GoMatric
        </span>
      )}
    </Link>
  );
}
