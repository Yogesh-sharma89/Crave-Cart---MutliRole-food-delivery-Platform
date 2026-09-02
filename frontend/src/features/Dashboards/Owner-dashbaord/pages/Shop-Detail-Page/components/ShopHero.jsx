import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  ChefHat,
  Clock3,
  MapPin,
  Package,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router";

function ShopHero({ shop, itemCount }) {

  const navigate = useNavigate();

  const handleGoBack = ()=>{
    navigate(-1);
  }


  return (
    <section className="relative">
      {/* Hero */}
      <div className="relative h-70 w-full overflow-hidden sm:h-85 md:h-100">
        <motion.img
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          src={shop?.shopImage}
          alt={shop?.shopName}
          className="h-full w-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-dark-bg/80 via-dark-bg/10 to-transparent" />

        {/* Back button */}
        <button
          type="button"
          aria-label="Go back"
          onClick={handleGoBack}
          className="absolute top-4 left-4 flex size-10 cursor-pointer items-center justify-center rounded-full bg-surface/90 text-text-main shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <ArrowLeft className="size-5" />
        </button>

        {/* Verified badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-surface/90 px-3 py-1.5 text-xs font-semibold text-text-main shadow-sm backdrop-blur-sm">
          <BadgeCheck className="size-3.5 text-primary" />

          <span>Verified partner</span>
        </div>
      </div>

      {/* Shop information card */}
      <div className="relative z-10 mx-4 -mt-14 sm:mx-8 md:-mt-16">
        <div
          className="rounded-card bg-surface px-5 pt-7 pb-6 shadow-modal sm:px-8"
          style={{
            maskImage:
              "radial-gradient(circle at 12px 0, transparent 8px, black 8.5px), radial-gradient(circle at calc(100% - 12px) 0, transparent 8px, black 8.5px)",
            WebkitMaskImage:
              "radial-gradient(circle at 12px 0, transparent 8px, black 8.5px), radial-gradient(circle at calc(100% - 12px) 0, transparent 8px, black 8.5px)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ChefHat className="size-5 text-primary" />

                <h1 className="text-xl font-bold tracking-tight text-text-main sm:text-2xl">
                  {shop?.shopName}
                </h1>
              </div>

              {/* Address */}
              <p className="mt-1.5 flex items-start gap-1.5 text-sm text-text-muted">
                <MapPin className="mt-0.5 size-4 shrink-0 text-text-subtle" />

                <span>
                  {shop?.address}, {shop?.city}, {shop?.state}{" "}
                  {shop?.pincode}, {shop?.country}
                </span>
              </p>
            </div>

            {/* Open status */}
            <div className="flex shrink-0 items-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success-light px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-success">
                <span className="size-1.5 animate-pulse rounded-full bg-success" />

                Open now
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-border-subtle pt-4">
            {/* Rating */}
            <div className="flex items-center gap-1.5 rounded-full bg-secondary-light px-3 py-1.5">
              <Star className="size-3.5 fill-secondary text-secondary" />

              <span className="font-semibold text-text-main">
                4.7 rating
              </span>
            </div>

            {/* Item count */}
            <div className="flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1.5">
              <Package className="size-3.5 text-primary" />

              <span className="font-semibold text-text-main">
                {itemCount} items added
              </span>
            </div>

            {/* Delivery time */}
            <div className="flex items-center gap-1.5 rounded-full bg-surface-subtle px-3 py-1.5">
              <Clock3 className="size-3.5 text-text-muted" />

              <span className="font-semibold text-text-main">
                20–30 min delivery
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopHero;