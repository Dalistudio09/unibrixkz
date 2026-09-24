import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Cctv,
  ChevronDown,
  ChevronRight,
  Flame,
  KeyRound,
  Layers,
  ListChecks,
  MapPin,
  Menu,
  Shield,
} from "lucide-react";
import { nav, services, site, whatsappLink, type ServiceId } from "@/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WhatsAppIcon } from "@/components/icons";
import { Logo } from "./logo";

const serviceIcons: Record<ServiceId, typeof Cctv> = {
  video: Cctv,
  alarm: Shield,
  fire: Flame,
  skud: KeyRound,
  complex: Layers,
};

const sectionIcons = {
  "Как работаем": ListChecks,
  Контакты: MapPin,
} as const;

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const overHero = isHome && !scrolled;
  const light = overHero;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color] duration-200",
        overHero
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line/80 bg-surface/95 shadow-nav backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <Logo variant={light ? "light" : "dark"} />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Основное меню"
        >
          <div className="group relative">
            <button
              type="button"
              className={cn(
                "inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors",
                light
                  ? "text-surface/90 hover:bg-surface/10 hover:text-surface"
                  : "text-fg/80 hover:bg-paper hover:text-fg",
              )}
            >
              Услуги
              <ChevronDown className="size-4 opacity-70" />
            </button>
            <div className="invisible absolute top-full left-0 z-50 pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="min-w-72 rounded-xl bg-surface p-2 shadow-card">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    to={service.slug}
                    className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-paper"
                  >
                    <span className="block text-sm font-medium text-fg">
                      {service.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {service.short}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {nav
            .filter((item) => item.label !== "Услуги")
            .map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors",
                  light
                    ? "text-surface/90 hover:bg-surface/10 hover:text-surface"
                    : "text-fg/80 hover:bg-paper hover:text-fg",
                )}
              >
                {item.label}
              </a>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant={light ? "light" : "whatsapp"}
            size="md"
            className="hidden sm:inline-flex"
          >
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </Button>
          <Button
            asChild
            variant={light ? "inverse" : "ghost"}
            size="icon"
            className="sm:hidden"
          >
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в WhatsApp"
            >
              <WhatsAppIcon className="size-5" />
            </a>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant={light ? "inverse" : "ghost"}
                size="icon"
                className="lg:hidden"
                aria-label="Открыть меню"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="z-[70] flex h-dvh max-h-dvh w-full max-w-sm flex-col"
            >
              <SheetHeader className="shrink-0">
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <p className="px-4 pt-4 pb-2 text-xs font-semibold tracking-[0.14em] text-subtle uppercase">
                  Услуги
                </p>
                <ul className="border-y border-line">
                  {services.map((service) => {
                    const Icon = serviceIcons[service.id];
                    return (
                      <li key={service.id} className="border-b border-line last:border-b-0">
                        <SheetClose asChild>
                          <Link
                            to={service.slug}
                            className="flex min-h-14 items-center gap-3 px-4 py-3 text-fg hover:bg-paper"
                          >
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan text-surface">
                              <Icon className="size-4" />
                            </span>
                            <span className="min-w-0 flex-1 text-base font-medium">
                              {service.title}
                            </span>
                            <ChevronRight className="size-4 shrink-0 text-subtle" />
                          </Link>
                        </SheetClose>
                      </li>
                    );
                  })}
                </ul>
                <p className="px-4 pt-5 pb-2 text-xs font-semibold tracking-[0.14em] text-subtle uppercase">
                  Разделы
                </p>
                <ul className="border-y border-line">
                  {nav
                    .filter((item) => item.label !== "Услуги")
                    .map((item) => {
                      const Icon = sectionIcons[item.label];
                      return (
                        <li key={item.href} className="border-b border-line last:border-b-0">
                          <SheetClose asChild>
                            <a
                              href={item.href}
                              className="flex min-h-14 items-center gap-3 px-4 py-3 text-fg hover:bg-paper"
                            >
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-paper text-navy">
                                <Icon className="size-4" />
                              </span>
                              <span className="min-w-0 flex-1 text-base font-medium">
                                {item.label}
                              </span>
                              <ChevronRight className="size-4 shrink-0 text-subtle" />
                            </a>
                          </SheetClose>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="flex shrink-0 flex-col gap-2 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <SheetClose asChild>
                  <Button asChild variant="primary" size="lg" className="h-auto min-h-12 w-full whitespace-normal">
                    <Link to="/zayavka" search={{ service: undefined }}>
                      Оставить заявку
                    </Link>
                  </Button>
                </SheetClose>
                <Button asChild variant="whatsapp" size="lg" className="h-auto min-h-12 w-full whitespace-normal">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="size-5 shrink-0" />
                    <span>WhatsApp {site.contacts.whatsapp.display}</span>
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
