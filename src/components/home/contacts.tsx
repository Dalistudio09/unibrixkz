import { Mail, MapPin } from "lucide-react";
import { contactsBlock, site, whatsappLink } from "@/content";
import { Container, Section, SectionHeading } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { TelegramIcon, WhatsAppIcon } from "@/components/icons";

export function Contacts() {
  return (
    <Section id="kontakty" wash="/images/gallery-nvr.webp" className="bg-paper max-md:pb-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={contactsBlock.eyebrow}
              title={contactsBlock.title}
              description={contactsBlock.description}
            />
          </div>
          <div className="grid gap-4 lg:col-span-7 sm:grid-cols-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-surface p-6 shadow-card transition-[box-shadow] duration-150 hover:shadow-card-hover sm:col-span-2"
            >
              <WhatsAppIcon className="size-6 text-whatsapp" />
              <p className="mt-4 text-sm text-muted">WhatsApp</p>
              <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-fg">
                {site.contacts.whatsapp.display}
              </p>
            </a>
            <a
              href={site.contacts.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-surface p-6 shadow-card transition-[box-shadow] duration-150 hover:shadow-card-hover"
            >
              <TelegramIcon className="size-6 text-cyan" />
              <p className="mt-4 text-sm text-muted">Telegram</p>
              <p className="mt-1 font-display text-xl font-semibold tracking-tight text-fg">
                {site.contacts.telegram.display}
              </p>
            </a>
            <a
              href={site.contacts.email.href}
              className="rounded-2xl bg-surface p-6 shadow-card transition-[box-shadow] duration-150 hover:shadow-card-hover"
            >
              <Mail className="size-6 text-cyan" />
              <p className="mt-4 text-sm text-muted">Email</p>
              <p className="mt-1 font-display text-lg font-semibold tracking-tight break-all text-fg">
                {site.contacts.email.display}
              </p>
            </a>
            <div className="rounded-2xl bg-navy p-6 text-surface sm:col-span-2">
              <MapPin className="size-6 text-cyan" />
              <p className="mt-4 text-sm text-surface/65">Город</p>
              <p className="mt-1 font-display text-2xl font-semibold tracking-tight">
                {site.contacts.city}
              </p>
              <p className="mt-2 text-sm text-surface/65">
                Выезд по Карагандинской области. Расчёт — после осмотра объекта.
              </p>
              <Button asChild variant="primary" size="lg" className="mt-6">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  Написать в WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
