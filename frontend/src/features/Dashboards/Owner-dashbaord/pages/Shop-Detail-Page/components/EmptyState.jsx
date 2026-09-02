import { PlusIcon, ShoppingBagIcon } from "lucide-react";

function EmptyState({ hasQuery, onAddClick }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-card border border-dashed border-border-main bg-surface px-6 py-16 text-center">
      {/* Icon */}
      <div className="flex size-14 items-center justify-center rounded-full bg-primary-light">
        <ShoppingBagIcon className="size-6 text-primary" />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-md font-semibold text-text-main">
        {hasQuery ? "No items match your search" : "No items yet"}
      </h3>

      {/* Description */}
      <p className="mt-1 max-w-xs text-sm text-text-muted">
        {hasQuery
          ? "Try a different name or category."
          : "Add your first menu item so customers can start ordering."}
      </p>

      {/* Add Button */}
      {!hasQuery && (
        <button
          type="button"
          onClick={onAddClick}
          className="mt-5 inline-flex cursor-pointer items-center gap-1.5 rounded-btn bg-primary px-4 py-2.5 text-sm font-semibold text-text-on-primary shadow-primary transition-colors hover:bg-primary-hover active:bg-primary-active focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <PlusIcon className="size-4" />
          Add New Item
        </button>
      )}
    </div>
  );
}


export default EmptyState;