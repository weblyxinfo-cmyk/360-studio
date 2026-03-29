import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů | Kajo Studio 360",
  description: "Zásady ochrany osobních údajů a zpracování dat KAJO Studio 360 v souladu s GDPR.",
};

export default function OchranaOsobnichUdaju() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="legal-container">
          <h1 className="legal-title">Ochrana osobních údajů</h1>
          <p className="legal-updated">Poslední aktualizace: 28. března 2026</p>

          <section className="legal-section">
            <h2>I. Správce osobních údajů</h2>
            <div className="legal-info-box">
              <p><strong>KAJO Studio 360 s.r.o.</strong></p>
              <p>Československé armády 1175, 684 01 Slavkov u Brna</p>
              <p>IČO: 24347876</p>
              <p>Zapsaná v obchodním rejstříku vedeném Krajským soudem v Brně, sp. zn. C 149479/KSBR</p>
              <p>E-mail: info@kajostudio360.cz</p>
            </div>
            <p>
              Správce zpracovává osobní údaje v souladu s Nařízením Evropského parlamentu
              a Rady (EU) 2016/679 (GDPR) a zákonem č. 110/2019 Sb., o zpracování
              osobních údajů.
            </p>
          </section>

          <section className="legal-section">
            <h2>II. Jaké osobní údaje zpracováváme</h2>
            <p>V rámci poskytování služeb zpracováváme tyto kategorie osobních údajů:</p>

            <h3>Při rezervaci služby:</h3>
            <ul>
              <li>Jméno a příjmení</li>
              <li>E-mailová adresa</li>
              <li>Telefonní číslo</li>
              <li>Informace o akci (typ, datum, místo konání)</li>
            </ul>

            <h3>Při nákupu dárkového poukazu:</h3>
            <ul>
              <li>Jméno a e-mail kupujícího</li>
              <li>Jméno a e-mail obdarovaného (je-li uvedeno)</li>
            </ul>

            <h3>Při vyplnění kontaktního formuláře:</h3>
            <ul>
              <li>Jméno, e-mail, telefon</li>
              <li>Obsah zprávy</li>
            </ul>

            <h3>Při platbě:</h3>
            <ul>
              <li>Údaje o platební transakci (zpracovává platební brána GoPay)</li>
            </ul>

            <h3>Automaticky při návštěvě webu:</h3>
            <ul>
              <li>
                Technické údaje (IP adresa, typ prohlížeče, operační systém)
                prostřednictvím nezbytných cookies
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>III. Účel a právní základ zpracování</h2>
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Účel</th>
                  <th>Právní základ</th>
                  <th>Doba uchování</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Plnění smlouvy (rezervace, poskytnutí služby)</td>
                  <td>Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR)</td>
                  <td>3 roky od splnění smlouvy</td>
                </tr>
                <tr>
                  <td>Vyřízení poptávky z kontaktního formuláře</td>
                  <td>Oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR)</td>
                  <td>1 rok od odeslání</td>
                </tr>
                <tr>
                  <td>Plnění zákonných povinností (účetnictví, daně)</td>
                  <td>Právní povinnost (čl. 6 odst. 1 písm. c) GDPR)</td>
                  <td>Dle zákonné lhůty (až 10 let)</td>
                </tr>
                <tr>
                  <td>Zasílání obchodních sdělení</td>
                  <td>Souhlas (čl. 6 odst. 1 písm. a) GDPR)</td>
                  <td>Do odvolání souhlasu</td>
                </tr>
                <tr>
                  <td>Nezbytné cookies pro fungování webu</td>
                  <td>Oprávněný zájem</td>
                  <td>Po dobu relace / dle cookie</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="legal-section">
            <h2>IV. Příjemci osobních údajů</h2>
            <p>Osobní údaje mohou být předány těmto kategoriím příjemců:</p>
            <ul>
              <li>
                <strong>GoPay s.r.o.</strong> — zpracování online plateb
                (<a href="https://www.gopay.com/cs/ochrana-osobnich-udaju" target="_blank" rel="noopener noreferrer">zásady ochrany údajů GoPay</a>)
              </li>
              <li>
                <strong>Vercel Inc.</strong> — hosting webových stránek
              </li>
              <li>
                <strong>Turso (ChiselStrike Inc.)</strong> — databázové služby
              </li>
              <li>
                <strong>Resend Inc.</strong> — odesílání transakčních e-mailů
              </li>
            </ul>
            <p>
              Všichni příjemci zpracovávají údaje na základě smlouvy o zpracování
              osobních údajů nebo v rámci standardních smluvních doložek pro
              přenos dat mimo EU/EHP.
            </p>
          </section>

          <section className="legal-section">
            <h2>V. Předávání údajů do třetích zemí</h2>
            <p>
              Některé služby třetích stran (Vercel, Turso, Resend) mohou zpracovávat
              údaje na serverech mimo Evropský hospodářský prostor (USA).
              Přenos je zajištěn na základě standardních smluvních doložek
              Evropské komise nebo rozhodnutí o odpovídající úrovni ochrany.
            </p>
          </section>

          <section className="legal-section">
            <h2>VI. Vaše práva</h2>
            <p>V souvislosti se zpracováním osobních údajů máte tato práva:</p>
            <ul>
              <li><strong>Právo na přístup</strong> — získat informace o tom, jaké údaje o vás zpracováváme.</li>
              <li><strong>Právo na opravu</strong> — požádat o opravu nepřesných údajů.</li>
              <li><strong>Právo na výmaz</strong> — požádat o smazání údajů (&bdquo;právo být zapomenut&ldquo;).</li>
              <li><strong>Právo na omezení zpracování</strong> — požádat o omezení zpracování údajů.</li>
              <li><strong>Právo na přenositelnost</strong> — získat údaje ve strukturovaném formátu.</li>
              <li><strong>Právo vznést námitku</strong> — namítat proti zpracování na základě oprávněného zájmu.</li>
              <li><strong>Právo odvolat souhlas</strong> — kdykoli odvolat souhlas se zpracováním.</li>
            </ul>
            <p>
              Svá práva můžete uplatnit zasláním e-mailu na{" "}
              <a href="mailto:info@kajostudio360.cz">info@kajostudio360.cz</a>.
              Na vaši žádost odpovíme bez zbytečného odkladu, nejpozději do 30 dnů.
            </p>
          </section>

          <section className="legal-section">
            <h2>VII. Zabezpečení údajů</h2>
            <p>
              Přijali jsme vhodná technická a organizační opatření k ochraně
              osobních údajů, zejména:
            </p>
            <ul>
              <li>Šifrovaný přenos dat (HTTPS/TLS)</li>
              <li>Hashování hesel (bcrypt)</li>
              <li>Přístup k údajům pouze pro oprávněné osoby</li>
              <li>Pravidelná aktualizace softwarových komponent</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>VIII. Cookies</h2>
            <p>
              Podrobné informace o používání cookies naleznete na stránce{" "}
              <a href="/cookies">Zásady cookies</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>IX. Dozorový úřad</h2>
            <p>
              Pokud se domníváte, že zpracováním vašich osobních údajů
              dochází k porušení GDPR, máte právo podat stížnost u dozorového úřadu:
            </p>
            <div className="legal-info-box">
              <p><strong>Úřad pro ochranu osobních údajů</strong></p>
              <p>Pplk. Sochora 27, 170 00 Praha 7</p>
              <p>
                Web:{" "}
                <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer">
                  www.uoou.cz
                </a>
              </p>
            </div>
          </section>

          <section className="legal-section">
            <h2>X. Závěrečná ustanovení</h2>
            <p>
              Tyto zásady ochrany osobních údajů nabývají účinnosti dnem 28. března 2026.
              Správce si vyhrazuje právo tyto zásady aktualizovat. Aktuální verze je
              vždy dostupná na tomto webu.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
