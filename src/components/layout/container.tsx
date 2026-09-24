import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  wash,
  children,
}: {
  id?: string;
  className?: string;
  wash?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24",
        className,
      )}
    >
      {wash ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            src={wash}
            alt=""
            className="photo-live size-full object-cover"
          />
          <div className="absolute inset-0 bg-surface/62" />
        </div>
      ) : null}
      <div className={wash ? "relative" : undefined}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p
          className={cn(
            "text-sm font-medium tracking-wide",
            invert ? "text-cyan" : "text-cyan-deep",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl",
          invert ? "text-surface" : "text-fg",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            invert ? "text-surface/75" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
