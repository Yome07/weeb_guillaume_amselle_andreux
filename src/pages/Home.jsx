import Button from '../components/ui/Button';
import DesktopImage from '../assets/Desktop.png';
import ShapesImage from '../assets/Shapes.png';
import ArtVenueSVG from '../assets/ArtVenue.svg';
import SHELLSSVG from '../assets/SHELLS.svg';
import SmartFinderSVG from '../assets/SmartFinder.svg';
import WAVESSVG from '../assets/WAVES.svg';
import ZoomerrSVG from '../assets/Zoomerr.svg';
import { FaArrowRight } from "react-icons/fa";
import FadeInOnScroll from '../components/animation/FadeInOnScroll';
import { useLanguage } from '../context/LanguageContext';

/**
 * Page d'accueil (Home)
 * Contient le hero, les sections de contenu
 * Version Responsive
 */
function Home() {
  const { t } = useLanguage(); // Hook pour accéder aux traductions


  // Classes CSS réutilisables
  const sectionClass = "py-12 lg:py-20";
  const containerClass = "max-w-7xl mx-auto px-5 md:px-10 lg:px-20";
  const titleClass = "text-white font-extrabold text-4xl mb-4 lg:text-5xl";
  const subtitleClass = "text-white font-bold uppercase tracking-widest mb-4";
  const paragraphClass = "text-white mb-6 lg:text-lg";
  const linkClass = "inline-flex items-center gap-2 text-white font-medium hover:text-purple-light transition";

  // Données des partenaires
  const partners = [
    { name: "SmartFinder", logo: SmartFinderSVG },
    { name: "Zoomerr", logo: ZoomerrSVG },
    { name: "SHELLS", logo: SHELLSSVG },
    { name: "WAVES", logo: WAVESSVG },
    { name: "ArtVenue", logo: ArtVenueSVG },
  ];

  return (
    <>
    
      {/* Section Hero */}
      <section className="flex-1 flex flex-col items-center pb-12 lg:pb-20">
        
        {/* Titre principal */}
        <FadeInOnScroll delay={0}>
          <h1 className="text-white font-extrabold text-4xl leading-[110%] text-center mb-6 lg:text-6xl max-w-2xl">
            {t.home.hero.title.part1}{' '}
            <span className="text-purple-light font-normal">{t.home.hero.title.web}</span>{' '}
            {t.home.hero.title.part2}{' '}
            <span className="underline decoration-purple-light">{t.home.hero.title.facets}</span>
          </h1>
        </FadeInOnScroll>

        {/* Description */}
        <FadeInOnScroll delay={0.2}>
          <p className="text-white leading-[140%] text-center mb-8 max-w-2xl lg:text-lg">
            {t.home.hero.description}
          </p>
        </FadeInOnScroll>

        {/* Boutons CTA */}
        <FadeInOnScroll delay={0.4}>
          <div className="flex flex-col md:flex-row gap-4 mb-12 lg:mb-16">
          <Button className="cursor-pointer">
              {t.home.hero.ctaDiscover}
          </Button>
          <Button variant="secondary" className="cursor-pointer">
              {t.home.hero.ctaNewsletter}
          </Button>
          </div>
        </FadeInOnScroll>

        {/* Image mockup navigateur */}
        <FadeInOnScroll delay={0.6}>
          <div className="w-full max-w-lg lg:max-w-2xl">
            <img 
                src={DesktopImage} 
                alt="" 
                className="w-full h-auto"
            />
          </div>
        </FadeInOnScroll>
      </section>

      {/* Section "Ils nous font confiance" */}
      <section className={sectionClass}>
        <div className={containerClass}>
          
          {/* Titre de la section */}
          <FadeInOnScroll>
            <h2 className="text-white font-extrabold text-3xl leading-[110%] text-center mb-12 lg:text-5xl">
                {t.home.trust.title}
            </h2>
          </FadeInOnScroll>
          {/* Logos des partenaires - générés dynamiquement */}
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {partners.map((partner, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1}>
                <div key={index} className="flex items-center gap-2 text-white">
                  <img src={partner.logo} alt="" />
                  <span className="font-bold text-lg">{partner.name}</span>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Section "Apprenez et progressez" */}
      <section className={sectionClass}>
        <div className={containerClass}>
          
          {/* Layout 2 colonnes sur desktop */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            
            {/* Colonne gauche - Texte */}
            <FadeInOnScroll direction="right" className="flex-1 text-center lg:text-left">
              <p className={subtitleClass}>
                {t.home.learn.subtitle}
              </p>
              <h2 className={titleClass}>
                <span className="text-purple-light">{t.home.learn.title.learn}</span>{' '}
                {t.home.learn.title.and}{' '}
                <span className="text-purple-light">{t.home.learn.title.progress}</span>
              </h2>
              <p className={paragraphClass}>
                {t.home.learn.description}
              </p>
              <a href="#" className={linkClass}>
                {t.home.learn.cta}
                <FaArrowRight />
              </a>
            </FadeInOnScroll>

            {/* Colonne droite - Image */}
            <FadeInOnScroll direction="left" delay={0.2} className="flex-1 w-full max-w-lg">
              <img 
                src={DesktopImage} 
                alt={t.home.learn.imageAlt}
                className="w-full h-auto"
              />
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Section "Restez informé" */}
      <section className={sectionClass}>
        <div className={containerClass}>
          
          {/* Layout 2 colonnes sur desktop (inverse) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
            
            {/* Colonne droite - Texte */}
            <FadeInOnScroll direction="left" className="flex-1 text-center lg:text-left">
              <p className={subtitleClass}>
                {t.home.stayInformed.subtitle}
              </p>
              <h2 className={titleClass}>
                {t.home.stayInformed.title.part1}{' '}
                <span className="text-purple-light">{t.home.stayInformed.title.trends}</span>
              </h2>
              <p className={paragraphClass}>
                {t.home.stayInformed.description}
              </p>
              <a href="#" className={linkClass}>
                {t.home.stayInformed.cta}
                <FaArrowRight />
              </a>
            </FadeInOnScroll>

            {/* Colonne gauche - Image géométrique */}
            <FadeInOnScroll direction="right" delay={0.2} className="flex-1 w-full max-w-xs">
              <img 
                src={ShapesImage} 
                alt={t.home.stayInformed.imageAlt} 
                className="w-full h-auto"
              />
            </FadeInOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;