import { motion } from "framer-motion";
import ownerImg from "@/assets/azeemm.png";
import coverImg from "@/assets/cover2.jpg";

export default function PersonalHero() {
  return (
    <section className="relative">
      {/* Cover Photo */}
      <div className="relative w-full h-[45vh] md:h-[50vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          src={coverImg}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager" />

        {/* Richer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-white" />
        {/* Decorative shimmer */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

      </div>

      {/* Profile Picture centered on cover */}
      <div className="relative -mt-28 flex flex-col items-center px-6 pb-8">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="relative w-36 h-36 md:w-40 md:h-40 mb-5">

          {/* Animated ring */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1.5 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, hsl(0,72%,52%), hsl(0,72%,80%), hsl(0,72%,52%), hsl(0,72%,80%), hsl(0,72%,52%))"
            }} />

          <div className="absolute inset-0 rounded-full overflow-hidden border-[4px] border-white shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
            <img src={ownerImg} alt="Azeem Mushaan" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-wide">

          Azeem Mushaan
        </motion.h1>

        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-1.5 mt-3">

          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[hsl(0,72%,52%)]/8 text-[hsl(0,72%,52%)] text-sm font-medium tracking-wide">
            Proprietor of Glamour Girl Shop
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[hsl(0,72%,52%)]/8 text-[hsl(0,72%,52%)] text-sm font-medium tracking-wide">
            Gempreneur
          </span>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-6 max-w-md text-center">

          <div className="flex items-center gap-3 justify-center mb-3">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-px bg-[hsl(0,72%,52%)]/30"
            />
            <h2 className="text-xl md:text-2xl font-serif text-[hsl(0,72%,52%)] tracking-wide">About</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-px bg-[hsl(0,72%,52%)]/30"
            />
          </div>
          <p className="text-sm leading-relaxed text-gray-600">
           Proprietor of Glamour Girl Cosmetic Shop. Currently studying gemstones with plans to build a future business in the gem industry. Passionate about quality, elegance, and continuous growth. Sports enthusiast with a special interest in cricket.
          </p>
        </motion.div>
      </div>
    </section>);

}