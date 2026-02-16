"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-heading font-bold text-sm tracking-wide uppercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-background hover:bg-gold-light hover:shadow-[0_0_30px_rgba(200,169,110,0.3)]",
  outline:
    "border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", href, className = "", children, ...props }, ref) => {
    const classes = `${base} ${variants[variant]} ${className}`;

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
