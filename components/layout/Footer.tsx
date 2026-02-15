import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col items-center gap-4 text-sm text-muted sm:flex-row sm:justify-between">
        <a
          href="#"
          className="font-heading text-base font-bold tracking-tight text-foreground"
        >
          KAJO <span className="text-gold">STUDIO</span> 360
        </a>
        <p>&copy; {new Date().getFullYear()} {SITE.name}. Všechna práva vyhrazena.</p>
        <p>
          Web vytvořil{" "}
          <a
            href="https://weblyx.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-light transition-colors"
          >
            Weblyx.cz
          </a>
        </p>
      </div>
    </footer>
  );
}
