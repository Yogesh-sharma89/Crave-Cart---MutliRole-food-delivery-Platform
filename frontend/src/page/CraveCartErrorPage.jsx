import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ArrowLeft, UtensilsCrossed, TriangleAlert, RefreshCcwIcon } from "lucide-react";
import { useNavigate } from "react-router";


function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-(--color-primary)">
        <UtensilsCrossed size={18} strokeWidth={2.25} className="text-(--color-text-on-primary)" />
      </div>
      <span className="font-(--font-sans) text-md tracking-tight text-(--color-text-main)">
        Crave<span className="text-(--color-primary)">Cart</span>
      </span>
    </div>
  );
}

function GoBackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-btn border border-border-main bg-transparent px-4 py-2.5 font-(--font-sans) text-(length:--text-sm) text-(--color-text-main) transition-colors hover:bg-surface-hover hover:border-border-hover active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-border-focus)"
    >
      <RefreshCcwIcon size={16} />
      Reload
    </button>
  );
}

function HomeButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-btn border border-transparent bg-(--color-primary) px-4 py-2.5 font-(--font-sans) text-(length:--text-sm) text-(--color-text-on-primary) transition-colors hover:bg-primary-hover active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-border-focus)"
    >
      <Home size={16} />
      Home
    </button>
  );
}

function Header({ onHome, onBack }) {
  return (
    <header className="sticky top-0 z-20 bg-(--color-surface) border-b border-border-main">
      <div className="mx-auto flex max-w-280 items-center justify-between gap-4 px-6 py-3.5">
        <Logo />
        <div className="flex items-center gap-2.5">
          <GoBackButton onClick={onBack} />
          <HomeButton onClick={onHome} />
        </div>
      </div>
    </header>
  );
}

export default function CraveCartErrorPage() {

  const navigate = useNavigate();
   
  const handleReload = () => {
    // Wire this to your router's back navigation, e.g. navigate(-1)
    if (typeof window !== "undefined") window.location.reload();
  };

  const handleHome = () => {
      navigate("/user",{replace:true})
  };

  return (
    <div className="min-h-screen bg-app-bg font-(--font-sans)">
      <Header onHome={handleHome} onBack={handleReload} />

      <AnimatePresence>
        <motion.main
          key="error-state"
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.8 }}
          className="mx-auto flex max-w-140 flex-col items-center px-6 pb-16 pt-24 text-center"
        >
          {/* icon with pulsing ring cue */}
          <div className="relative mb-7 h-22 w-22">
            <span className="absolute inset-0 rounded-full border-2 border-error animate-[cc-ring-pulse_2.2s_ease-out_infinite] motion-reduce:animate-none" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full border border-border-main bg-error-light animate-[cc-float_3.2s_ease-in-out_infinite] motion-reduce:animate-none">
              <TriangleAlert size={34} strokeWidth={2} className="text-error" />
            </div>
          </div>

          <span className="mb-2.5 font-(--font-mono) text-(length:--text-xs) uppercase tracking-[0.08em] text-text-muted">
            Error 404
          </span>

          <h1 className="mb-2.5 text-(length:--text-2xl) font-extrabold tracking-tight text-(--color-text-main)">
            This order isn't on the menu
          </h1>

          <p className="mb-8 text-(length:--text-base) leading-relaxed text-text-muted">
            We couldn't find the page you were looking for. It may have been moved,
            renamed, or the link might be off. Head back to safety or try the previous page.
          </p>

          <div className="flex gap-3">
            <GoBackButton onClick={handleReload} />
            <HomeButton onClick={handleHome} />
          </div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
