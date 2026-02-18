"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Neplatné přihlašovací údaje");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          KAJO <span>STUDIO</span> 360
        </div>
        <h1>Administrace</h1>
        <p>Přihlaste se pro přístup do admin panelu</p>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@kajostudio360.cz"
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="password">Heslo</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <div className="admin-login-error">{error}</div>}
          <button type="submit" disabled={loading} className="admin-login-btn">
            {loading ? "Přihlašování..." : "Přihlásit se"}
          </button>
        </form>
      </div>
    </div>
  );
}
