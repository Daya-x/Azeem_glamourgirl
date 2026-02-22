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
TITLE:Owner
TEL;TYPE=CELL:+94768013588
EMAIL:azeemmushaan50@gmail.com
URL:https://azeemmushaan.netlify.app/
END:VCARD`;

  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Azeem_Mushaan.vcf";
  a.click();
  URL.revokeObjectURL(url);
}

export default function PersonalActionButtons() {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText("https://azeemmushaan.netlify.app/");
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
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-col sm:flex-row gap-3 px-6 pb-10 max-w-md mx-auto"
    >
      <Button
        onClick={handleShare}
        className="flex-1 min-h-[50px] rounded-xl bg-[hsl(0,72%,52%)] text-white font-sans font-semibold tracking-wide hover:bg-[hsl(0,72%,45%)] transition-all active:scale-95 shadow-[0_4px_14px_hsl(0_72%_52%/0.35)]"
      >
        <Share2 className="w-5 h-5 mr-2" />
        Share Profile
      </Button>
      <Button
        onClick={generateVCard}
        variant="outline"
        className="flex-1 min-h-[50px] rounded-xl bg-black text-white font-sans font-semibold tracking-wide hover:bg-black/85 hover:text-white transition-all active:scale-95 shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
      >
        <Download className="w-5 h-5 mr-2" />
        Save Contact
      </Button>
    </motion.div>
  );
}
