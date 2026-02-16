import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import NavBar from "@/components/NavBar";
import CoverSection from "@/components/CoverSection";
import Footer from "@/components/Footer";
import ImageViewer from "@/components/ImageViewer";

// Placeholder gallery images using picsum
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&h=600&fit=crop",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function Gallery() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <NavBar />
      <main>
        <CoverSection />

        <section className="px-4 md:px-8 py-10 md:py-14 max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-serif text-primary text-center mb-8 tracking-wide"
          >
            My Shop Gallery
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {GALLERY_IMAGES.map((src, i) => (
              <motion.button
                key={i}
                variants={item}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewerIndex(i)}
                className="aspect-square rounded-xl overflow-hidden group"
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </motion.button>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />

      <AnimatePresence>
        {viewerIndex !== null && (
          <ImageViewer
            images={GALLERY_IMAGES}
            initialIndex={viewerIndex}
            onClose={() => setViewerIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
