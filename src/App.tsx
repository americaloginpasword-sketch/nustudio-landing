import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import VideoShowcaseSection from './sections/VideoShowcaseSection';
import FooterSection from './sections/FooterSection';
import ContactModalProvider from './components/ContactModalProvider';
import { ShowcaseVideoProvider } from './components/ShowcaseVideoProvider';

function App() {
  return (
    <ContactModalProvider>
      <ShowcaseVideoProvider>
        <main
          className="min-h-screen font-kanit"
          style={{ backgroundColor: '#0C0C0C' }}
        >
          <HeroSection />
          <MarqueeSection />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <VideoShowcaseSection />
          <FooterSection />
        </main>
      </ShowcaseVideoProvider>
    </ContactModalProvider>
  );
}

export default App;
