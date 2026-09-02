import { AnimatePresence, motion } from "framer-motion";
import { Camera, BadgeCheck } from "lucide-react";
import { useRef, useState } from "react";
import useProfileAvatar from "../hooks/ui/useProfileAvatar";
import ProfileAvatarSkeleton from "./ProfileAvatarSkeleton"

export default function ProfileAvatar({ avatarUrl, fullName, provider, verified }) {
    
  const initials = fullName
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

    const inputRef = useRef(null);

    const {handleUpdateAvatar,isAvatarUpdating } = useProfileAvatar();


  return (

   
      <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">

        <AnimatePresence mode="wait">
          {
            isAvatarUpdating ? 
            <ProfileAvatarSkeleton/>
            :
           <motion.button
            type="button"
            onClick={()=>inputRef.current.click()}
            whileTap={{ scale: 0.96 }}
            className="group cursor-pointer relative h-full w-full overflow-hidden rounded-full ring-4 ring-primary-light shadow-card focus:outline-none focus-visible:ring-border-focus"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={fullName}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary-subtle font-sans text-xl font-semibold text-primary">
                {initials}
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center bg-dark-bg/0 opacity-0 transition-all duration-200 ease-smooth group-hover:bg-dark-bg/50 group-hover:opacity-100">
              <Camera className="h-6 w-6 text-on-dark" strokeWidth={1.75} />
            </div>
           </motion.button>
          }
        </AnimatePresence>

        <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={(e)=>handleUpdateAvatar(e)}
        className="hidden"
        />

      {verified && !isAvatarUpdating && (
        <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-surface shadow-sm ring-2 ring-surface">
          <BadgeCheck className="h-5 w-5 text-success" strokeWidth={2} />
        </span>
      )}

      {provider && !isAvatarUpdating && (
        <span className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-dark-bg text-2xs font-bold text-white shadow-sm ring-2 ring-surface">
          {provider === "google" ? "G" : provider[0]?.toUpperCase()}
        </span>
      )}
    </div>
  );
}
