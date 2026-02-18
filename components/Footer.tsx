export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="logo" style={{ fontSize: "1.1rem" }}>
          <img src="/images/logo.png" alt="KAJO Studio 360" style={{ height: "56px", width: "auto" }} />
        </div>
        <p>&copy; 2026 Kajo Studio 360. Vsechna prava vyhrazena.</p>
        <p>
          Web vytvoril{" "}
          <a href="https://weblyx.cz" target="_blank" rel="noopener noreferrer">
            Weblyx.cz
          </a>
        </p>
      </div>
    </footer>
  );
}
