import { Package, Plus, Search } from "lucide-react";

function ItemsToolbar({ query, setQuery, count, onAddClick }) {
  return (
    <div className="sticky top-0 z-10 -mx-4 mb-2 border-b border-border-subtle bg-app-bg/90 px-4 py-4 backdrop-blur-md sm:-mx-8 sm:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-text-main">
            Menu
          </h2>

          <span className="inline-flex items-center gap-1 rounded-full border border-border-main bg-surface px-2.5 py-1 text-xs font-bold text-text-muted">
            <Package className="size-3" />
            {count} added
          </span>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2.5">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-subtle" />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search items..."
              className="w-full rounded-btn border border-border-main bg-surface py-2.5 pr-3 pl-9 text-sm text-text-main outline-none transition placeholder:text-text-subtle focus:border-border-focus focus:ring-2 focus:ring-primary/15"
            />
          </div>

          {/* Add item */}
          <button
            type="button"
            onClick={onAddClick}
            className="inline-flex cursor-pointer shrink-0 items-center gap-1.5 rounded-btn bg-primary px-4 py-2.5 text-sm font-semibold text-text-on-primary shadow-primary transition-colors hover:bg-primary-hover active:bg-primary-active focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Plus className="size-4" />

            <span className="hidden sm:inline">
              Add New Item
            </span>

            <span className="sm:hidden">
              Add
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemsToolbar;