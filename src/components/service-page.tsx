import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/content";
import { site, whatsappLink } from "@/content";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/layout/container";
import { QuizForm } from "@/components/lead/quiz-form";
import { WhatsAppIcon } from "@/components/icons";

export function ServicePage({ service }: { service: Service }) {
  return (
    <>
      <section className="relative overflow-hidden bg-navy pt-28 pb-16 text-surface sm:pt-32 sm:pb-20">
        <Container>
          <nav className="text-sm text-surface/55" aria-label="Хлебные крошки">
            <Link to="/" className="hover:text-surface">
              Главная
            </Link>
            <span className="px-2">/</span>
            <span className="text-surface/80">{service.title}</span>
          </nav>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-sm font-medium tracking-wide text-cyan">
                {site.region}
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                {service.pageTitle}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-surface/75">
                {service.pageLead}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="primary" size="lg">
                  <a href="#zayavka">
                    Рассчитать объект
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="whatsapp" size="lg">
                  <a
                    href={whatsappLink(
                      `Здравствуйте. Интересует: ${service.title} в Караганде.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </a>
                </Button>
              </div>
              <p className="mt-5 text-sm text-surface/50">
                Расчёт после осмотра. Полный прайс на сайте не публикуем.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl lg:col-span-6">
              <img
                src={service.image}
                alt={service.imageAlt}
                width={1400}
                height={1050}
                className="photo-live aspect-4/3 size-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Что входит
              </h2>
              <ul className="mt-6 space-y-3">
                {service.features.map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <Check className="mt-0.5 size-5 shrink-0 text-cyan" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-paper p-6 lg:col-span-5 lg:p-8">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Как закрываем задачу
              </h2>
              <ul className="mt-5 space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="zayavka" className="scroll-mt-24 bg-paper">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-sm font-medium tracking-wide text-cyan-deep">
                Заявка
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                Рассчитать {service.title.toLowerCase()}
              </h2>
              <p className="mt-4 text-lg text-muted">
                Укажите тип объекта — вернёмся с уточнениями. Смета после осмотра.
              </p>
            </div>
            <div className="lg:col-span-7">
              <QuizForm presetNeed={service.id} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
