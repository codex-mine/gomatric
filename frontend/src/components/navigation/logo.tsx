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
      className={cn("flex items-center gap-1.5 group select-none", className)}
    >
      {/* Crisp Circular Emblem */}
      <div className="relative w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] md:w-[46px] md:h-[46px] rounded-full overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/fav.png"
          alt="GoMatric"
          fill
          sizes="64px"
          priority
          className="object-contain scale-105"
        />
      </div>

      {/* Matching GoMatric Bold Typography (refined size) */}
      {showText && (
        <span
          className={cn(
            "font-sora font-extrabold text-[16px] sm:text-[17px] md:text-[18px] tracking-[-0.02em] transition-colors duration-300 leading-none",
            isWhite ? "text-white" : "text-[#061474]"
          )}
        >
          GoMatric
        </span>
      )}
    </Link>
  );
}
