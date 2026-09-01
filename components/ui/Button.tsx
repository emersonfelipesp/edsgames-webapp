import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl text-center font-display font-bold uppercase tracking-wide " +
  "transition-transform transition-colors duration-200 will-change-transform " +
  "active:translate-y-px disabled:opacity-50 disabled:pointer-events-none";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-accent/90 shadow-[0_0_28px_-10px_var(--color-accent)]",
  secondary:
    "bg-panel-raised text-ink border border-line-bright hover:border-neon-cyan hover:text-neon-cyan",
  ghost: "text-muted hover:text-ink",
};

const SIZES: Record<Size, string> = {
  md: "min-h-11 px-4 py-3 text-sm leading-tight",
  lg: "min-h-13 px-5 py-4 text-base leading-tight",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  /**
   * Prefetching a route pulls its whole RSC payload — about 10 KB each here.
   * Worth it for the primary download call to action, not for every secondary
   * link on the page.
   */
  prefetch?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external = false,
  prefetch,
  className,
  children,
}: ButtonLinkProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={prefetch} className={classes}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...rest}
    />
  );
}
