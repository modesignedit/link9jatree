import { motion } from "framer-motion";
import { BadgeCheck, Radio } from "lucide-react";

const ProfileHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      {/* Avatar with glowing border */}
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse-glow blur-sm" />
        <div className="relative w-28 h-28 rounded-full p-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500">
          <div className="w-full h-full rounded-full bg-card overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face"
              alt="Profile avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Name with verified badge */}
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Alex Rivera
        </h1>
        <BadgeCheck className="w-6 h-6 text-verified fill-verified/20" />
      </div>

      {/* Bio */}
      <p className="text-muted-foreground text-sm max-w-xs mb-4">
        Digital creator & developer. Building cool stuff on the internet. 🚀
      </p>

      {/* Live Now Badge */}
      <motion.a
        href="https://twitch.tv"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-live/10 border border-live/30 text-live animate-live-pulse"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Radio className="w-4 h-4" />
        <span className="text-sm font-medium">Live Now</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
        </span>
      </motion.a>
    </motion.div>
  );
};

export default ProfileHeader;