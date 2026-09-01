"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { PIX_PAYLOAD } from "@/lib/pix";

type CopyPixButtonProps = {
  label: string;
  copiedLabel: string;
  failedLabel: string;
  keyLabel: string;
};

type Status = "idle" | "copied" | "failed";

/**
 * Copies the PIX payload to the clipboard. The asynchronous Clipboard API is
 * unavailable in several real-world cases — an insecure origin, an in-app
 * browser, a permission the user denied — so a failure falls back to revealing
 * a selectable field rather than silently doing nothing.
 */
export function CopyPixButton({ label, copiedLabel, failedLabel, keyLabel }: CopyPixButtonProps) {
  const [status, setStatus] = useState<Status>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const resetLater = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus("idle"), 4000);
  };

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(PIX_PAYLOAD);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    resetLater();
  };

  return (
    <div className="w-full">
      <Button onClick={handleCopy} size="lg" className="w-full sm:w-auto">
        {status === "copied" ? copiedLabel : label}
      </Button>

      <p aria-live="polite" className="sr-only">
        {status === "copied" ? copiedLabel : status === "failed" ? failedLabel : ""}
      </p>

      {status === "copied" ? (
        <p className="mt-3 text-sm text-neon-lime">{copiedLabel}</p>
      ) : null}

      {status === "failed" ? (
        <p className="mt-3 text-sm text-neon-amber">{failedLabel}</p>
      ) : null}

      <details className="mt-5 group">
        <summary className="inline-flex min-h-11 cursor-pointer list-none items-center text-sm text-muted underline decoration-line-bright underline-offset-4 transition-colors hover:text-ink">
          {keyLabel}
        </summary>
        <textarea
          readOnly
          rows={4}
          value={PIX_PAYLOAD}
          aria-label={keyLabel}
          onFocus={(event) => event.currentTarget.select()}
          className="mt-3 w-full resize-none rounded-lg border border-line bg-void p-3 font-mono text-xs leading-relaxed text-muted"
        />
      </details>
    </div>
  );
}
