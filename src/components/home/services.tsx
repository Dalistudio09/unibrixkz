import { Link } from "@tanstack/react-router";
import { Cctv, Flame, KeyRound, Layers, Shield } from "lucide-react";
import { services, type ServiceId } from "@/content";
import { Container, Section, SectionHeading } from "@/components/layout/container";

const icons: Record<ServiceId, typeof Cctv> = {
  video: Cctv,
  alarm: Shield,
  fire: Flame,
  skud: KeyRound,
  complex: Layers,
};

export function Services() {
  return (
    <Section id="uslugi" wash="/images/gallery-office.webp" className="bg-paper">
      <Container>
        <SectionHeading
          eyebrow="Услуги"
          title="Слаботочные системы для дома и бизнеса"
          description="Пять направлений: отдельная система или комплекс одним подрядчиком."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.id];
            return (
              <Link
                key={service.id}
                to={service.slug}
                className="group flex gap-4 rounded-2xl border border-navy/10 bg-surface p-5 shadow-card transition-[box-shadow,border-color] duration-200 hover:border-cyan/40 hover:shadow-card-hover"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-cyan text-surface">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-semibold tracking-tight text-fg">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-muted">
                    {service.card}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
