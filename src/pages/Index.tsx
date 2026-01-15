import { Briefcase, Twitter, Instagram, Github, Heart } from "lucide-react";
import { motion } from "framer-motion";
import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import SupportSection from "@/components/SupportSection";
import ContactDrawer from "@/components/ContactDrawer";

const socialLinks = [
  {
    icon: Briefcase,
    label: "Portfolio",
    href: "https://example.com",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    href: "https://twitter.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a0b2e] to-black relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,80,200,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="relative max-w-md mx-auto px-6 py-12 flex flex-col gap-8">
        <ProfileHeader />

        {/* Social Links */}
        <div className="flex flex-col gap-3">
          {socialLinks.map((link, index) => (
            <LinkCard
              key={link.label}
              icon={link.icon}
              label={link.label}
              href={link.href}
              index={index}
            />
          ))}
        </div>

        <SupportSection />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center pt-4 pb-8"
        >
          <p className="text-xs text-muted-foreground/60 flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-live fill-live" /> by Alex Rivera
          </p>
        </motion.footer>
      </div>

      <ContactDrawer />
    </div>
  );
};

export default Index;