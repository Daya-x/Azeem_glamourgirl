import { motion } from "framer-motion";
import { Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

function generateVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:;;;;
FN:Azeem Mushaan
ORG:Glamour Girl
TEL;TYPE=CELL:+94777921811
URL:https://www.Glamourgirl.com
END:VCARD`;

  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "GlamourGirl_Sarah.vcf";
  a.click();
  URL.revokeObjectURL(url);
}

export default function ActionButtons() {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText("https://www.Glamourgirl.com");
      toast({ title: "Link copied!", description: "Share it with your friends ✨" });
    } catch {
      toast({ title: "Could not copy link", variant: "destructive" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row gap-3 px-6 pb-10 max-w-md mx-auto"
    >
      <Button
        onClick={handleShare}
        className="flex-1 min-h-[48px] bg-primary text-primary-foreground font-sans font-medium tracking-wide hover:bg-primary/90 transition-all active:scale-95"
      >
        <Share2 className="w-5 h-5 mr-2" />
        Share
      </Button>
      <Button
        onClick={generateVCard}
        variant="outline"
        className="flex-1 min-h-[48px] border-primary/40 text-primary font-sans font-medium tracking-wide hover:bg-primary/10 transition-all active:scale-95"
      >
        <Download className="w-5 h-5 mr-2" />
        Save Contact
      </Button>
    </motion.div>
  );
}
