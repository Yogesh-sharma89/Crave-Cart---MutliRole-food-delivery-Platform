import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, AlertTriangle } from "lucide-react";
import DeleteAccountModal from "./DeleteAccountModal";
import useAccountDelete from "../hooks/ui/useAccountDelete";


export default function DangerZone({ fullName }) {
    
  const {handleDelete,confirmOpen,setConfirmOpen,isPending} = useAccountDelete();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-card border border-error/25 bg-error-light/60 p-5 sm:p-6"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-error shadow-xs">
            <AlertTriangle className="h-4.5 w-4.5" strokeWidth={1.75} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-text-main">Danger zone</h3>
            <p className="mt-1 text-xs leading-relaxed text-text-muted">
              Deleting your account removes your profile, saved addresses, and order history
              from CraveCart. This action is permanent once the recovery window closes.
            </p>
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="mt-4 inline-flex items-center cursor-pointer gap-2 rounded-btn bg-error px-4 py-2 text-sm font-semibold text-on-primary shadow-sm transition-transform duration-150 ease-smooth hover:brightness-95 active:scale-[0.98]"
            >
              <Trash2 className="h-4 w-4" strokeWidth={1.75} />
              Delete account
            </button>
          </div>
        </div>
      </motion.div>

      <DeleteAccountModal
        open={confirmOpen}
        fullName={fullName}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        isDeleting={isPending}
      />
    </>
  );
}
