import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  showBadge?: boolean;
  animated?: boolean;
  linkTo?: string;
}

const Logo = ({ 
  size = "md", 
  showText = true, 
  showBadge = true,
  animated = true,
  linkTo = "/"
}: LogoProps) => {
  const sizes = {
    sm: { icon: "w-8 h-8", text: "text-lg", badge: "text-[10px] px-1.5 py-0.5" },
    md: { icon: "w-10 h-10", text: "text-xl", badge: "text-xs px-2 py-0.5" },
    lg: { icon: "w-14 h-14", text: "text-2xl", badge: "text-xs px-2.5 py-1" },
  };

  const currentSize = sizes[size];

  const LogoIcon = () => (
    <div 
      className={`${currentSize.icon} rounded-xl relative overflow-hidden flex items-center justify-center shadow-lg shadow-[#008751]/20 group-hover:shadow-[#008751]/40 transition-shadow`}
      style={{
        background: "linear-gradient(135deg, #008751 0%, #00A86B 100%)",
      }}
    >
      {/* Nigerian flag stripe accent */}
      <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-white/90" />
      
      {/* 9 symbol - representing 9ja */}
      <span className="relative z-10 font-bold text-white font-['Space_Grotesk']" 
        style={{ fontSize: size === 'sm' ? '1rem' : size === 'md' ? '1.25rem' : '1.5rem' }}
      >
        9
      </span>
    </div>
  );

  const content = (
    <div className="flex items-center gap-2 group">
      {animated ? (
        <motion.div
          whileHover={{ scale: 1.05, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <LogoIcon />
        </motion.div>
      ) : (
        <LogoIcon />
      )}
      
      {showText && (
        <div className="flex items-center gap-1.5">
          <span className={`${currentSize.text} font-bold text-foreground font-['Space_Grotesk'] tracking-tight`}>
            Link
            <span className="text-[#008751]">9j</span>
            <span className="text-foreground/80">tree</span>
          </span>
          
          {showBadge && (
            <span className={`${currentSize.badge} rounded-full bg-[#008751]/15 text-[#00A86B] font-semibold border border-[#008751]/20`}>
              🇳🇬
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo}>{content}</Link>;
  }

  return content;
};

export default Logo;