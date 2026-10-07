import { process } from "@/content";
import { Container, Section, SectionHeading } from "@/components/layout/container";

export function Process() {
  return (
    <Section id="kak-rabotaem" className="bg-navy text-surface">
      <Container>
        <SectionHeading
          invert
          eyebrow={process.eyebrow}
          title={process.title}
          description={process.description}
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step) => (
            <li
              key={step.n}
              className="rounded-2xl border border-surface/10 bg-surface/5 p-6"
            >
              <span className="font-display text-sm font-medium tracking-widest text-cyan">
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-surface/70">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
