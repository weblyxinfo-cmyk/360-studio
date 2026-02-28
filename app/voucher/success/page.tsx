import { CheckCircle } from "lucide-react";

export default function VoucherSuccess() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1.5rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "28rem" }}>
        <CheckCircle
          size={64}
          style={{ margin: "0 auto", color: "var(--color-gold)" }}
        />
        <h1
          style={{
            marginTop: "1.5rem",
            fontFamily: "var(--font-heading)",
            fontSize: "1.875rem",
            fontWeight: 700,
          }}
        >
          Děkujeme za nákup!
        </h1>
        <p style={{ marginTop: "1rem", color: "var(--color-muted)" }}>
          Váš dárkový poukaz byl úspěšně zakoupen. Podrobnosti jsme Vám zaslali
          na e-mail.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <a href="/" className="btn-primary" style={{ display: "inline-block" }}>
            Zpět na hlavní stránku
          </a>
        </div>
      </div>
    </div>
  );
}
