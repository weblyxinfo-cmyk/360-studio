import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zásady cookies | Kajo Studio 360",
  description: "Informace o používání cookies na webu KAJO Studio 360.",
};

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="legal-container">
          <h1 className="legal-title">Zásady používání cookies</h1>
          <p className="legal-updated">Poslední aktualizace: 28. března 2026</p>

          <section className="legal-section">
            <h2>Co jsou cookies</h2>
            <p>
              Cookies jsou malé textové soubory, které se ukládají ve vašem prohlížeči
              při návštěvě webových stránek. Slouží k zajištění správného fungování webu,
              zapamatování vašich preferencí a zlepšování uživatelského zážitku.
            </p>
          </section>

          <section className="legal-section">
            <h2>Jaké cookies používáme</h2>

            <h3>Nezbytné cookies (vždy aktivní)</h3>
            <p>
              Tyto cookies jsou nutné pro správné fungování webu. Bez nich by web
              nemohl fungovat. Nevyžadují váš souhlas.
            </p>
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Účel</th>
                  <th>Platnost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>authjs.session-token</code></td>
                  <td>Přihlášení do administrace (pouze pro administrátory)</td>
                  <td>24 hodin</td>
                </tr>
                <tr>
                  <td><code>authjs.csrf-token</code></td>
                  <td>Ochrana proti CSRF útokům při přihlášení</td>
                  <td>Relace</td>
                </tr>
                <tr>
                  <td><code>authjs.callback-url</code></td>
                  <td>Přesměrování po přihlášení</td>
                  <td>Relace</td>
                </tr>
                <tr>
                  <td><code>cookie-consent</code></td>
                  <td>Uložení vašeho souhlasu s cookies</td>
                  <td>12 měsíců</td>
                </tr>
              </tbody>
            </table>

            <h3>Analytické cookies (vyžadují souhlas)</h3>
            <p>
              Tyto cookies nám pomáhají porozumět, jak návštěvníci používají web.
              Aktivují se pouze s vaším souhlasem (tlačítko &bdquo;Přijmout vše&ldquo;).
            </p>
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Poskytovatel</th>
                  <th>Účel</th>
                  <th>Platnost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>_ga</code></td>
                  <td>Google Analytics</td>
                  <td>Rozlišení unikátních návštěvníků</td>
                  <td>2 roky</td>
                </tr>
                <tr>
                  <td><code>_ga_62DB1QZ6YR</code></td>
                  <td>Google Analytics</td>
                  <td>Udržení stavu relace</td>
                  <td>2 roky</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="legal-section">
            <h2>Jak cookies spravovat</h2>
            <p>
              Cookies můžete spravovat v nastavení svého prohlížeče. Každý prohlížeč
              nabízí možnost cookies blokovat, mazat nebo omezit:
            </p>
            <ul>
              <li>
                <strong>Chrome:</strong> Nastavení &rarr; Soukromí a zabezpečení &rarr; Cookies
              </li>
              <li>
                <strong>Firefox:</strong> Nastavení &rarr; Soukromí a zabezpečení &rarr; Cookies
              </li>
              <li>
                <strong>Safari:</strong> Předvolby &rarr; Soukromí &rarr; Spravovat data webových stránek
              </li>
              <li>
                <strong>Edge:</strong> Nastavení &rarr; Soukromí &rarr; Cookies
              </li>
            </ul>
            <p>
              Upozorňujeme, že zablokování nezbytných cookies může omezit
              funkčnost webu.
            </p>
          </section>

          <section className="legal-section">
            <h2>Změna souhlasu</h2>
            <p>
              Svůj souhlas s cookies můžete kdykoliv změnit nebo odvolat.
              Stačí smazat cookies ve svém prohlížeči — při další návštěvě
              webu se vám znovu zobrazí cookie lišta.
            </p>
          </section>

          <section className="legal-section">
            <h2>Kontakt</h2>
            <p>
              V případě dotazů ohledně cookies nás kontaktujte na{" "}
              <a href="mailto:info@kajostudio360.cz">info@kajostudio360.cz</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
