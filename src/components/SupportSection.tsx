import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bitcoin, Wallet, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SupportSectionProps {
  btcAddress: string;
  usdtAddress: string;
}

const SupportSection = ({ btcAddress, usdtAddress }: SupportSectionProps) => {
  const [selectedWallet, setSelectedWallet] = useState<"btc" | "usdt" | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const address = selectedWallet === "btc" ? btcAddress : usdtAddress;
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenDialog = (type: "btc" | "usdt") => {
    const address = type === "btc" ? btcAddress : usdtAddress;
    if (!address) return;
    setSelectedWallet(type);
    setCopied(false);
  };

  const currentAddress = selectedWallet === "btc" ? btcAddress : usdtAddress;

  if (!btcAddress && !usdtAddress) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="w-full p-6 rounded-2xl glass-strong gradient-border relative overflow-hidden"
      >
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/15 to-transparent rounded-full blur-2xl" />
        
        <div className="relative text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Support My Work
            </h2>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            Crypto tips are always appreciated!
          </p>
        </div>

        <div className="relative flex gap-3">
          {btcAddress && (
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                onClick={() => handleOpenDialog("btc")}
                className="w-full h-14 bg-btc/10 border-btc/30 hover:bg-btc/20 hover:border-btc/50 hover:shadow-[0_0_30px_hsl(33_100%_50%/0.4)] text-btc transition-all duration-300 rounded-xl group"
              >
                <Bitcoin className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Bitcoin</span>
              </Button>
            </motion.div>
          )}
          {usdtAddress && (
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                onClick={() => handleOpenDialog("usdt")}
                className="w-full h-14 bg-usdt/10 border-usdt/30 hover:bg-usdt/20 hover:border-usdt/50 hover:shadow-[0_0_30px_hsl(168_76%_42%/0.4)] text-usdt transition-all duration-300 rounded-xl group"
              >
                <Wallet className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">USDT</span>
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Crypto Address Dialog */}
      <Dialog open={selectedWallet !== null} onOpenChange={(open) => !open && setSelectedWallet(null)}>
        <DialogContent className="sm:max-w-md glass-strong border-border/50">
          <DialogHeader className="text-center pb-2">
            <DialogTitle className="flex items-center justify-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className={`p-3 rounded-full ${
                  selectedWallet === "btc" 
                    ? "bg-btc/20 text-btc" 
                    : "bg-usdt/20 text-usdt"
                }`}
              >
                {selectedWallet === "btc" ? (
                  <Bitcoin className="w-8 h-8" />
                ) : (
                  <Wallet className="w-8 h-8" />
                )}
              </motion.div>
            </DialogTitle>
            <p className="text-lg font-semibold text-foreground mt-2">
              {selectedWallet === "btc" ? "Bitcoin (BTC)" : "USDT (TRC20)"}
            </p>
            <p className="text-sm text-muted-foreground">
              Tap to copy the wallet address
            </p>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Address Display */}
            <div 
              className={`p-4 rounded-xl border ${
                selectedWallet === "btc" 
                  ? "bg-btc/5 border-btc/20" 
                  : "bg-usdt/5 border-usdt/20"
              }`}
            >
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                Wallet Address
              </p>
              <p className="font-mono text-sm text-foreground break-all leading-relaxed">
                {currentAddress}
              </p>
            </div>

            {/* Copy Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleCopy}
                className={`w-full h-12 rounded-xl font-semibold transition-all duration-300 ${
                  copied 
                    ? "bg-green-500 hover:bg-green-500 text-white shadow-[0_0_20px_hsl(142_76%_36%/0.4)]" 
                    : selectedWallet === "btc"
                      ? "bg-btc hover:bg-btc/90 text-btc-foreground shadow-[0_0_20px_hsl(33_100%_50%/0.3)]"
                      : "bg-usdt hover:bg-usdt/90 text-usdt-foreground shadow-[0_0_20px_hsl(168_76%_42%/0.3)]"
                }`}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Copied!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-5 h-5" />
                      Copy Address
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SupportSection;
