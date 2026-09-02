import { motion } from "framer-motion";
import { Clock3Icon, Eye, Pencil, Trash2Icon } from "lucide-react";
import AvailabilityDot from "./AvailabilityDot";
import FoodTypeBadge from "./FoodTypeBadge";


const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
};



function ItemCard({ item, index, onRead, onEdit, onDelete }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="show"
      layout
      className="group overflow-hidden rounded-card border border-border-main bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover"
    >
      {/* Item Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={item.itemImageUrl}
          alt={item.itemName}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Availability */}
        <div className="absolute top-2.5 left-2.5 rounded-full bg-surface/95 px-2.5 py-1 shadow-xs">
          <AvailabilityDot isAvailable={item.isAvailable} />
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2.5 right-2.5 flex translate-y-1 gap-1.5 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          {/* View */}
          <button
            type="button"
            aria-label="View item"
            onClick={() => onRead(item)}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-surface/95 text-text-main shadow-xs transition-colors hover:bg-primary hover:text-text-on-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Eye className="size-3.5" />
          </button>

          {/* Edit */}
          <button
            type="button"
            aria-label="Edit item"
            onClick={() => onEdit(item)}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-surface/95 text-text-main shadow-xs transition-colors hover:bg-secondary hover:text-text-on-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            <Pencil className="size-3.5" />
          </button>

          {/* Delete */}
          <button
            type="button"
            aria-label="Delete item"
            onClick={() => onDelete(item)}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-surface/95 text-text-main shadow-xs transition-colors hover:bg-error hover:text-text-on-primary focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2"
          >
            <Trash2Icon className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Item Information */}
      <button
        type="button"
        onClick={() => onRead(item)}
        className="block w-full cursor-pointer p-4 text-left"
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-md font-semibold leading-snug text-text-main">
            {item.itemName}
          </h3>

          <FoodTypeBadge type={item.foodType} />
        </div>

        {/* Category */}
        <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-text-subtle">
          {item.category.name ?? "UnCategorized"}
        </p>

        {/* Price, Rating & Preparation Time */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ₹{item.price}
          </span>

          <div className="flex items-center gap-2.5">
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
              {item.preparationTime}m
            </span>
          </div>
        </div>
      </button>

    </motion.div>
  );
}

export default ItemCard;