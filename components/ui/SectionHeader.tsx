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
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""}`}>
      {label && (
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-gold">
          {label}
        </span>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">{subtitle}</p>
      )}
      {description && (
        <p className="mt-3 text-sm text-muted max-w-xl mx-auto">{description}</p>
      )}
    </div>
  );
}
