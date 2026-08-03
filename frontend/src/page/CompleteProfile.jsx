import { motion } from "framer-motion";
import { UserCheck, ShieldCheck, Phone } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { PhoneInput, defaultCountries } from 'react-international-phone';
import 'react-international-phone/style.css'
import { ValidatePhone } from "../utils/validatePhone";
import useAuthStore from "../store/auth.store";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner"

export default function CompleteProfile() {

    const {  user, error,isProfilePending,completeProfile } = useAuthStore();

    const navigate = useNavigate();

    const { handleSubmit, reset, control, formState: { errors, touchedFields } } = useForm({ mode: "onChange" });


    const onSubmit = async (data) => {
        const { phone } = data;
        try {

            await toast.promise(completeProfile(phone, user?.email), {
                loading: "Completing Profile....",
                success: () => {
                    reset();
                    navigate("/", { replace: true });
                    return "Profile completed successfully"
                },
                error: (err) => err.message || error
            })

        } catch (err) {
            console.log("Error in complete profile component submit : ", err.message)

            toast.error(err.message);
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-app-bg px-6 py-12">

            {/* Background */}
            <motion.div
                animate={{
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 10,
                }}
                className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary-light blur-3xl opacity-60"
            />

            <motion.div
                animate={{
                    x: [0, -20, 0],
                    y: [0, 20, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 12,
                }}
                className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-secondary-light blur-3xl opacity-60"
            />

            {/* Card */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 40,
                    scale: .97
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                }}
                className="relative w-full max-w-lg rounded-3xl border border-border-main bg-(--color-surface) lg:p-10 md:p-8 max-md:p-6 shadow-[0_30px_70px_rgba(15,23,42,.08)]"
            >

                {/* Icon */}

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-light">
                    <UserCheck
                        size={38}
                        className="text-(--color-primary)"
                    />
                </div>

                {/* Heading */}

                <h1 className="mt-8 text-center max-md:text-2xl text-3xl font-bold text-(--color-text-main)">
                    Complete Your Profile
                </h1>

                <p className="mt-5 text-center max-md:text-md md:text-lg text-(--color-text-main)">
                    Welcome,
                    <span className="font-semibold text-(--color-primary)">
                        {" "}
                        {user?.fullname}
                    </span>
                </p>

                <p className="mt-3 text-center max-md:text-sm leading-7 max-md:leading-5 text-text-muted">
                    Your Google account has been connected successfully.
                    We just need your phone number and role before you start using
                    CraveCart.
                </p>

                {/* Phone */}

                <div className="mt-10">

                    <label className="mb-3 block font-semibold text-(--color-text-main)">
                        Phone Number
                    </label>

                    <form className="rounded-xl   bg-white p-1" onSubmit={handleSubmit(onSubmit)}>

                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: "Phone number is required",
                                validate: ValidatePhone
                            }}
                            render={({ field }) => (
                                <PhoneInput
                                    disabled={isProfilePending}
                                    defaultCountry="in"
                                    value={field.value}
                                    required
                                    onChange={field.onChange}
                                    countries={defaultCountries}
                                    inputStyle={{
                                        width: "100%",
                                        padding: "10px"
                                    }}
                                    className="w-full border  rounded-lg px-3 py-1 text-sm  focus:ring-2 focus:ring-orange-600 focus:outline-none focus:border-transparent transition-all duration-150"
                                />
                            )}
                        />

                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.phone?.message}
                            </p>
                        )}

                        {/* Info */}

                        <div className="mt-6 flex items-start gap-3 rounded-xl bg-primary-light p-4">

                            <ShieldCheck
                                size={20}
                                className="mt-0.5 text-(--color-primary)"
                            />

                            <p className="text-sm leading-6 text-text-muted">
                                Your phone number is used only for delivery updates,
                                account recovery and important order notifications.
                            </p>

                        </div>

                        {/* Button */}

                        <motion.button
                            whileHover={{
                                scale: 1.02,
                                y: -2
                            }}
                            whileTap={{
                                scale: .98
                            }}
                            type="submit"
                            className="mt-8 select-none cursor-pointer flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-(--color-primary) font-semibold text-white shadow-lg transition hover:bg-primary-hover"
                        >

                            <Phone size={18} />

                            Complete My Profile

                        </motion.button>

                    </form>

                </div>



            </motion.div>

        </div>
    );
}