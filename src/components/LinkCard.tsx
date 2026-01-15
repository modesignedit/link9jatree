import { motion } from "framer-motion";
import { LucideIcon, ChevronRight } from "lucide-react";

interface LinkCardProps {
  icon: LucideIcon;
  label: string;
  href: string;
  index: number;
  color?: string;
}

const LinkCard = ({ icon: Icon, label, href, index, color = "primary" }: LinkCardProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 * index }}
      whileHover={{ y: -3, boxShadow: "0 0 40px hsl(263 70% 50% / 0.4)" }}
      whileTap={{ scale: 0.97 }}
      className="w-full flex items-center gap-4 p-4 rounded-2xl glass glass-hover cursor-pointer group relative overflow-hidden"
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className={`relative w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-${color}/20 transition-all duration-300 group-hover:scale-110`}>
        <Icon className={`w-5 h-5 text-foreground group-hover:text-${color} transition-colors duration-300`} />
      </div>
      <span className="relative flex-1 text-foreground font-medium text-[15px] tracking-tight">{label}</span>
      <ChevronRight className="relative w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
    </motion.a>
  );
};

export default LinkCard;