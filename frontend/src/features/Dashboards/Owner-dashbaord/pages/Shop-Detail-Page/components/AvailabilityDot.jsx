function AvailabilityDot({ isAvailable }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        {isAvailable && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            isAvailable
              ? "bg-success"
              : "bg-text-subtle"
          }`}
        />
      </span>
      <span
        className={`text-(--text-2xs) font-semibold uppercase tracking-wide ${
          isAvailable
            ? "text-success"
            : "text-text-subtle"
        }`}
      >
        {isAvailable ? "In stock" : "86'd"}
      </span>
    </span>
  );
}

export default AvailabilityDot;