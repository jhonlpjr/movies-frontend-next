"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  loading,
}) => {
  if (!open) return null;

  const modalRef = useRef<HTMLDivElement>(null);

  // Foco seguro en Cancel para evitar confirmar por error
  useEffect(() => {
    modalRef.current
      ?.querySelector<HTMLButtonElement>("[data-cancel]")
      ?.focus();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onCancel();
    if (e.key === "Enter") onConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70"
      onKeyDown={onKeyDown}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        className="bg-white rounded-xl shadow-lg p-6 w-[min(92vw,420px)]"
        tabIndex={-1}
      >
        <h3 id="confirm-title" className="text-lg font-bold mb-2">
          {title}
        </h3>
        {description && (
          <p id="confirm-desc" className="mb-4 text-gray-600">
            {description}
          </p>
        )}

        <div className="mt-6 flex justify-center gap-3">
          {/* Cancel primero, outline; hover visible */}
          <Button
            variant="outline"
            onClick={onCancel}
            className="w-28 transition-colors duration-200 hover:bg-muted hover:text-foreground"
            disabled={loading}
            data-cancel
          >
            Cancel
          </Button>

          {/* OK a la derecha, destructive; hover consistente */}
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
            className="
            w-28
            transition-transform duration-200
            hover:bg-[color-mix(in oklab,var(--destructive) 85%, black)]
            active:bg-[color-mix(in oklab,var(--destructive) 75%, black)]
            motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]
            "
          >
            {loading ? "Eliminando…" : "OK"}
          </Button>
        </div>
      </div>
    </div>
  );
};
