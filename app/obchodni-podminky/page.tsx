import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Obchodní podmínky | Kajo Studio 360",
  description: "Obchodní podmínky služby pronájmu 360° photoboothu KAJO Studio 360.",
};

export default function ObchodniPodminky() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="legal-container">
          <h1 className="legal-title">Obchodní podmínky</h1>
          <p className="legal-updated">Poslední aktualizace: 28. března 2026</p>

          <section className="legal-section">
            <h2>I. Úvodní ustanovení</h2>
            <p>
              Tyto obchodní podmínky (dále jen &bdquo;podmínky&ldquo;) upravují práva a povinnosti
              smluvních stran při využívání služeb pronájmu 360° photoboothu poskytovaných
              provozovatelem:
            </p>
            <div className="legal-info-box">
              <p><strong>KAJO Studio 360 s.r.o.</strong></p>
              <p>Československé armády 1175, 684 01 Slavkov u Brna</p>
              <p>IČO: 24347876</p>
              <p>Zapsaná v obchodním rejstříku vedeném Krajským soudem v Brně, sp. zn. C 149479/KSBR</p>
              <p>E-mail: info@kajostudio360.cz</p>
            </div>
            <p>
              Podmínky se vztahují na veškeré objednávky služeb učiněné prostřednictvím
              internetových stránek <strong>kajostudio.cz</strong> (dále jen &bdquo;web&ldquo;),
              e-mailem či telefonicky.
            </p>
          </section>

          <section className="legal-section">
            <h2>II. Předmět služby</h2>
            <p>
              Provozovatel poskytuje službu pronájmu 360° photoboothu včetně profesionální
              obsluhy, technického vybavení a digitálního zpracování videí/fotografií
              dle zvoleného balíčku.
            </p>
            <p>Aktuální nabídka balíčků a jejich ceny jsou uvedeny na webu.</p>
          </section>

          <section className="legal-section">
            <h2>III. Objednávka a vznik smlouvy</h2>
            <ol>
              <li>
                Objednávku lze učinit prostřednictvím rezervačního formuláře na webu,
                e-mailem nebo telefonicky.
              </li>
              <li>
                Odesláním objednávky zákazník potvrzuje, že se seznámil s těmito podmínkami
                a souhlasí s nimi.
              </li>
              <li>
                Smlouva o poskytnutí služby vzniká okamžikem potvrzení objednávky
                provozovatelem a úhradou ceny služby (nebo zálohy, je-li dohodnuta).
              </li>
              <li>
                Provozovatel si vyhrazuje právo objednávku odmítnout, zejména z důvodu
                nedostupnosti termínu nebo technických omezení místa konání akce.
              </li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>IV. Ceny a platební podmínky</h2>
            <ol>
              <li>Ceny služeb jsou uvedeny na webu v českých korunách (CZK) včetně DPH.</li>
              <li>
                Platbu je možné provést online platební kartou, bankovním převodem
                nebo dalšími způsoby nabízenými platební bránou GoPay.
              </li>
              <li>
                U balíčků s cenou &bdquo;Na dotaz&ldquo; je cena stanovena individuálně
                po dohodě s provozovatelem.
              </li>
              <li>
                K ceně služby může být účtováno cestovné dle vzdálenosti místa
                konání akce od sídla provozovatele.
              </li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>V. Dárkové poukazy (vouchery)</h2>
            <ol>
              <li>Dárkové poukazy lze zakoupit prostřednictvím webu.</li>
              <li>
                Platnost dárkového poukazu je 12 měsíců od data zakoupení,
                není-li uvedeno jinak.
              </li>
              <li>Dárkový poukaz je nepřenosný na peněžní prostředky a nelze jej směnit za hotovost.</li>
              <li>
                Dárkový poukaz lze uplatnit při rezervaci služby zadáním kódu
                v rezervačním formuláři.
              </li>
              <li>
                Pokud je hodnota objednávky vyšší než hodnota poukazu,
                zákazník doplatí rozdíl.
              </li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>VI. Storno podmínky a odstoupení od smlouvy</h2>
            <ol>
              <li>
                Zákazník má právo zrušit rezervaci za následujících podmínek:
                <ul>
                  <li>
                    <strong>Více než 14 dní</strong> před termínem akce — bezplatné
                    storno, vrácení 100 % ceny.
                  </li>
                  <li>
                    <strong>7–14 dní</strong> před termínem akce — storno poplatek 50 %
                    z celkové ceny.
                  </li>
                  <li>
                    <strong>Méně než 7 dní</strong> před termínem akce — storno poplatek
                    100 % z celkové ceny.
                  </li>
                </ul>
              </li>
              <li>
                Změna termínu je možná nejpozději 7 dní před původním termínem,
                a to bez poplatku, je-li nový termín dostupný.
              </li>
              <li>
                Provozovatel si vyhrazuje právo zrušit rezervaci z důvodu vyšší moci
                (nepříznivé počasí, technická porucha apod.). V takovém případě
                bude zákazníkovi nabídnut náhradní termín nebo plný refund.
              </li>
              <li>
                Spotřebitel má dle § 1829 občanského zákoníku právo odstoupit
                od smlouvy do 14 dnů od jejího uzavření. Toto právo nelze uplatnit
                u služeb, které byly splněny s předchozím výslovným souhlasem
                spotřebitele před uplynutím lhůty pro odstoupení.
              </li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>VII. Práva a povinnosti smluvních stran</h2>
            <h3>Povinnosti provozovatele:</h3>
            <ul>
              <li>Dostavit se na místo konání akce ve sjednaném termínu.</li>
              <li>Zajistit funkční technické vybavení a profesionální obsluhu.</li>
              <li>
                Dodat zákazníkovi/hostům zpracovaná videa/fotografie dle
                specifikací zvoleného balíčku.
              </li>
            </ul>
            <h3>Povinnosti zákazníka:</h3>
            <ul>
              <li>
                Zajistit vhodný prostor pro umístění photoboothu (min. 3 × 3 metry,
                rovný povrch, přístup k elektrické zásuvce 230V).
              </li>
              <li>Uhradit cenu služby dle dohodnutých podmínek.</li>
              <li>
                Poskytnout provozovateli potřebné informace o místu a charakteru akce.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>VIII. Reklamace</h2>
            <ol>
              <li>
                V případě nespokojenosti se službou má zákazník právo podat reklamaci
                písemně na e-mail info@kajostudio360.cz, a to nejpozději do 14 dnů
                od konání akce.
              </li>
              <li>
                Provozovatel vyřídí reklamaci do 30 dnů od jejího obdržení.
              </li>
              <li>
                V případě oprávněné reklamace bude zákazníkovi poskytnuta přiměřená
                sleva nebo náhradní plnění.
              </li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>IX. Autorská práva a licence</h2>
            <ol>
              <li>
                Videa a fotografie pořízené v rámci služby jsou určena k osobnímu
                použití zákazníka a jeho hostů.
              </li>
              <li>
                Zákazník souhlasí s tím, že provozovatel může vybrané materiály
                použít pro marketingové účely (portfolio, sociální sítě),
                pokud zákazník písemně nevyjádří nesouhlas.
              </li>
              <li>
                Provozovatel si vyhrazuje autorská práva k vytvořeným materiálům
                v rozsahu stanoveném autorským zákonem.
              </li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>X. Odpovědnost</h2>
            <ol>
              <li>
                Provozovatel neodpovídá za škody způsobené vyšší mocí,
                nevhodným prostorem poskytnutým zákazníkem nebo jednáním
                třetích osob.
              </li>
              <li>
                Celková odpovědnost provozovatele je omezena na výši uhrazené
                ceny služby.
              </li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>XI. Závěrečná ustanovení</h2>
            <ol>
              <li>
                Tyto podmínky se řídí právním řádem České republiky, zejména
                zákonem č. 89/2012 Sb., občanský zákoník, a zákonem č. 634/1992 Sb.,
                o ochraně spotřebitele.
              </li>
              <li>
                Případné spory budou řešeny přednostně smírnou cestou.
                Spotřebitel má právo obrátit se na Českou obchodní inspekci
                (<a href="https://www.coi.cz" target="_blank" rel="noopener noreferrer">www.coi.cz</a>)
                jakožto subjekt mimosoudního řešení spotřebitelských sporů.
              </li>
              <li>
                Provozovatel si vyhrazuje právo tyto podmínky jednostranně změnit.
                Aktuální znění je vždy dostupné na webu.
              </li>
              <li>
                Tyto podmínky nabývají účinnosti dnem 28. března 2026.
              </li>
            </ol>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
