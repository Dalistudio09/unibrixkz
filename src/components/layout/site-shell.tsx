import type { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { MobileCta } from "./mobile-cta";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper text-fg">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileCta />
    </div>
  );
}
