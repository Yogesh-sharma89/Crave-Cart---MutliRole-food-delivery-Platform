import React from 'react'

const ShopCardSkeleton = () => {
    return (
        <div className='w-full rounded-2xl bg-surface border border-border-main shadow-sm overflow-hidden animate-pulse'>

            {/* image area */}
            <div className='relative h-55 w-full bg-subtle'>

                {/* status badge, top-right */}
                <div className='absolute top-4 right-4 h-7 w-24 rounded-full bg-border-main/70' />

                {/* icon + title, bottom-left */}
                <div className='absolute bottom-4 left-4 flex items-center gap-2.5'>
                    <div className='h-9 w-9 rounded-lg bg-border-main/70' />
                    <div className='h-6 w-36 rounded-md bg-border-main/70' />
                </div>
            </div>

            {/* body */}
            <div className='flex flex-col gap-4 p-5'>

                {/* location */}
                <div className='flex items-start gap-2.5'>
                    <div className='h-5 w-5 shrink-0 rounded-full bg-subtle' />
                    <div className='flex flex-col gap-2'>
                        <div className='h-4 w-32 rounded bg-subtle' />
                        <div className='h-3.5 w-40 rounded bg-subtle' />
                    </div>
                </div>

                {/* street address */}
                <div className='flex items-center gap-2.5'>
                    <div className='h-5 w-5 shrink-0 rounded-full bg-subtle' />
                    <div className='h-4 w-44 rounded bg-subtle' />
                </div>

                {/* country + pincode */}
                <div className='flex items-center gap-5'>
                    <div className='flex items-center gap-2.5'>
                        <div className='h-5 w-5 shrink-0 rounded-full bg-subtle' />
                        <div className='h-4 w-14 rounded bg-subtle' />
                    </div>
                    <div className='flex items-center gap-2.5'>
                        <div className='h-5 w-5 shrink-0 rounded-full bg-subtle' />
                        <div className='h-4 w-16 rounded bg-subtle' />
                    </div>
                </div>

                {/* divider */}
                <div className='border-t border-border-subtle' />

                {/* buttons */}
                <div className='flex items-center gap-3'>
                    <div className='h-11 flex-1 rounded-xl bg-subtle' />
                    <div className='h-11 flex-1 rounded-xl bg-subtle' />
                </div>
            </div>
        </div>
    )
}


const ShopSkeleton = ({ count = 3 }) => {
    return (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
            {Array.from({ length: count }).map((_, i) => (
                <ShopCardSkeleton key={i} />
            ))}
        </div>
    )
}

export default ShopSkeleton
