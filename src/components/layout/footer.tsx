import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { footer, services, site, whatsappLink } from "@/content";
import { TelegramIcon, WhatsAppIcon } from "@/components/icons";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-navy-mid bg-navy pb-28 text-surface md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo variant="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-surface/70">
            Слаботочные системы под ключ в {site.region}: видеонаблюдение,
            охранная и пожарная сигнализация, СКУД и домофония.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-sm font-medium tracking-wide text-surface/50">
            Услуги
          </p>
          <ul className="mt-4 space-y-2.5">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  to={service.slug}
                  className="text-sm text-surface/80 transition-colors hover:text-surface"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-sm font-medium tracking-wide text-surface/50">
            Контакты
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-surface/80 hover:text-surface"
              >
                <WhatsAppIcon className="size-4" />
                {site.contacts.whatsapp.display}
              </a>
            </li>
            <li>
              <a
                href={site.contacts.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-surface/80 hover:text-surface"
              >
                <TelegramIcon className="size-4" />
                {site.contacts.telegram.display}
              </a>
            </li>
            <li>
              <a
                href={site.contacts.email.href}
                className="inline-flex items-center gap-2.5 text-surface/80 hover:text-surface"
              >
                <Mail className="size-4" />
                {site.contacts.email.display}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-surface/80">
              <MapPin className="size-4" />
              {site.contacts.city}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-surface/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-surface/55 sm:px-6">
          <p>{footer.rights}</p>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
          <a
            href={site.unibrixAi.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-surface/45 transition-colors hover:text-surface/80"
          >
            {site.unibrixAi.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
