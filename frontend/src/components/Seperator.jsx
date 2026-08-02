import React from 'react'

const Seperator = () => {
    return (
        <div className="flex items-center gap-4 my-4">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-border-main to-border-main" />

            <span className="rounded-full border border-border-main bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                OR
            </span>

            <div className="h-px flex-1 bg-linear-to-l from-transparent via-border-main to-border-main" />
        </div>
    )
}

export default Seperator
