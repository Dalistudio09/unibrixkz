import { Building2, House, Store, Users, Warehouse } from "lucide-react";
import { audience } from "@/content";
import { Container, Section, SectionHeading } from "@/components/layout/container";

const icons = {
  house: House,
  office: Building2,
  shop: Store,
  warehouse: Warehouse,
  uk: Users,
} as const;

export function Audience() {
  return (
    <Section wash="/images/gallery-house.webp" className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow={audience.eyebrow}
          title={audience.title}
          description={audience.description}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {audience.items.map((item) => {
            const Icon = icons[item.id as keyof typeof icons];
            return (
              <article
                key={item.id}
                className="rounded-2xl border border-line bg-surface p-5 shadow-card"
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-cyan-soft text-cyan-deep">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-fg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
