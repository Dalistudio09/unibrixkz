import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { hero, whatsappLink } from "@/content";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";

export function Hero() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-navy text-surface">
      <img
        src="/images/hero.webp"
        alt="Монтаж камеры видеонаблюдения на объекте"
        width={1792}
        height={1008}
        className="photo-live absolute inset-0 size-full object-cover outline-none"
      />
      <div className="absolute inset-0 bg-linear-to-r from-navy/88 via-navy/55 to-navy/20" />
      <div className="hero-grid absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-navy to-transparent" />

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-4 pt-24 pb-20 sm:px-6">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-surface/15 bg-surface/5 px-3 py-1.5 text-sm text-surface/85">
          <MapPin className="size-4 text-cyan" />
          {hero.eyebrow}
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {hero.title}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-surface/78 sm:text-xl">
          {hero.subtitle}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild variant="primary" size="xl">
            <Link to="/" hash="zayavka">
              {hero.primaryCta}
              <ArrowRight className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="whatsapp" size="xl">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-5" />
              {hero.secondaryCta}
            </a>
          </Button>
        </div>
        <p className="mt-6 text-sm text-surface/55">{hero.note}</p>
      </div>
    </section>
  );
}
