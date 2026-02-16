interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""}`}>
      {label && (
        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {label}
        </div>
      )}
      <h2
        className="font-heading text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.15] tracking-tight whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p className="mt-6 text-base text-muted max-w-[550px] leading-relaxed font-light">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="mt-3 text-sm text-muted max-w-[550px] leading-relaxed font-light">
          {description}
        </p>
      )}
    </div>
  );
}
