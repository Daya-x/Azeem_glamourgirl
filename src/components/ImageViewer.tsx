import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageViewerProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageViewer({ images, initialIndex, onClose }: ImageViewerProps) {
  const [index, setIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = useCallback(() => {
    if (index < images.length - 1) {
      setDirection(1);
      setIndex((i) => i + 1);
    }
  }, [index, images.length]);

  const goPrev = useCallback(() => {
    if (index > 0) {
      setDirection(-1);
      setIndex((i) => i - 1);
    }
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-foreground" />
      </button>

      {/* Arrows */}
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-2 md:left-6 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
      )}
      {index < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-2 md:right-6 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      )}

      <div
        className="w-full h-full md:w-auto md:h-auto md:max-w-3xl md:max-h-[80vh] flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`Gallery image ${index + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="w-full h-full object-contain md:rounded-xl"
          />
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-muted-foreground/30"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
