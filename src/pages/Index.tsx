import { Briefcase, Twitter, Instagram, Github } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a0b2e] to-black">
      <div className="max-w-md mx-auto px-6 py-12 flex flex-col gap-8">
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
      </div>

      <ContactDrawer />
    </div>
  );
};

export default Index;