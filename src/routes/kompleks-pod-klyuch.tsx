import { createFileRoute } from "@tanstack/react-router";
import { seoMeta, services } from "@/content";
import { ServicePage } from "@/components/service-page";

const service = services[4];

export const Route = createFileRoute("/kompleks-pod-klyuch")({
  head: () => ({
    meta: seoMeta(service.seoTitle, service.metaDescription),
  }),
  component: Page,
});

function Page() {
  return <ServicePage service={service} />;
}
