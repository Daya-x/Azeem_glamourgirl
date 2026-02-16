import NavBar from "@/components/NavBar";
import CoverSection from "@/components/CoverSection";
import GetInTouch from "@/components/GetInTouch";
import ActionButtons from "@/components/ActionButtons";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <NavBar />
      <main>
        <CoverSection />
        <GetInTouch />
        <ActionButtons />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
