import { Link } from "@tanstack/react-router";
import mark from "@/assets/brand/mark.png";
import wordmark from "@/assets/brand/wordmark.png";
import wordmarkLight from "@/assets/brand/wordmark-light.png";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function Logo({ variant = "dark", className }: LogoProps) {
  const word = variant === "light" ? wordmarkLight : wordmark;

  return (
    <Link
      to="/"
      aria-label="Unibrix — на главную"
      className={cn("inline-flex items-center gap-2.5 no-underline", className)}
    >
      <img
        src={mark}
        alt=""
        width={36}
        height={34}
        className="h-9 w-auto shrink-0 outline-none"
      />
      <img
        src={word}
        alt="Unibrix"
        width={132}
        height={37}
        className="h-7 w-auto shrink-0 object-contain object-left outline-none sm:h-8"
      />
    </Link>
  );
}