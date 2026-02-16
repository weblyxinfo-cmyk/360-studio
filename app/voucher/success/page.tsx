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
          Dekujeme za nakup!
        </h1>
        <p style={{ marginTop: "1rem", color: "var(--color-muted)" }}>
          Vas darkovy poukaz byl uspesne zakoupen. Podrobnosti jsme vam zaslali
          na email.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <a href="/" className="btn-primary" style={{ display: "inline-block" }}>
            Zpet na hlavni stranku
          </a>
        </div>
      </div>
    </div>
  );
}
