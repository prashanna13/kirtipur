import LoadingScreen from "./components/LoadingScreen.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HeroSection from "./sections/HeroSection.jsx";
import IntroSection from "./sections/IntroSection.jsx";
import HistorySection from "./sections/HistorySection.jsx";
import BaghBhairabSection from "./sections/BaghBhairabSection.jsx";
import UmaMaheshworSection from "./sections/UmaMaheshworSection.jsx";
import ChilanchoSection from "./sections/ChilanchoSection.jsx";
import ExploreSection from "./sections/ExploreSection.jsx";

export default function App() {
  return (
    <div className="app">
      <LoadingScreen />
      <Navbar />
      <main>
        <HeroSection />
        <IntroSection />
        <HistorySection />
        <BaghBhairabSection />
        <UmaMaheshworSection />
        <ChilanchoSection />
        <ExploreSection />
      </main>
      <Footer />
    </div>
  );
}
