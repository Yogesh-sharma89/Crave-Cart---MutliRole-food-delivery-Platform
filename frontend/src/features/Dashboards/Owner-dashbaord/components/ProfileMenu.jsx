import { Link } from "react-router";
import {
    HiOutlineUser,
    HiOutlineArrowRightOnRectangle,
    HiOutlineShieldCheck,
} from "react-icons/hi2";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import useLogout from "../../../auth/hooks/useLogout";
import useAuthUser from "../../../auth/hooks/useAuthUser";

const ProfileMenu = () => {

    const {mutateAsync:logout} = useLogout();
    const {data:user} = useAuthUser();
    
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {

            await toast.promise(logout(), {
                loading: "Logging you out...",
                success: () => {
                    navigate("/login")
                    return "Logout successfully"
                },
                error: (err) => err.message || "Failed to logout"
            })

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div
             className="w-[clamp(180px,85vw,18rem)] max-w-[95vw] overflow-hidden rounded-[clamp(1.25rem,5vw,1.5rem)] border border-orange-100 bg-white shadow-[0_20px_50px_rgba(255,107,53,0.15)]"
           >
             {/* Header */}
             <div className="bg-linear-to-br from-[#B8823B] to-[#96652A] p-[clamp(0.75rem,4vw,1.25rem)]">
               <div className="flex items-center gap-[clamp(0.5rem,3vw,1rem)]">
                 <div className="flex h-[clamp(2.25rem,12vw,3.5rem)] w-[clamp(2.25rem,12vw,3.5rem)] shrink-0 items-center justify-center rounded-full bg-white font-bold text-[#96652A] shadow-md text-[clamp(0.75rem,4vw,1.125rem)]">
                   {user?.avatar ? (
                     <img
                       src={user.avatar}
                       alt={user.fullName}
                       className="h-full w-full rounded-full object-cover"
                     />
                   ) : (
                   <span className="text-lg">{ user?.fullname?.charAt(0)?.toUpperCase() || "U"}</span> 
                   )}
                 </div>
                 <div className="min-w-0 flex-1">
                   <h3 className="truncate font-semibold text-white text-[clamp(0.8rem,4vw,1rem)]">
                     {user?.fullname}
                   </h3>
                 </div>
               </div>
             </div>
       
             {/* Verification */}
             <div className="border-b border-orange-100 px-[clamp(0.75rem,4vw,1.25rem)] py-[clamp(0.5rem,2.5vw,0.75rem)]">
               <div className="flex items-center gap-[clamp(0.375rem,1.5vw,0.5rem)] text-[clamp(0.7rem,3vw,0.875rem)]">
                 <HiOutlineShieldCheck
                   className={`shrink-0 text-[1.3em] ${
                     user?.isVerified.phone ? "text-emerald-500" : "text-amber-500"
                   }`}
                 />
                 <span
                   className={`truncate font-medium ${
                     user?.isVerified.phone ? "text-emerald-600" : "text-amber-600"
                   }`}
                 >
                   {user?.isVerified.phone ? "Verified Account" : "Verification Pending"}
                 </span>
               </div>
             </div>
       
             {/* Menu */}
             <div className="p-[clamp(0.375rem,2vw,0.5rem)]">
               <Link
                 to="/profile"
                 className="group flex items-center gap-[clamp(0.5rem,3vw,0.75rem)] rounded-[clamp(0.875rem,4vw,1rem)] px-[clamp(0.5rem,3vw,1rem)] py-[clamp(0.5rem,2.5vw,0.75rem)] transition-all duration-200 hover:bg-orange-50"
               >
                 <div className="shrink-0 rounded-[clamp(0.625rem,3vw,0.75rem)] bg-orange-100 p-[clamp(0.3rem,1.5vw,0.5rem)] text-orange-600 text-[clamp(0.9rem,4vw,1.125rem)] transition group-hover:bg-orange-500 group-hover:text-white">
                   <HiOutlineUser className="text-[1em]" />
                 </div>
                 <span className="font-medium text-gray-700 text-[clamp(0.75rem,3.5vw,1rem)]">
                   My Profile
                 </span>
               </Link>
       
               <button
                 onClick={handleLogout}
                 className="group mt-1 cursor-pointer flex w-full items-center gap-[clamp(0.5rem,3vw,0.75rem)] rounded-[clamp(0.875rem,4vw,1rem)] px-[clamp(0.5rem,3vw,1rem)] py-[clamp(0.5rem,2.5vw,0.75rem)] text-left transition-all duration-200 hover:bg-red-50"
               >
                 <div className="shrink-0 rounded-[clamp(0.625rem,3vw,0.75rem)] bg-red-100 p-[clamp(0.3rem,1.5vw,0.5rem)] text-red-500 text-[clamp(0.9rem,4vw,1.125rem)] transition group-hover:bg-red-500 group-hover:text-white">
                   <HiOutlineArrowRightOnRectangle className="text-[1em]" />
                 </div>
                 <span className="font-medium text-red-600 text-[clamp(0.75rem,3.5vw,1rem)]">
                   Logout
                 </span>
               </button>
             </div>
           </div>
    );
};

export default ProfileMenu;