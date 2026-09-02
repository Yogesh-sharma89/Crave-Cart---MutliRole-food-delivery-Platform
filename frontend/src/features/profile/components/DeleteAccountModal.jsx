import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteAccountModal({ open, fullName, onConfirm, onClose ,isDeleting}) {

  const [input, setInput] = useState("");
  
  const canDelete = input.trim().toLowerCase() === fullName?.trim().toLowerCase();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-modal bg-surface p-7 shadow-modal"
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-sm p-1 text-text-subtle hover:bg-subtle hover:text-text-main"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-error-light">
              <AlertTriangle className="h-5 w-5 text-error" strokeWidth={2} />
            </span>

            <h3 className="text-lg font-semibold text-text-main">Delete your account?</h3>
            <p className="mt-1.5 text-sm text-text-muted">
              This permanently removes your CraveCart profile, saved addresses, and order
              history. This can't be undone from here — use{" "}
              <span className="font-medium text-text-main">Recover account</span> within the
              grace period if you change your mind.
            </p>

            <label className="mt-5 block text-xs font-medium text-text-muted">
              Type <span className="font-semibold text-text-main">{fullName}</span> to confirm
            </label>
            <input
              value={input}
              disabled={isDeleting}
              onChange={(e) => setInput(e.target.value)}
              placeholder={fullName}
              className="mt-1.5 disabled:cursor-not-allowed w-full rounded-btn border border-border-main bg-subtle px-3 py-2 text-sm text-text-main placeholder:text-text-subtle focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
            />

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isDeleting}
                className="flex-1  cursor-pointer disabled:cursor-not-allowed rounded-btn border border-border-main bg-surface py-2.5 text-sm font-medium text-text-main transition-colors duration-150 ease-smooth hover:bg-surface-hover"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!canDelete || isDeleting}
                onClick={onConfirm}
                className="flex-1 cursor-pointer disabled:cursor-not-allowed rounded-btn bg-error py-2.5 text-sm font-semibold text-on-primary transition-opacity duration-150 ease-smooth disabled:opacity-40"
              >
               {
                isDeleting ? "Deleting account...":"Delete account"
               }
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
