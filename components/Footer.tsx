export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="logo" style={{ fontSize: "1.5rem" }}>
          KAJO <span>STUDIO</span> 360
        </div>
        <p style={{ marginTop: "0.5rem" }}>
          <strong>KAJO Studio 360</strong>
          <br />
          Československé armády 1175, Slavkov u Brna 684 01
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          <a href="mailto:info@kajostudio360.cz">info@kajostudio360.cz</a>
        </p>
        <div className="social-links" style={{ justifyContent: "center", marginTop: "0.75rem" }}>
          <a href="#" className="social-link" style={{ color: "#E1306C" }}>IG</a>
          <a href="#" className="social-link" style={{ color: "#1877F2" }}>FB</a>
          <a href="#" className="social-link" style={{ color: "#000" }}>TT</a>
        </div>
        <p style={{ marginTop: "1rem" }}>&copy; 2026 KAJO Studio 360. Všechna práva vyhrazena.</p>
        <p>
          Web vytvořil{" "}
          <a href="https://weblyx.cz" target="_blank" rel="noopener noreferrer">
            Weblyx.cz
          </a>
        </p>
      </div>
    </footer>
  );
}
