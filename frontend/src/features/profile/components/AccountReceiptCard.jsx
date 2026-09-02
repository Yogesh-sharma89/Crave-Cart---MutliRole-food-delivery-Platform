import { motion } from "framer-motion";
import { User, Mail, Phone, LogIn, CalendarDays, Pencil, BadgeCheck } from "lucide-react";

const TORN_EDGE =
    "polygon(0% 8px,4% 0,8% 8px,12% 0,16% 8px,20% 0,24% 8px,28% 0,32% 8px,36% 0,40% 8px,44% 0,48% 8px,52% 0,56% 8px,60% 0,64% 8px,68% 0,72% 8px,76% 0,80% 8px,84% 0,88% 8px,92% 0,96% 8px,100% 0,100% 100%,0% 100%)";

function formatDate(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function Row({ icon: Icon, label, value, verified, onEdit, editLabel }) {
    return (
        <div className="flex items-center gap-3 border-b border-dashed border-border-main py-3.5 last:border-b-0">
            <Icon className="h-4 w-4 shrink-0 text-text-subtle" strokeWidth={1.75} />
            <div className="min-w-0 flex-1">
                <p className="font-mono text-2xs uppercase tracking-wider text-text-muted">{label}</p>
                <p className="truncate font-mono text-sm text-text-main">{value}</p>
            </div>
            {verified && (
                <span className="flex items-center gap-1 rounded-full bg-success-light px-2 py-0.5 text-2xs font-medium text-success">
                    <BadgeCheck className="h-3 w-3" />
                    Verified
                </span>
            )}
            {onEdit && (
                <button
                    type="button"
                    onClick={onEdit}
                    aria-label={editLabel}
                    className="rounded-sm p-1.5 text-text-subtle transition-colors duration-150 ease-smooth hover:bg-subtle hover:text-primary"
                >
                    <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
            )}
        </div>
    );
}


export default function AccountReceiptCard({ user, onChangeName, onChangePhone }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-card bg-surface shadow-card"
        >
            <div className="h-2.5 bg-app-bg" style={{ clipPath: TORN_EDGE }} />

            <div className="px-6 pb-2 pt-5 sm:px-7">
                <p className="font-mono text-2xs uppercase tracking-[0.2em] text-text-subtle">
                    Account · Order No. {String(user?.createdAt ?? "").slice(2, 10).replace(/-/g, "")}
                </p>
                <h2 className="mt-1 text-md font-semibold text-text-main">Account details</h2>
            </div>

            <div className="px-6 sm:px-7">
                <Row icon={User} label="Full name" value={user.fullname} onEdit={onChangeName} editLabel="Change name" />
                <Row icon={Mail} label="Email" value={user.email} verified={user.isVerified?.email} />
                <Row
                    icon={Phone}
                    label="Phone"
                    value={user.phone}
                    verified={user.isVerified?.phone}
                    onEdit={onChangePhone}
                    editLabel="Add phone number"
                />
                <Row
                    icon={LogIn}
                    label="Signed in with"
                    value={user.provider ? user.provider[0].toUpperCase() + user.provider.slice(1) : "—"}
                />
                <Row icon={CalendarDays} label="Member since" value={formatDate(user.createdAt)} />
            </div>

            <div className="mt-2 flex h-6 items-end gap-0.75 overflow-hidden px-6 pb-4 sm:px-7">
                {Array.from({ length: 38 }).map((_, i) => (
                    <span
                        key={i}
                        className="bg-border-hover"
                        style={{ width: 2, height: [4, 10, 16, 8, 14][i % 5] }}
                    />
                ))}
            </div>
        </motion.div>
    );
}
