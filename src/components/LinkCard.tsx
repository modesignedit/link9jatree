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

const LinkCard = ({ platform, label, href, index }: LinkCardProps) => {
  const iconName = getIconForPlatform(platform);
  const Icon = ICON_MAP[iconName] || LinkIcon;
  const styles = PLATFORM_STYLES[platform] || PLATFORM_STYLES.custom;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 * index }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl glass-strong cursor-pointer group relative overflow-hidden transition-all duration-300 ${styles.hoverGlow} ${styles.hoverBg}`}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon container */}
      <div className={`relative w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${styles.iconBg}`}>
        <Icon className={`w-5 h-5 text-foreground transition-colors duration-300 ${styles.iconColor}`} />
      </div>
      
      {/* Label */}
      <span className="relative flex-1 text-foreground font-medium text-[15px] tracking-tight">
        {label}
      </span>
      
      {/* Arrow */}
      <ChevronRight className="relative w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
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
