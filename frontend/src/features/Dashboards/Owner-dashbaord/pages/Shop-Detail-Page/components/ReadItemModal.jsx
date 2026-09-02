import { AnimatePresence, motion } from "framer-motion";
import { Clock3Icon, Pencil, Trash2Icon, X } from "lucide-react";
import AvailabilityDot from "./AvailabilityDot";


function ReadItemModal({ item, onClose, onEdit, onDelete }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-dark-bg/60 backdrop-blur-sm sm:items-center"
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-modal bg-surface shadow-modal sm:rounded-modal"
          >
            {/* Item image */}
            <div className="relative h-52 w-full">
              <img
                src={item.itemImageUrl}
                alt={item.itemName}
                className="size-full object-cover sm:rounded-t-modal"
              />

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-full bg-surface/90 text-text-main shadow-sm backdrop-blur-sm transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <X className="size-4" />
              </button>

              {/* Availability */}
              <div className="absolute top-3 left-3 rounded-full bg-surface/95 px-2.5 py-1 shadow-xs">
                <AvailabilityDot isAvailable={item.isAvailable} />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  {/* Category */}
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-subtle">
                    {item.category.name}
                  </p>

                  {/* Item name */}
                  <h3 className="mt-0.5 text-xl font-bold text-text-main">
                    {item.itemName}
                  </h3>
                </div>

                {/* Price */}
                <span className="shrink-0 text-xl font-bold text-primary">
                  ₹{item.price}
                </span>
              </div>

              {/* Rating and preparation time */}
              <div className="mt-3 flex items-center gap-4">
                <span className="rounded-full bg-primary-light px-2 py-1 text-2xs font-semibold uppercase tracking-wide text-primary">
                  {item.category?.type}
                </span>

                {/* Category Status */}
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <span
                    className={`size-1.5 rounded-full ${item.category?.isActive ? "bg-success" : "bg-error"
                      }`}
                  />

                  {item.category?.isActive ? "Active" : "Inactive"}
                </span>

                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <Clock3Icon className="size-3.5" />
                  {item.preparationTime} min prep
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                {item.description}
              </p>

              {/* Actions */}
              <div className="mt-6 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-btn border border-border-main bg-surface py-2.5 text-sm font-semibold text-text-main transition-colors hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <Pencil className="size-4" />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(item)}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-btn border border-error/30 bg-error-light py-2.5 text-sm font-semibold text-error transition-colors hover:bg-error hover:text-white focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2"
                >
                  <Trash2Icon className="size-4" />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ReadItemModal;


