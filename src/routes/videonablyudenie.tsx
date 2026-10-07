import { createFileRoute } from "@tanstack/react-router";
import { seoMeta, services } from "@/content";
import { ServicePage } from "@/components/service-page";

const service = services[0];

export const Route = createFileRoute("/videonablyudenie")({
  head: () => ({
    meta: seoMeta(service.seoTitle, service.metaDescription),
  }),
  component: Page,
});

function Page() {
  return <ServicePage service={service} />;
}
