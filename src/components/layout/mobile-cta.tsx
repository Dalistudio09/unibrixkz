import { Link, useRouterState } from "@tanstack/react-router";
import { whatsappLink } from "@/content";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";

export function MobileCta() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/zayavka") return null;

  return (
    <div className="mobile-bar fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgb(11_31_58/0.08)] md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Button asChild variant="primary" size="lg" className="w-full">
          <Link to="/zayavka" search={{ service: undefined }}>Оставить заявку</Link>
        </Button>
        <Button asChild variant="whatsapp" size="lg" className="w-full">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
