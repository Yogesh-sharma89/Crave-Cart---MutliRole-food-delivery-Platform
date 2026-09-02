import { motion } from "framer-motion";
import ProfileAvatar from "../components/ProfileAvatar";
import AccountReceiptCard from "../components/AccountReceiptCard";
import SecurityPanel from "../components/SecurityPanel";
import DangerZone from "../components/DangerZone";
import useAuthUser from "../../auth/hooks/useAuthUser"
import FullscreenLoader from "../../auth/components/Loader"

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

 const ProfilePage = ({
  onChangeName,
  onAddPhone,
  onChangePassword,
  onRecoverAccount,
  onDeleteAccount,})=> {

    const {data:user,isLoading} = useAuthUser();

    if(isLoading){
      return <FullscreenLoader text="Loading Profile..."/>
    }


  return (
    <div className="min-h-screen bg-app-bg font-sans">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-5">
            <ProfileAvatar
              avatarUrl={user.avatarUrl}
              fullName={user.fullName}
              provider={user.provider}
              verified={user.isVerified?.email}
            />
            <div className="min-w-0">
              <p className="font-mono text-2xs uppercase tracking-[0.2em] text-text-subtle">
                Your profile
              </p>
              <h1 className="truncate text-2xl font-bold text-text-main">{user.fullname}</h1>
              <p className="truncate text-sm text-text-muted">{user.email}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <AccountReceiptCard
              user={user}
              onChangeName={onChangeName}
              onChangePhone={onAddPhone}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <SecurityPanel
              onChangePassword={onChangePassword}
              onAddPhone={onAddPhone}
              onRecoverAccount={onRecoverAccount}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <DangerZone fullName={user.fullname} onDeleteAccount={onDeleteAccount} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProfilePage;
