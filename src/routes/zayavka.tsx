import { createFileRoute } from "@tanstack/react-router";
import { requestPage, seoMeta } from "@/content";
import { Container } from "@/components/layout/container";
import { QuizForm } from "@/components/lead/quiz-form";

export const Route = createFileRoute("/zayavka")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  head: () => ({
    meta: seoMeta(requestPage.seoTitle, requestPage.metaDescription),
  }),
  component: RequestPage,
});

function RequestPage() {
  const { service } = Route.useSearch();

  return (
    <section className="bg-paper pt-28 pb-16 sm:pt-32 sm:pb-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-cyan-deep">
            Караганда и область
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            {requestPage.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{requestPage.lead}</p>
          <div className="mt-10">
            <QuizForm presetNeed={service} />
          </div>
        </div>
      </Container>
    </section>
  );
}
