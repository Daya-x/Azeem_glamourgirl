import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ownerImg from "@/assets/azeempp.jpeg";

const NAV_ITEMS = [
  { label: "Personal Profile", path: "/" },
  { label: "Shop Profile", path: "/shop" },
  { label: "Shop Gallery", path: "/gallery" },
];

interface NavBarProps {
  variant?: "default" | "personal";
}

export default function NavBar({ variant = "default" }: NavBarProps) {
  const isPersonal = variant === "personal";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  const menuContent = (
    <nav className="flex flex-col gap-2 pt-4">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.path}
          onClick={() => handleNav(item.path)}
          className={`w-full text-left px-6 py-4 text-lg font-serif tracking-wide transition-colors rounded-lg min-h-[44px] ${
            location.pathname === item.path
              ? "text-primary bg-secondary"
              : "text-foreground hover:text-primary hover:bg-secondary/50"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      {/* Nav Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isPersonal
            ? scrolled ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/10" : "bg-white/70 backdrop-blur-sm"
            : scrolled ? "bg-background/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-background/70 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4 max-w-5xl mx-auto">
          {/* Left: Profile Photo + Name */}
          <button
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-3 min-h-[44px] group"
          >
            <div className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${isPersonal ? "border-[hsl(0,72%,52%)]/60 group-hover:border-[hsl(0,72%,52%)]" : "border-primary/60 group-hover:border-primary group-hover:gold-glow-sm"}`}>
              <img src={ownerImg} alt="Owner" className="w-full h-full object-cover" />
            </div>
            <span className={`text-sm font-medium tracking-wide ${isPersonal ? "text-gray-800" : "text-foreground"}`}>
              Azeem Mushaan
            </span>
          </button>

          {/* Right: Menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-secondary/50 transition-colors"
            aria-label="Open menu"
          >
            <Menu className={`w-6 h-6 ${isPersonal ? "text-[hsl(0,72%,52%)]" : "text-primary"}`} />
          </button>
        </div>
      </header>

      {/* Menu — Bottom Sheet on mobile, Side Drawer on desktop */}
      {isMobile ? (
        <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
          <DrawerContent className="bg-card border-border">
            <div className="px-2 pb-6">
              <h3 className="text-center text-sm text-muted-foreground font-sans mb-2 pt-2">Menu</h3>
              {menuContent}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetContent side="right" className="bg-card border-border w-72">
            <SheetTitle className="text-primary font-serif text-xl mb-4">Menu</SheetTitle>
            {menuContent}
          </SheetContent>
        </Sheet>
      )}

      {/* Profile Overlay */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={() => setProfileOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary gold-glow">
                <img src={ownerImg} alt="Azeem Mushaan" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-serif text-primary tracking-wide">Azeem Mushaan</h2>
              <p className="text-muted-foreground text-sm">PROPRIETOR</p>
              <button
                onClick={() => setProfileOpen(false)}
                className="mt-4 min-w-[44px] min-h-[44px] rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
