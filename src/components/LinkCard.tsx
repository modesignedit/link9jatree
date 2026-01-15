import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface LinkCardProps {
  icon: LucideIcon;
  label: string;
  href: string;
  index: number;
}

const LinkCard = ({ icon: Icon, label, href, index }: LinkCardProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      whileHover={{ y: -2, boxShadow: "0 0 30px hsl(263 70% 50% / 0.3)" }}
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center gap-4 p-4 rounded-xl glass glass-hover cursor-pointer group"
    >
      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
      </div>
      <span className="text-foreground font-medium tracking-tight">{label}</span>
    </motion.a>
  );
};

export default LinkCard;