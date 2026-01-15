import { motion } from "framer-motion";
import { User, ChevronRight, Radio, Bitcoin, DollarSign } from "lucide-react";

interface Profile {
  display_name: string;
  bio: string;
  avatar_url: string;
  live_url: string;
  btc_address: string;
  usdt_address: string;
  background_type?: string;
  background_value?: string;
  background_image_url?: string;
}

interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
}

interface PhonePreviewProps {
  profile: Profile;
  links: SocialLink[];
}

const PLATFORM_COLORS: Record<string, string> = {
  twitter: "bg-twitter/20",
  instagram: "bg-gradient-to-br from-instagram-pink/20 via-instagram-purple/20 to-instagram-orange/20",
  github: "bg-github/10",
  portfolio: "bg-primary/20",
  linkedin: "bg-blue-500/20",
  youtube: "bg-red-500/20",
  tiktok: "bg-foreground/10",
  custom: "bg-muted",
};

const GRADIENT_BG: Record<string, string> = {
  aurora: "from-slate-950 via-purple-950 to-black",
  sunset: "from-orange-950 via-rose-950 to-slate-950",
  ocean: "from-slate-950 via-cyan-950 to-blue-950",
  forest: "from-slate-950 via-emerald-950 to-green-950",
  midnight: "from-slate-950 via-indigo-950 to-violet-950",
  rose: "from-slate-950 via-pink-950 to-rose-950",
};

export const PhonePreview = ({ profile, links }: PhonePreviewProps) => {
  const getScreenStyle = () => {
    if (profile.background_type === "image" && profile.background_image_url) {
      return {
        backgroundImage: `url(${profile.background_image_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    if (profile.background_type === "solid") {
      return { backgroundColor: profile.background_value };
    }
    return {};
  };

  const getScreenClass = () => {
    if (profile.background_type === "gradient" && profile.background_value) {
      return `bg-gradient-to-br ${GRADIENT_BG[profile.background_value] || GRADIENT_BG.aurora}`;
    }
    if (profile.background_type === "image") {
      return "";
    }
    return "bg-gradient-to-br from-slate-950 via-[#1a0b2e] to-black";
  };

  return (
    <div className="relative">
      {/* Phone Frame */}
      <div className="relative w-[280px] h-[560px] bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Screen bezel */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10" />
        
        {/* Screen */}
        <div 
          className={`w-full h-full rounded-[2.4rem] overflow-hidden relative ${getScreenClass()}`}
          style={getScreenStyle()}
        >
          {/* Dark overlay for image backgrounds */}
          {profile.background_type === "image" && (
            <div className="absolute inset-0 bg-black/40" />
          )}
          
          {/* Mini aurora */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute w-32 h-32 bg-primary/30 rounded-full blur-3xl top-10 -left-10" />
            <div className="absolute w-24 h-24 bg-pink-500/20 rounded-full blur-2xl bottom-20 right-0" />
          </div>
          
          {/* Content */}
          <div className="relative h-full overflow-y-auto p-4 pt-10 scrollbar-none">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 ring-2 ring-primary/50">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                {profile.live_url && (
                  <div className="absolute -bottom-1 -right-1 bg-live text-[8px] font-bold px-1.5 py-0.5 rounded-full text-white">
                    LIVE
                  </div>
                )}
              </div>
              
              <h3 className="mt-2 text-sm font-bold text-foreground text-center font-['Space_Grotesk']">
                {profile.display_name || "Your Name"}
              </h3>
              <p className="text-[10px] text-muted-foreground text-center line-clamp-2 px-2">
                {profile.bio || "Your bio here..."}
              </p>
            </div>
            
            {/* Links */}
            <div className="space-y-2">
              {links.length === 0 ? (
                <div className="text-[10px] text-muted-foreground text-center py-4">
                  Add links to see them here ✨
                </div>
              ) : (
                links.slice(0, 4).map((link) => (
                  <div
                    key={link.id}
                    className={`${PLATFORM_COLORS[link.platform] || PLATFORM_COLORS.custom} rounded-xl p-2.5 flex items-center justify-between border border-white/10`}
                  >
                    <span className="text-[10px] font-medium text-foreground truncate">
                      {link.label}
                    </span>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                ))
              )}
              {links.length > 4 && (
                <div className="text-[10px] text-muted-foreground text-center">
                  +{links.length - 4} more links
                </div>
              )}
            </div>
            
            {/* Crypto */}
            {(profile.btc_address || profile.usdt_address) && (
              <div className="mt-4 p-2 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[8px] text-muted-foreground mb-1">Support</div>
                <div className="flex gap-2">
                  {profile.btc_address && (
                    <div className="flex items-center gap-1 text-btc">
                      <Bitcoin className="w-3 h-3" />
                      <span className="text-[8px]">BTC</span>
                    </div>
                  )}
                  {profile.usdt_address && (
                    <div className="flex items-center gap-1 text-usdt">
                      <DollarSign className="w-3 h-3" />
                      <span className="text-[8px]">USDT</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Reflection */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[200px] h-8 bg-primary/20 blur-2xl rounded-full" />
    </div>
  );
};
