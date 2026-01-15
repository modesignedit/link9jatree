import { Trash2, GripVertical, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string;
  display_order: number;
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
    bg: "bg-gradient-to-br from-instagram-pink/10 via-instagram-purple/10 to-instagram-orange/10",
    border: "border-instagram-pink/30 hover:border-instagram-pink/50",
    icon: "text-instagram-pink",
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

export const LinkCardEditor = ({
  link,
  onUpdate,
  onRemove,
  platformOptions,
}: LinkCardEditorProps) => {
  const styles = PLATFORM_STYLES[link.platform] || PLATFORM_STYLES.custom;
  const emoji = PLATFORM_EMOJI[link.platform] || "🔗";

  return (
    <div
      className={`${styles.bg} ${styles.border} border-2 rounded-2xl p-4 transition-all duration-300 hover:scale-[1.01]`}
    >
      {/* Header with platform and delete */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <Select
            value={link.platform}
            onValueChange={(value) => onUpdate(link.id, { platform: value })}
          >
            <SelectTrigger className="w-[140px] bg-white/5 border-white/10 rounded-full text-sm h-8">
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
        <div className="flex items-center gap-1">
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
    </div>
  );
};
