function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.17V12a4.83 4.83 0 01-3.77-1.54V6.69h3.77z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Column 1: Brand */}
        <div className="footer-col">
          <div className="logo" style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
            KAJO<span>360</span>
          </div>
          <p className="footer-text">
            Prémiový 360° photobooth pro nezapomenutelné zážitky na Vaší akci.
          </p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/kajostudio360" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "#E1306C" }}><IconInstagram /></a>
            <a href="https://www.facebook.com/kajostudio360" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "#1877F2" }}><IconFacebook /></a>
            <a href="https://www.tiktok.com/@kajo.studio.360" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ color: "#fff" }}><IconTikTok /></a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigace</h4>
          <nav className="footer-nav">
            <a href="#jak-to-funguje">Jak to funguje</a>
            <a href="#balicky">Balíčky</a>
            <a href="#galerie">Galerie</a>
            <a href="#vouchery">Vouchery</a>
            <a href="#recenze">Recenze</a>
            <a href="#poptat">Kontakt</a>
          </nav>
        </div>

        {/* Column 3: Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">Kontakt</h4>
          <div className="footer-contact">
            <p>Československé armády 1175</p>
            <p>Slavkov u Brna 684 01</p>
            <p style={{ marginTop: "0.75rem" }}>
              <a href="mailto:info@kajostudio360.cz">info@kajostudio360.cz</a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} KAJO Studio 360. Všechna práva vyhrazena.</p>
        <p>
          Web vytvořil{" "}
          <a href="https://weblyx.cz" target="_blank" rel="noopener noreferrer">Weblyx.cz</a>
        </p>
      </div>
    </footer>
  );
}
