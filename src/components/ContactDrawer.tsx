import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ContactDrawer = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("inquiries").insert({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      if (error) throw error;

      toast.success("Message sent!", {
        description: "I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              className="rounded-full w-14 h-14 p-0 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        </DrawerTrigger>
        <DrawerContent className="glass border-t border-white/10">
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader>
              <DrawerTitle className="text-foreground">Contact Me</DrawerTitle>
              <DrawerDescription className="text-muted-foreground">
                Send me a message and I'll get back to you soon.
              </DrawerDescription>
            </DrawerHeader>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-white/5 border-white/10 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-white/5 border-white/10 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="What's on your mind?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={4}
                  className="bg-white/5 border-white/10 focus:border-primary resize-none"
                />
              </div>
              <DrawerFooter className="px-0">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Send Message
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full border-white/10">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ContactDrawer;