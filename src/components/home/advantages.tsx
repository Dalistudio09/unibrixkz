import { advantages } from "@/content";
import { Container, Section, SectionHeading } from "@/components/layout/container";

export function Advantages() {
  return (
    <Section wash="/images/gallery-warehouse.webp" className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow={advantages.eyebrow}
          title={advantages.title}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.items.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-line bg-surface p-6 shadow-card"
            >
              <span className="font-display text-sm font-medium tracking-widest text-cyan-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-fg">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
