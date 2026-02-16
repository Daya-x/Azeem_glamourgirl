import { motion } from "framer-motion";
import coverImg from "@/assets/cover.jpg";
import logoImg from "@/assets/logo.png";

export default function CoverSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <img
        src={coverImg}
        alt="Glamour Girl Salon"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 md:pb-16 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary/50 mb-4 gold-glow-sm"
        >
          <img src={logoImg} alt="Glamour Girl Logo" className="w-full h-full object-cover" />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-5xl font-serif font-bold text-gold-gradient tracking-wider"
        >
          Glamour Girl
        </motion.h1>
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-muted-foreground text-sm md:text-base mt-2 tracking-wide"
        >
          Premium Beauty & Cosmetics
        </motion.p>
      </div>
    </section>
  );
}
