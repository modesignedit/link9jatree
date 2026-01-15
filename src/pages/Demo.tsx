import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import SupportSection from "@/components/SupportSection";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedOrbs from "@/components/AnimatedOrbs";

// Demo profile data - Nigerian creator example
const DEMO_PROFILE = {
  display_name: "Adaeze Okonkwo",
  bio: "🇳🇬 Lagos-based content creator • Tech & lifestyle • Sharing the Naija dream ✨",
  avatar_url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face",
  live_url: "",
  btc_address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  usdt_address: "0x1234567890abcdef1234567890abcdef12345678",
};

const DEMO_LINKS = [
  {
    id: "1",
    platform: "youtube",
    label: "Watch my vlogs 🎬",
    url: "https://youtube.com/@adaeze",
    animation: "glow",
  },
  {
    id: "2",
    platform: "instagram",
    label: "Daily vibes on IG 📸",
    url: "https://instagram.com/adaeze",
    animation: "shine",
  },
  {
    id: "3",
    platform: "twitter",
    label: "Hot takes on X 🔥",
    url: "https://twitter.com/adaeze",
    animation: "pulse",
  },
  {
    id: "4",
    platform: "tiktok",
    label: "TikTok trends 💃",
    url: "https://tiktok.com/@adaeze",
    animation: "none",
  },
  {
    id: "5",
    platform: "portfolio",
    label: "Book me for collabs 💼",
    url: "https://adaeze.com",
    customColor: "#00A86B",
    animation: "shine",
  },
  {
    id: "6",
    platform: "custom",
    label: "Join my WhatsApp community",
    url: "https://wa.me/2348012345678",
    customIcon: "sparkles",
    customColor: "#25D366",
    animation: "pulse",
  },
];

const Demo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a0b2e] to-black text-foreground overflow-hidden relative">
      {/* Background effects */}
      <ParticleBackground />
      <AnimatedOrbs />

      {/* Floating back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed top-4 left-4 z-50"
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full glass-strong hover:bg-white/10 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </motion.div>

      {/* Demo badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Demo Profile
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 py-16 sm:py-20">
        <div className="w-full max-w-md">
          {/* Profile Header */}
          <ProfileHeader
            displayName={DEMO_PROFILE.display_name}
            bio={DEMO_PROFILE.bio}
            avatarUrl={DEMO_PROFILE.avatar_url}
            liveUrl={DEMO_PROFILE.live_url}
          />

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 space-y-3"
          >
            {DEMO_LINKS.map((link, index) => (
              <LinkCard
                key={link.id}
                platform={link.platform}
                label={link.label}
                href={link.url}
                index={index}
                customColor={link.customColor}
                customIcon={link.customIcon}
                animation={link.animation}
              />
            ))}
          </motion.div>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <SupportSection
              btcAddress={DEMO_PROFILE.btc_address}
              usdtAddress={DEMO_PROFILE.usdt_address}
            />
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground text-sm mb-4">
              Want your own Link9jtree page?
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Create Your Free Page
            </Link>
          </motion.div>

          {/* Footer branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 text-center"
          >
            <Link to="/" className="text-muted-foreground/60 text-xs hover:text-muted-foreground transition-colors">
              Powered by Link9jtree 🇳🇬
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
