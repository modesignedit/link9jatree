import { useEffect, useState, useRef, useMemo } from "react";
import { Heart, Settings } from "lucide-react";
import { motion } from "framer-motion";
import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import SupportSection from "@/components/SupportSection";
import ContactDrawer from "@/components/ContactDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import ShareButton from "@/components/ShareButton";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedOrbs from "@/components/AnimatedOrbs";
import { useAuth } from "@/hooks/useAuth";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { BackgroundEffects } from "@/components/BackgroundPicker";

interface Profile {
  display_name: string;
  bio: string;
  avatar_url: string;
  live_url: string;
  btc_address: string;
  usdt_address: string;
  background_type: string;
  background_value: string;
  background_image_url: string;
  background_effects: BackgroundEffects;
}

interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  display_order: number;
}

const DEFAULT_EFFECTS: BackgroundEffects = {
  particles: false,
  orbs: true,
  gradientMorph: false,
  shimmer: false,
};

// Default fallback data
const DEFAULT_PROFILE: Profile = {
  display_name: "Alex Rivera",
  bio: "Digital creator & developer. Building cool stuff on the internet. 🚀",
  avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face",
  live_url: "https://twitch.tv",
  btc_address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  usdt_address: "0x742d35Cc6634C0532925a3b844Bc9e7595f3B7E8",
  background_type: "gradient",
  background_value: "aurora",
  background_image_url: "",
  background_effects: DEFAULT_EFFECTS,
};

const DEFAULT_LINKS: SocialLink[] = [
  { id: "1", platform: "portfolio", label: "Portfolio", url: "https://example.com", display_order: 0 },
  { id: "2", platform: "twitter", label: "Twitter / X", url: "https://twitter.com", display_order: 1 },
  { id: "3", platform: "instagram", label: "Instagram", url: "https://instagram.com", display_order: 2 },
  { id: "4", platform: "github", label: "GitHub", url: "https://github.com", display_order: 3 },
];

const Index = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [links, setLinks] = useState<SocialLink[]>(DEFAULT_LINKS);
  const [loading, setLoading] = useState(true);
  const [profileUserId, setProfileUserId] = useState<string | undefined>();
  const { trackView, trackClick } = useAnalytics(profileUserId);
  const viewTracked = useRef(false);

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch first profile (for now, we show the first user's profile)
      // In a multi-user setup, you'd use a username/slug in the URL
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .limit(1);

      if (profiles && profiles.length > 0) {
        const p = profiles[0];
        setProfileUserId(p.id);
        
        // Parse background effects from JSONB
        const effects = (p.background_effects as unknown as BackgroundEffects) || DEFAULT_EFFECTS;
        
        setProfile({
          display_name: p.display_name || DEFAULT_PROFILE.display_name,
          bio: p.bio || DEFAULT_PROFILE.bio,
          avatar_url: p.avatar_url || DEFAULT_PROFILE.avatar_url,
          live_url: p.live_url || "",
          btc_address: p.btc_address || "",
          usdt_address: p.usdt_address || "",
          background_type: p.background_type || "gradient",
          background_value: p.background_value || "aurora",
          background_image_url: p.background_image_url || "",
          background_effects: effects,
        });

        // Fetch links for this profile
        const { data: socialLinks } = await supabase
          .from("social_links")
          .select("*")
          .eq("user_id", p.id)
          .order("display_order");

        if (socialLinks && socialLinks.length > 0) {
          setLinks(socialLinks);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Track page view once
  useEffect(() => {
    if (profileUserId && !viewTracked.current) {
      viewTracked.current = true;
      trackView();
    }
  }, [profileUserId, trackView]);

  const handleLinkClick = (linkId: string, label: string) => {
    trackClick(linkId, label);
  };

  // Generate background styles based on profile settings
  const getBackgroundStyle = () => {
    if (profile.background_type === "image" && profile.background_image_url) {
      return {
        backgroundImage: `url(${profile.background_image_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      };
    }
    if (profile.background_type === "solid") {
      return { backgroundColor: profile.background_value };
    }
    return {};
  };

  const getBackgroundClass = () => {
    if (profile.background_type === "gradient") {
      return `bg-${profile.background_value}`;
    }
    return "";
  };

  const effects = profile.background_effects || DEFAULT_EFFECTS;
  const showAnimations = !prefersReducedMotion;

  return (
    <div 
      className={`min-h-screen relative overflow-hidden transition-colors duration-300 safe-area-top safe-area-bottom ${getBackgroundClass()}`}
      style={getBackgroundStyle()}
    >
      {/* Gradient morph animation */}
      {showAnimations && effects.gradientMorph && profile.background_type === "gradient" && (
        <div className="absolute inset-0 bg-gradient-morph opacity-60" />
      )}

      {/* Aurora overlay for gradients */}
      {profile.background_type === "gradient" && (
        <div className="absolute inset-0 aurora-bg aurora-animated opacity-70" />
      )}
      
      {/* Dark overlay for image backgrounds */}
      {profile.background_type === "image" && (
        <div className="absolute inset-0 bg-black/40" />
      )}
      
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,80,200,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      {/* Particle system */}
      {showAnimations && effects.particles && (
        <ParticleBackground particleCount={isMobile ? 20 : 40} />
      )}

      {/* Animated orbs */}
      {showAnimations && effects.orbs && !isMobile && (
        <AnimatedOrbs />
      )}

      {/* Fallback static orbs for mobile or when animated orbs are disabled */}
      {(!effects.orbs || isMobile) && (
        <>
          <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl float opacity-50" />
          <div className="hidden sm:block absolute bottom-40 right-10 w-40 h-40 bg-pink-500/15 rounded-full blur-3xl float-delayed opacity-50" />
          <div className="hidden sm:block absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl float-delayed opacity-50" />
        </>
      )}

      {/* Shimmer effect */}
      {showAnimations && effects.shimmer && (
        <div className="absolute inset-0 shimmer-overlay pointer-events-none z-[1]" />
      )}

      {/* Top bar with theme toggle and edit button */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-10 flex justify-between items-center">
        <ThemeToggle />
        
        {user && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/editor">
              <Button
                size="sm"
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-foreground gap-2 h-9 px-3 sm:px-4"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Edit Profile</span>
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
      
      <div className="relative max-w-md mx-auto px-4 sm:px-6 py-16 sm:py-20 flex flex-col gap-6 sm:gap-8 z-[2]">
        <ProfileHeader 
          displayName={profile.display_name}
          bio={profile.bio}
          avatarUrl={profile.avatar_url}
          liveUrl={profile.live_url}
        />

        {/* Share Button */}
        <div className="flex justify-center -mt-2">
          <ShareButton displayName={profile.display_name} />
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {links.map((link, index) => (
            <LinkCard
              key={link.id}
              platform={link.platform}
              label={link.label}
              href={link.url}
              index={index}
              onClickTrack={() => handleLinkClick(link.id, link.label)}
            />
          ))}
        </div>

        <SupportSection 
          btcAddress={profile.btc_address}
          usdtAddress={profile.usdt_address}
        />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center pt-3 sm:pt-4 pb-6 sm:pb-8"
        >
          {/* Separator */}
          <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-3 sm:mb-4" />
          
          <p className="text-[11px] sm:text-xs text-muted-foreground/60 flex items-center justify-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-live fill-live" /> by {profile.display_name}
          </p>
          
          {!user && (
            <Link 
              to="/auth" 
              className="text-[11px] sm:text-xs text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors mt-2 inline-block"
            >
              Admin Login
            </Link>
          )}
        </motion.footer>
      </div>

      <ContactDrawer />
    </div>
  );
};

export default Index;
