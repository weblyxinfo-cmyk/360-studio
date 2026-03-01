"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Calendar, Clock, Package, User, Check } from "lucide-react";

interface PackageData {
  id: string;
  name: string;
  duration: string;
  price: number;
  priceNote: string | null;
  isFeatured: boolean;
  features: { text: string }[];
}

interface AvailableDate {
  date: string;
  timeStart: string;
  timeEnd: string;
}

const steps = [
  { icon: Calendar, label: "Datum" },
  { icon: Clock, label: "Čas" },
  { icon: Package, label: "Balíček" },
  { icon: User, label: "Údaje" },
  { icon: Check, label: "Souhrn" },
];

export default function BookingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Načítání...</div>}>
      <BookingContent />
    </Suspense>
  );
}

function BookingContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [availability, setAvailability] = useState<AvailableDate[]>([]);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const paramDate = searchParams.get("date");
    if (paramDate) {
      const [y, m] = paramDate.split("-");
      return `${y}-${m}`;
    }
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const [selectedDate, setSelectedDate] = useState(searchParams.get("date") || "");
  const [selectedTime, setSelectedTime] = useState({ start: searchParams.get("timeStart") || "", end: searchParams.get("timeEnd") || "" });
  const [selectedPackage, setSelectedPackage] = useState(searchParams.get("package") || "");
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherError, setVoucherError] = useState("");
  const [form, setForm] = useState({
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    phone: "", eventType: "", location: "", notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // If URL has all params, skip to details/summary step
  const prefilled = !!(searchParams.get("date") && searchParams.get("package"));
  const [initialStep] = useState(() => prefilled ? 3 : 0);

  useEffect(() => {
    if (prefilled) setStep(initialStep);
  }, [prefilled, initialStep]);

  useEffect(() => {
    fetch("/api/booking/packages").then((r) => r.json()).then(setPackages);
  }, []);

  useEffect(() => {
    fetch(`/api/booking/availability?month=${currentMonth}`).then((r) => r.json()).then(setAvailability);
  }, [currentMonth]);

  function nextMonth() {
    const [y, m] = currentMonth.split("-").map(Number);
    const next = m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, "0")}`;
    setCurrentMonth(next);
  }

  function prevMonth() {
    const [y, m] = currentMonth.split("-").map(Number);
    const now = new Date();
    const curMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const prev = m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, "0")}`;
    if (prev >= curMonth) setCurrentMonth(prev);
  }

  const availableDates = [...new Set(availability.map((a) => a.date))];
  const availableTimesForDate = availability.filter((a) => a.date === selectedDate);

  const selectedPkg = packages.find((p) => p.id === selectedPackage);
  const totalAmount = selectedPkg ? Math.max(0, selectedPkg.price - voucherDiscount) : 0;

  async function validateVoucher() {
    setVoucherError("");
    if (!voucherCode) return;
    const res = await fetch("/api/booking/voucher/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: voucherCode }),
    });
    const data = await res.json();
    if (data.valid) {
      setVoucherDiscount(data.amount);
    } else {
      setVoucherError(data.error || "Neplatný voucher");
      setVoucherDiscount(0);
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          packageId: selectedPackage,
          eventDate: selectedDate,
          eventTimeStart: selectedTime.start,
          eventTimeEnd: selectedTime.end,
          eventType: form.eventType,
          eventLocation: form.location,
          eventNotes: form.notes,
          voucherCode: voucherCode || undefined,
        }),
      });
      const data = await res.json();

      if (data.gatewayUrl) {
        window.location.href = data.gatewayUrl;
      } else if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else if (data.error) {
        setError(data.error);
        setSubmitting(false);
      }
    } catch {
      setError("Nastala chyba. Zkuste to prosím znovu.");
      setSubmitting(false);
    }
  }

  const [year, month] = currentMonth.split("-").map(Number);
  const monthName = new Date(year, month - 1).toLocaleDateString("cs-CZ", { month: "long", year: "numeric" });
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = (new Date(year, month - 1, 1).getDay() + 6) % 7; // Monday = 0

  return (
    <div style={{ minHeight: "100vh", padding: "6rem 1.5rem 3rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <a href="/" style={{ color: "var(--color-foreground)", textDecoration: "none", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem" }}>
            KAJO <span style={{ color: "var(--color-gold)" }}>STUDIO</span> 360
          </a>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2rem", marginTop: "1.5rem" }}>
            Rezervace 360° Photobooth
          </h1>
        </div>

        {/* Steps indicator */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "3rem" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: i <= step ? "var(--color-gold)" : "rgba(255,255,255,0.05)",
                color: i <= step ? "var(--color-background)" : "var(--color-muted)",
                fontSize: "0.85rem", fontWeight: 700,
              }}>
                <s.icon size={16} />
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 40, height: 1, background: i < step ? "var(--color-gold)" : "rgba(255,255,255,0.1)" }} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Calendar */}
        {step === 0 && (
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1.5rem", textAlign: "center" }}>
              Vyberte datum
            </h2>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <button onClick={prevMonth} className="btn-outline" style={{ padding: "0.5rem 1rem" }}><ChevronLeft size={16} /></button>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", textTransform: "capitalize" }}>{monthName}</span>
              <button onClick={nextMonth} className="btn-outline" style={{ padding: "0.5rem 1rem" }}><ChevronRight size={16} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem", textAlign: "center" }}>
              {["Po", "Út", "St", "Čt", "Pá", "So", "Ne"].map((d) => (
                <div key={d} style={{ fontSize: "0.75rem", color: "var(--color-muted)", padding: "0.5rem", fontWeight: 600 }}>{d}</div>
              ))}
              {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`empty-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isAvailable = availableDates.includes(dateStr);
                const isSelected = selectedDate === dateStr;
                return (
                  <button
                    key={day}
                    onClick={() => isAvailable && setSelectedDate(dateStr)}
                    disabled={!isAvailable}
                    style={{
                      padding: "0.75rem", borderRadius: 12, border: "none", cursor: isAvailable ? "pointer" : "default",
                      background: isSelected ? "var(--color-gold)" : isAvailable ? "rgba(200,169,110,0.1)" : "transparent",
                      color: isSelected ? "var(--color-background)" : isAvailable ? "var(--color-foreground)" : "rgba(255,255,255,0.2)",
                      fontWeight: isSelected ? 700 : 400, fontSize: "0.95rem",
                      transition: "all 0.2s",
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Time */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1.5rem", textAlign: "center" }}>
              Vyberte čas — {new Date(selectedDate).toLocaleDateString("cs-CZ", { day: "numeric", month: "long" })}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
              {availableTimesForDate.map((t, i) => {
                const isSelected = selectedTime.start === t.timeStart && selectedTime.end === t.timeEnd;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedTime({ start: t.timeStart, end: t.timeEnd })}
                    style={{
                      padding: "1.5rem", borderRadius: 16, border: `1px solid ${isSelected ? "var(--color-gold)" : "rgba(255,255,255,0.08)"}`,
                      background: isSelected ? "rgba(200,169,110,0.1)" : "rgba(255,255,255,0.02)",
                      color: "var(--color-foreground)", cursor: "pointer",
                      textAlign: "center", transition: "all 0.3s",
                    }}
                  >
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem" }}>{t.timeStart}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-muted)", marginTop: "0.25rem" }}>do {t.timeEnd}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Package */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1.5rem", textAlign: "center" }}>
              Vyberte balíček
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: packages.length > 1 ? "repeat(2, 1fr)" : "1fr", gap: "1.5rem" }}>
              {packages.map((pkg) => {
                const isSelected = selectedPackage === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    style={{
                      padding: "2rem", borderRadius: 20, textAlign: "left", cursor: "pointer",
                      border: `1px solid ${isSelected ? "var(--color-gold)" : pkg.isFeatured ? "rgba(200,169,110,0.3)" : "rgba(255,255,255,0.08)"}`,
                      background: isSelected ? "rgba(200,169,110,0.1)" : "rgba(255,255,255,0.02)",
                      color: "var(--color-foreground)", transition: "all 0.3s",
                    }}
                  >
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.3rem" }}>{pkg.name}</h3>
                    <div style={{ color: "var(--color-gold)", fontSize: "0.85rem", marginBottom: "1rem" }}>{pkg.duration}</div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.8rem", marginBottom: "0.5rem" }}>
                      {pkg.price > 0 ? `${(pkg.price / 100).toLocaleString("cs-CZ")} Kč` : "Na dotaz"}
                    </div>
                    {pkg.priceNote && <div style={{ fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: "1rem" }}>{pkg.priceNote}</div>}
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {pkg.features.map((f, i) => (
                        <li key={i} style={{ fontSize: "0.85rem", color: "var(--color-muted-light)", padding: "0.3rem 0", display: "flex", gap: "0.5rem" }}>
                          <span style={{ color: "var(--color-gold)" }}>✓</span> {f.text}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Details */}
        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1.5rem", textAlign: "center" }}>
              Vaše údaje
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 500, margin: "0 auto" }}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bname">Jméno a příjmení *</label>
                  <input id="bname" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bemail">Email *</label>
                  <input id="bemail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label htmlFor="bphone">Telefon</label>
                  <input id="bphone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="btype">Typ akce</label>
                  <select id="btype" value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })}>
                    <option value="">Vyberte...</option>
                    <option value="Svatba">Svatba</option>
                    <option value="Narozeniny">Narozeniny</option>
                    <option value="Firemní akce">Firemní akce</option>
                    <option value="Ples">Ples / Gala</option>
                    <option value="Jiné">Jiné</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="bloc">Místo konání</label>
                  <input id="bloc" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bnotes">Poznámky</label>
                <textarea id="bnotes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Speciální požadavky..." />
              </div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="bvoucher">Voucher kód</label>
                  <input id="bvoucher" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value.toUpperCase())} placeholder="KAJO-XXXX-XXXX" />
                </div>
                <button type="button" onClick={validateVoucher} className="btn-outline" style={{ padding: "1rem 1.5rem", marginBottom: 0 }}>Ověřit</button>
              </div>
              {voucherDiscount > 0 && <div style={{ color: "var(--color-gold)", fontSize: "0.9rem" }}>Sleva: -{(voucherDiscount / 100).toLocaleString("cs-CZ")} Kč</div>}
              {voucherError && <div style={{ color: "#dc3232", fontSize: "0.9rem" }}>{voucherError}</div>}
            </div>
          </div>
        )}

        {/* Step 5: Summary */}
        {step === 4 && (
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1.5rem", textAlign: "center" }}>
              Shrnutí rezervace
            </h2>
            <div style={{ maxWidth: 500, margin: "0 auto", padding: "2rem", background: "var(--color-surface)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-muted)" }}>Datum:</span>
                  <strong>{new Date(selectedDate).toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" })}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-muted)" }}>Čas:</span>
                  <strong>{selectedTime.start} – {selectedTime.end}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-muted)" }}>Balíček:</span>
                  <strong>{selectedPkg?.name}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-muted)" }}>Jméno:</span>
                  <strong>{form.name}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-muted)" }}>Email:</span>
                  <strong>{form.email}</strong>
                </div>
                {form.eventType && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--color-muted)" }}>Typ akce:</span>
                    <strong>{form.eventType}</strong>
                  </div>
                )}
                {form.location && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--color-muted)" }}>Místo:</span>
                    <strong>{form.location}</strong>
                  </div>
                )}
                <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "0.5rem 0" }} />
                {voucherDiscount > 0 && (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--color-muted)" }}>Cena balíčku:</span>
                      <span>{((selectedPkg?.price || 0) / 100).toLocaleString("cs-CZ")} Kč</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-gold)" }}>
                      <span>Sleva (voucher):</span>
                      <span>-{(voucherDiscount / 100).toLocaleString("cs-CZ")} Kč</span>
                    </div>
                  </>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem" }}>
                  <span style={{ color: "var(--color-muted)" }}>K platbě:</span>
                  <strong style={{ fontFamily: "var(--font-heading)", color: "var(--color-gold)" }}>{(totalAmount / 100).toLocaleString("cs-CZ")} Kč</strong>
                </div>
              </div>
            </div>
            {error && <div className="form-error" style={{ maxWidth: 500, margin: "1rem auto" }}>{error}</div>}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2.5rem" }}>
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="btn-outline">
              <ChevronLeft size={16} style={{ marginRight: "0.3rem" }} /> Zpět
            </button>
          ) : (
            <a href="/" className="btn-outline">Zpět na web</a>
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="btn-primary"
              disabled={
                (step === 0 && !selectedDate) ||
                (step === 1 && !selectedTime.start) ||
                (step === 2 && !selectedPackage) ||
                (step === 3 && (!form.name || !form.email))
              }
            >
              Pokračovat <ChevronRight size={16} style={{ marginLeft: "0.3rem" }} />
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary" disabled={submitting}>
              {submitting ? "Zpracovávám..." : totalAmount > 0 ? "Přejít k platbě" : "Potvrdit rezervaci"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
