import NavBar from "@/components/NavBar";
import PersonalHero from "@/components/PersonalHero";
import PersonalGetInTouch from "@/components/PersonalGetInTouch";
import PersonalActionButtons from "@/components/PersonalActionButtons";
import PersonalFooter from "@/components/PersonalFooter";

const PersonalProfile = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <NavBar variant="personal" />
      <main>
        <PersonalHero />
        <PersonalGetInTouch />
        <PersonalActionButtons />
      </main>
      <PersonalFooter />
    </div>
  );
};

export default PersonalProfile;
