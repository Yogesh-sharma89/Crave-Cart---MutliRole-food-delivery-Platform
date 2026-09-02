import { motion } from "framer-motion";
import { KeyRound, PhoneCall, LifeBuoy, ChevronRight } from "lucide-react";
import {useNavigate} from "react-router";


function ActionRow({ icon: Icon, title, description, onClick, index }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 2 }}
      className="group cursor-pointer flex w-full items-center gap-4 rounded-card border border-border-main bg-surface p-4 text-left shadow-xs transition-colors duration-150 ease-smooth hover:border-border-hover hover:bg-surface-hover hover:shadow-hover"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-text-main">{title}</span>
        <span className="block text-xs text-text-muted">{description}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-text-subtle transition-transform duration-150 ease-smooth group-hover:translate-x-0.5 group-hover:text-primary" />
    </motion.button>
  );
}


export default function SecurityPanel({ onAddPhone, onRecoverAccount }) {

  const navigate = useNavigate();

  const onChangePassword = ()=>{
    navigate("/profile/change-password",{replace:true})
  }
    
  const actions = [
    {
      icon: KeyRound,
      title: "Change password",
      description: "Update the password used to sign in",
      onClick: onChangePassword,
    },
    {
      icon: PhoneCall,
      title: "Add another phone number",
      description: "Use a second number for order updates & recovery",
      onClick: onAddPhone,
    },
    {
      icon: LifeBuoy,
      title: "Recover account",
      description: "Restore access if your account was recently deactivated",
      onClick: onRecoverAccount,
    },
  ];

  return (
    <div>
      <h3 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
        Security & recovery
      </h3>
      <div className="space-y-2.5">
        {actions.map((a, i) => (
          <ActionRow key={a.title} index={i} {...a} />
        ))}
      </div>
    </div>
  );
}
