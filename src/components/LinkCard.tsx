import { motion } from "framer-motion";
import { 
  Briefcase, 
  Twitter, 
  Instagram, 
  Github, 
  Linkedin, 
  Youtube, 
  Music2,
  Link as LinkIcon,
  ChevronRight,
  LucideIcon 
} from "lucide-react";

interface LinkCardProps {
  platform: string;
  label: string;
  href: string;
  index: number;
  customColor?: string;
  customIcon?: string;
  animation?: string;
  onClickTrack?: () => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Briefcase,
  Twitter,
  Instagram,
  Github,
  Linkedin,
  Youtube,
  Music2,
  Link: LinkIcon,
};

const EMOJI_MAP: Record<string, string> = {
  rocket: "🚀",
  star: "⭐",
  fire: "🔥",
  sparkles: "✨",
  heart: "❤️",
  lightning: "⚡",
  globe: "🌍",
  music: "🎵",
  camera: "📷",
  video: "🎬",
  code: "💻",
  book: "📚",
  money: "💰",
  crown: "👑",
  diamond: "💎",
};

const PLATFORM_STYLES: Record<string, { 
  iconBg: string; 
  iconColor: string; 
  hoverGlow: string;
  hoverBg: string;
}> = {
  portfolio: {
    iconBg: "group-hover:bg-primary/30",
    iconColor: "group-hover:text-primary",
    hoverGlow: "group-hover:shadow-[0_0_40px_hsl(263_70%_50%/0.4)]",
    hoverBg: "group-hover:border-primary/30",
  },
  twitter: {
    iconBg: "group-hover:bg-[#1DA1F2]/30",
    iconColor: "group-hover:text-[#1DA1F2]",
    hoverGlow: "group-hover:shadow-[0_0_40px_rgba(29,161,242,0.4)]",
    hoverBg: "group-hover:border-[#1DA1F2]/30",
  },
  instagram: {
    iconBg: "group-hover:bg-gradient-to-br group-hover:from-[#F58529]/30 group-hover:via-[#DD2A7B]/30 group-hover:to-[#8134AF]/30",
    iconColor: "group-hover:text-[#DD2A7B]",
    hoverGlow: "group-hover:shadow-[0_0_40px_rgba(221,42,123,0.4)]",
    hoverBg: "group-hover:border-[#DD2A7B]/30",
  },
  github: {
    iconBg: "group-hover:bg-white/20",
    iconColor: "group-hover:text-white",
    hoverGlow: "group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]",
    hoverBg: "group-hover:border-white/20",
  },
  linkedin: {
    iconBg: "group-hover:bg-[#0A66C2]/30",
    iconColor: "group-hover:text-[#0A66C2]",
    hoverGlow: "group-hover:shadow-[0_0_40px_rgba(10,102,194,0.4)]",
    hoverBg: "group-hover:border-[#0A66C2]/30",
  },
  youtube: {
    iconBg: "group-hover:bg-[#FF0000]/30",
    iconColor: "group-hover:text-[#FF0000]",
    hoverGlow: "group-hover:shadow-[0_0_40px_rgba(255,0,0,0.4)]",
    hoverBg: "group-hover:border-[#FF0000]/30",
  },
  tiktok: {
    iconBg: "group-hover:bg-white/20",
    iconColor: "group-hover:text-white",
    hoverGlow: "group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]",
    hoverBg: "group-hover:border-white/20",
  },
  custom: {
    iconBg: "group-hover:bg-primary/30",
    iconColor: "group-hover:text-primary",
    hoverGlow: "group-hover:shadow-[0_0_40px_hsl(263_70%_50%/0.4)]",
    hoverBg: "group-hover:border-primary/30",
  },
};

// Animation class mappings
const ANIMATION_CLASSES: Record<string, string> = {
  none: "",
  pulse: "animate-link-pulse",
  bounce: "hover:animate-link-bounce",
  shake: "hover:animate-link-shake",
  glow: "animate-link-glow",
  shine: "link-shine-effect",
};

const LinkCard = ({ 
  platform, 
  label, 
  href, 
  index, 
  customColor, 
  customIcon, 
  animation = "none",
  onClickTrack 
}: LinkCardProps) => {
  const iconName = getIconForPlatform(platform);
  const Icon = ICON_MAP[iconName] || LinkIcon;
  const styles = PLATFORM_STYLES[platform] || PLATFORM_STYLES.custom;
  const animationClass = ANIMATION_CLASSES[animation] || "";

  // Get custom emoji if set
  const customEmoji = customIcon ? EMOJI_MAP[customIcon] : null;

  const handleClick = () => {
    if (onClickTrack) {
      onClickTrack();
    }
  };

  // Custom color styles
  const customStyles = customColor ? {
    '--custom-color': customColor,
    '--custom-color-bg': `${customColor}20`,
    '--custom-color-border': `${customColor}40`,
    '--custom-color-glow': `${customColor}60`,
  } as React.CSSProperties : {};

  const customColorClasses = customColor
    ? "border-[var(--custom-color-border)] hover:border-[var(--custom-color)] hover:shadow-[0_0_40px_var(--custom-color-glow)]"
    : `${styles.hoverGlow} ${styles.hoverBg}`;

  const customIconBgClasses = customColor
    ? "group-hover:bg-[var(--custom-color-bg)]"
    : styles.iconBg;

  const customIconColorClasses = customColor
    ? "group-hover:text-[var(--custom-color)]"
    : styles.iconColor;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      style={customStyles}
      className={`w-full flex items-center gap-4 p-4 rounded-xl glass-strong cursor-pointer group relative overflow-hidden transition-all duration-200 ${customColorClasses} ${animationClass}`}
    >
      {/* Shine effect overlay */}
      {animation === "shine" && (
        <div className="absolute inset-0 shine-sweep pointer-events-none" />
      )}

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      {/* Icon container */}
      <div className={`relative w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center transition-all duration-200 group-hover:scale-105 ${customIconBgClasses}`}>
        {customEmoji ? (
          <span className="text-xl">{customEmoji}</span>
        ) : (
          <Icon className={`w-5 h-5 text-foreground transition-colors duration-200 ${customIconColorClasses}`} />
        )}
      </div>
      
      {/* Label */}
      <span className="relative flex-1 text-foreground font-medium text-[15px] tracking-tight">
        {label}
      </span>
      
      {/* Arrow */}
      <ChevronRight className="relative w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-200" />
    </motion.a>
  );
};

function getIconForPlatform(platform: string): string {
  switch (platform.toLowerCase()) {
    case "portfolio":
      return "Briefcase";
    case "twitter":
      return "Twitter";
    case "instagram":
      return "Instagram";
    case "github":
      return "Github";
    case "linkedin":
      return "Linkedin";
    case "youtube":
      return "Youtube";
    case "tiktok":
      return "Music2";
    default:
      return "Link";
  }
}

export default LinkCard;
