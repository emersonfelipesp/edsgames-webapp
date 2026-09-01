type ClassValue = string | false | null | undefined;

/** Minimal class-name joiner. Keeps a `clsx` dependency out of the bundle. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
