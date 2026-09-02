import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

function DeleteItemDialog({
  isOpen,
  onClose,
  onConfirm,
  item,
  isPending = false,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isPending ? onClose : undefined}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 10,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 28,
              }}
              className="
                relative
                w-full
                max-w-md
                overflow-hidden
                rounded-card
                border
                border-border-main
                bg-surface
                p-6
                shadow-2xl
              "
            >
              {/* Decorative background */}
              <div className="pointer-events-none absolute -top-20 -right-20 size-40 rounded-full bg-error/10 blur-3xl" />

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="
                  absolute
                  cursor-pointer
                  top-4
                  right-4
                  flex
                  size-9
                  items-center
                  justify-center
                  rounded-full
                  text-text-muted
                  transition-colors
                  hover:bg-surface-hover
                  hover:text-text-main
                  disabled:pointer-events-none
                  disabled:opacity-50
                "
              >
                <X className="size-4" />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 400,
                }}
                className="
                  flex
                  size-14
                  items-center
                  justify-center
                  rounded-full
                  bg-error/10
                  text-error
                "
              >
                <AlertTriangle className="size-7" />
              </motion.div>

              {/* Content */}
              <div className="mt-5">
                <h2 className="text-xl font-bold text-text-main">
                  Delete item?
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-text-main">
                    {item?.itemName}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>

              {/* Item Preview */}
              {item && (
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-border-main bg-surface-hover p-3">
                  <img
                    src={item.itemImageUrl}
                    alt={item.itemName}
                    className="size-12 rounded-lg object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text-main">
                      {item.itemName}
                    </p>

                    <p className="mt-0.5 text-xs text-text-muted">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isPending}
                  className="
                    inline-flex
                    h-11
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-border-main
                    px-5
                    text-sm
                    font-semibold
                    text-text-main
                    transition-all
                    hover:bg-surface-hover
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isPending}
                  className="
                    inline-flex
                    h-11
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-error
                    px-5
                    text-sm
                    font-semibold
                    text-text-on-primary
                    shadow-sm
                    transition-all
                    hover:-translate-y-0.5
                    hover:shadow-md
                    active:translate-y-0
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="size-4" />
                      Delete Item
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default DeleteItemDialog;