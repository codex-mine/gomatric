import Image from "next/image";
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
      <div className="relative h-8 md:h-9 w-auto flex items-center shrink-0">
        <Image
          src="/logo.png"
          alt="GoMatric Logo"
          width={150}
          height={38}
          priority
          className={cn(
            "h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105",
            isWhite && "brightness-0 invert"
          )}
        />
      </div>
    </Link>
  );
}
