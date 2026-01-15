import { useState } from "react";
import { Trash2, GripVertical, ExternalLink, Palette, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string;
  display_order: number;
  custom_color?: string;
  custom_icon?: string;
  animation?: string;
}

interface LinkCardEditorProps {
  link: SocialLink;
  onUpdate: (id: string, updates: Partial<SocialLink>) => void;
  onRemove: (id: string) => void;
  platformOptions: { value: string; label: string; icon: string }[];
}

const PLATFORM_STYLES: Record<string, { bg: string; border: string; icon: string }> = {
  twitter: {
    bg: "bg-twitter/10",
    border: "border-twitter/30 hover:border-twitter/50",
    icon: "text-twitter",
  },
  instagram: {
    bg: "bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-orange-500/10",
    border: "border-pink-500/30 hover:border-pink-500/50",
    icon: "text-pink-500",
  },
  github: {
    bg: "bg-github/5",
    border: "border-github/20 hover:border-github/40",
    icon: "text-github",
  },
  linkedin: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30 hover:border-blue-500/50",
    icon: "text-blue-500",
  },
  youtube: {
    bg: "bg-red-500/10",
    border: "border-red-500/30 hover:border-red-500/50",
    icon: "text-red-500",
  },
  tiktok: {
    bg: "bg-foreground/5",
    border: "border-foreground/20 hover:border-foreground/40",
    icon: "text-foreground",
  },
  portfolio: {
    bg: "bg-primary/10",
    border: "border-primary/30 hover:border-primary/50",
    icon: "text-primary",
  },
  custom: {
    bg: "bg-muted/50",
    border: "border-muted-foreground/20 hover:border-muted-foreground/40",
    icon: "text-muted-foreground",
  },
};

const PLATFORM_EMOJI: Record<string, string> = {
  twitter: "𝕏",
  instagram: "📸",
  github: "👨‍💻",
  linkedin: "💼",
  youtube: "🎬",
  tiktok: "🎵",
  portfolio: "🎨",
  custom: "🔗",
};

const COLOR_PRESETS = [
  { id: "default", name: "Default", color: null },
  { id: "purple", name: "Purple", color: "#8B5CF6" },
  { id: "pink", name: "Pink", color: "#EC4899" },
  { id: "blue", name: "Blue", color: "#3B82F6" },
  { id: "cyan", name: "Cyan", color: "#06B6D4" },
  { id: "green", name: "Green", color: "#10B981" },
  { id: "orange", name: "Orange", color: "#F59E0B" },
  { id: "red", name: "Red", color: "#EF4444" },
];

const ICON_OPTIONS = [
  { id: "default", emoji: "🔗", name: "Default" },
  { id: "rocket", emoji: "🚀", name: "Rocket" },
  { id: "star", emoji: "⭐", name: "Star" },
  { id: "fire", emoji: "🔥", name: "Fire" },
  { id: "sparkles", emoji: "✨", name: "Sparkles" },
  { id: "heart", emoji: "❤️", name: "Heart" },
  { id: "lightning", emoji: "⚡", name: "Lightning" },
  { id: "globe", emoji: "🌍", name: "Globe" },
  { id: "music", emoji: "🎵", name: "Music" },
  { id: "camera", emoji: "📷", name: "Camera" },
  { id: "video", emoji: "🎬", name: "Video" },
  { id: "code", emoji: "💻", name: "Code" },
  { id: "book", emoji: "📚", name: "Book" },
  { id: "money", emoji: "💰", name: "Money" },
  { id: "crown", emoji: "👑", name: "Crown" },
  { id: "diamond", emoji: "💎", name: "Diamond" },
];

const ANIMATION_OPTIONS = [
  { id: "none", name: "None", description: "No animation" },
  { id: "pulse", name: "Pulse", description: "Gentle pulsing glow" },
  { id: "bounce", name: "Bounce", description: "Bouncy hover effect" },
  { id: "shake", name: "Shake", description: "Attention-grabbing shake" },
  { id: "glow", name: "Glow", description: "Rainbow glow effect" },
  { id: "shine", name: "Shine", description: "Sweeping shine" },
];

