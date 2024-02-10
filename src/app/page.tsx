import InterestingTours from "@/components/LandingPage/InterestingTours";
import LandingBanner from "@/components/LandingPage/LandingBanner";
import WhoOnDebTourBanner from "@/components/LandingPage/WhoOnDebTourBanner";

const LandingPage = () => {
  return (
    <main>
      <LandingBanner />
      <WhoOnDebTourBanner />
      <InterestingTours />
    </main>
  );
};

export default LandingPage;
