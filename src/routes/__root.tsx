import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteShell } from "@/components/layout/site-shell";
import { jsonLd, site } from "@/content";
import { Button } from "@/components/ui/button";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: site.title },
      { name: "description", content: site.description },
      { name: "theme-color", content: "#0B1F3A" },
      { name: "application-name", content: site.name },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", href: "/favicon-32.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  component: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument() {
  return (
    <html lang="ru" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2"
          >
            К содержанию
          </a>
          <SiteShell>
            <div id="content">
              <Outlet />
            </div>
          </SiteShell>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-medium tracking-wide text-cyan-deep">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
        Страница не найдена
      </h1>
      <p className="mt-3 text-muted">
        Такого адреса нет. Вернитесь на главную или оставьте заявку.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild variant="navy">
          <Link to="/">На главную</Link>
        </Button>
        <Button asChild variant="primary">
          <Link to="/zayavka" search={{ service: undefined }}>Оставить заявку</Link>
        </Button>
      </div>
    </section>
  );
}