export const LinkCardEditor = ({
  link,
  onUpdate,
  onRemove,
  platformOptions,
}: LinkCardEditorProps) => {
  const [showStyling, setShowStyling] = useState(false);
  const styles = PLATFORM_STYLES[link.platform] || PLATFORM_STYLES.custom;
  const emoji = link.custom_icon 
    ? ICON_OPTIONS.find(i => i.id === link.custom_icon)?.emoji 
    : PLATFORM_EMOJI[link.platform] || "🔗";

  const customBgStyle = link.custom_color 
    ? { backgroundColor: `${link.custom_color}15`, borderColor: `${link.custom_color}40` }
    : {};

  return (
    <div
      className={`${!link.custom_color ? styles.bg : ''} ${!link.custom_color ? styles.border : ''} border-2 rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-300 hover:scale-[1.01]`}
      style={customBgStyle}
    >
      {/* Header with platform and delete */}
      <div className="flex items-center justify-between mb-2.5 sm:mb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-lg sm:text-xl">{emoji}</span>
          <Select
            value={link.platform}
            onValueChange={(value) => onUpdate(link.id, { platform: value })}
          >
            <SelectTrigger className="w-[120px] sm:w-[140px] bg-white/5 border-white/10 rounded-full text-xs sm:text-sm h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {platformOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <span className="flex items-center gap-2">
                    <span>{PLATFORM_EMOJI[option.value] || "🔗"}</span>
                    {option.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowStyling(!showStyling)}
            className={`h-8 w-8 transition-colors ${showStyling ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Palette className="w-4 h-4" />
          </Button>
          <div
            className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing touch-none"
          >
            <GripVertical className="w-4 h-4" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(link.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-2">
        <Input
          value={link.label}
          onChange={(e) => onUpdate(link.id, { label: e.target.value })}
          placeholder="What should visitors see? 👀"
          className="bg-white/5 border-white/10 rounded-xl h-10 text-sm placeholder:text-muted-foreground/50"
        />
        <div className="relative">
          <Input
            value={link.url}
            onChange={(e) => onUpdate(link.id, { url: e.target.value })}
            placeholder="Paste your link here 🔗"
            className="bg-white/5 border-white/10 rounded-xl h-10 text-sm pr-10 placeholder:text-muted-foreground/50"
          />
          {link.url && link.url !== "https://" && (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Styling Options */}
      <AnimatePresence>
        {showStyling && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-white/10 space-y-4">
              {/* Custom Color */}
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2 block flex items-center gap-1.5">
                  <Palette className="w-3 h-3" />
                  Color Theme
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => onUpdate(link.id, { custom_color: preset.color || undefined })}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${
                        (link.custom_color === preset.color || (!link.custom_color && !preset.color))
                          ? 'border-primary ring-2 ring-primary/30 scale-110'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                      style={{ backgroundColor: preset.color || 'transparent' }}
                      title={preset.name}
                    >
                      {!preset.color && (
                        <span className="text-xs text-muted-foreground">✕</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Icon */}
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2 block flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Custom Icon
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ICON_OPTIONS.map((icon) => (
                    <button
                      key={icon.id}
                      onClick={() => onUpdate(link.id, { custom_icon: icon.id === 'default' ? undefined : icon.id })}
                      className={`w-9 h-9 rounded-lg border-2 transition-all text-lg flex items-center justify-center ${
                        (link.custom_icon === icon.id || (!link.custom_icon && icon.id === 'default'))
                          ? 'border-primary bg-primary/20 ring-2 ring-primary/30'
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                      title={icon.name}
                    >
                      {icon.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Animation */}
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2 block flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Animation
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {ANIMATION_OPTIONS.map((anim) => (
                    <button
                      key={anim.id}
                      onClick={() => onUpdate(link.id, { animation: anim.id })}
                      className={`px-3 py-2 rounded-lg border-2 transition-all text-left ${
                        (link.animation === anim.id || (!link.animation && anim.id === 'none'))
                          ? 'border-primary bg-primary/20'
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                    >
                      <p className="text-xs font-medium text-foreground">{anim.name}</p>
                      <p className="text-[10px] text-muted-foreground/70">{anim.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle styling button */}
      <button
        onClick={() => setShowStyling(!showStyling)}
        className="w-full mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
      >
        {showStyling ? (
          <>
            <ChevronUp className="w-3 h-3" />
            Hide styling options
          </>
        ) : (
          <>
            <ChevronDown className="w-3 h-3" />
            Customize appearance
          </>
        )}
      </button>
    </div>
  );
};
