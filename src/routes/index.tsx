import { createFileRoute } from "@tanstack/react-router";
import { seoMeta, site } from "@/content";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { Process } from "@/components/home/process";
import { Audience } from "@/components/home/audience";
import { Quiz } from "@/components/home/quiz";
import { Advantages } from "@/components/home/advantages";
import { Contacts } from "@/components/home/contacts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seoMeta(site.title, site.description),
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Audience />
      <Quiz />
      <Advantages />
      <Contacts />
    </>
  );
}
