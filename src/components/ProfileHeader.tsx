import { motion } from "framer-motion";
import { BadgeCheck, Radio } from "lucide-react";

interface ProfileHeaderProps {
  displayName: string;
  bio: string;
  avatarUrl: string;
  liveUrl: string;
}

const ProfileHeader = ({ displayName, bio, avatarUrl, liveUrl }: ProfileHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      {/* Avatar with animated gradient border and multi-layer glow */}
      <div className="relative mb-6">
        {/* Outer glow */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl animate-pulse" />
        
        {/* Middle glow */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-spin-slow opacity-60 blur-md" />
        
        {/* Rotating gradient ring */}
        <div className="relative w-36 h-36 rounded-full p-[4px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-300% animate-gradient-rotate shadow-2xl shadow-purple-500/40">
          <div className="w-full h-full rounded-full bg-slate-950 p-[3px]">
            <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-white/10">
              <img
                src={avatarUrl}
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Floating shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-purple-500/30 rounded-full blur-xl" />
      </div>

      {/* Name with verified badge */}
      <div className="flex items-center gap-2.5 mb-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {displayName}
        </h1>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <BadgeCheck className="w-7 h-7 text-verified fill-verified/20" />
        </motion.div>
      </div>

      {/* Bio */}
      <p className="text-muted-foreground text-[15px] max-w-xs mb-5 leading-relaxed">
        {bio}
      </p>

      {/* Live Now Badge */}
      {liveUrl && (
        <motion.a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-live/10 border border-live/30 text-live animate-live-pulse shadow-lg shadow-live/20 hover:bg-live/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Radio className="w-4 h-4" />
          <span className="text-sm font-semibold">Live Now</span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-live" />
          </span>
        </motion.a>
      )}
    </motion.div>
  );
};

export default ProfileHeader;
