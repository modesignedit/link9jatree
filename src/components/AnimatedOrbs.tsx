import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface OrbConfig {
  id: number;
  size: number;
  color: string;
  initialX: string;
  initialY: string;
  delay: number;
  duration: number;
}

const AnimatedOrbs = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const orbs: OrbConfig[] = [
    { id: 1, size: 180, color: "from-purple-500/30 to-violet-600/20", initialX: "10%", initialY: "20%", delay: 0, duration: 20 },
    { id: 2, size: 140, color: "from-pink-500/25 to-rose-600/15", initialX: "70%", initialY: "60%", delay: 5, duration: 25 },
    { id: 3, size: 100, color: "from-cyan-500/20 to-blue-600/15", initialX: "50%", initialY: "80%", delay: 10, duration: 18 },
    { id: 4, size: 160, color: "from-fuchsia-500/25 to-purple-600/20", initialX: "80%", initialY: "30%", delay: 3, duration: 22 },
  ];

  // Only track mouse on desktop
  useEffect(() => {
    if (isMobile) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Check for reduced motion
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          initial={{
            x: 0,
            y: 0,
            scale: 1,
          }}
          animate={{
            x: [0, 100, -50, 30, 0],
            y: [0, -80, 40, -30, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: orb.initialX,
            top: orb.initialY,
            width: isMobile ? orb.size * 0.7 : orb.size,
            height: isMobile ? orb.size * 0.7 : orb.size,
            translateX: isMobile ? 0 : mousePosition.x * 20,
            translateY: isMobile ? 0 : mousePosition.y * 20,
            willChange: "transform",
          }}
          className={`rounded-full bg-gradient-to-br ${orb.color} blur-3xl`}
        />
      ))}
    </div>
  );
};

export default AnimatedOrbs;
