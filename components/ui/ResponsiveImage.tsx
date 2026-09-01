import { cn } from "@/lib/cn";

type ResponsiveImageProps = {
  /** Ordered smallest first; each entry is `[path, intrinsic width]`. */
  sources: ReadonlyArray<readonly [string, number]>;
  /** The `sizes` attribute — how wide the image renders at each breakpoint. */
  sizes: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

/**
 * A plain `<img>` with a real `srcSet`.
 *
 * `next/image` cannot help here: a static export runs no image optimizer, so
 * `unoptimized` is forced and the component emits a single source regardless of
 * viewport. Serving a 1600 px hero to a 390 px phone is exactly the waste this
 * site cannot afford, so the variants are generated at build preparation time
 * and offered here directly.
 */
export function ResponsiveImage({
  sources,
  sizes,
  alt,
  width,
  height,
  className,
  priority = false,
}: ResponsiveImageProps) {
  const [largestSrc] = sources[sources.length - 1];
  const srcSet = sources.map(([src, w]) => `${src} ${w}w`).join(", ");

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={largestSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
      className={cn(className)}
    />
  );
}

/** The image sets used in more than one place. */
export const LOGO_SOURCES = [
  ["/img/logo-360.webp", 360],
  ["/img/logo-720.webp", 720],
] as const;

export const INTERFACE_SOURCES = [
  ["/img/interface-480.webp", 480],
  ["/img/interface-800.webp", 800],
  ["/img/interface.webp", 1600],
] as const;

export const BOX_ART_SOURCES = [
  ["/img/box-art-200.webp", 200],
  ["/img/box-art-320.webp", 320],
  ["/img/box-art.webp", 555],
] as const;
