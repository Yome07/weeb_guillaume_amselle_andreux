import Button from '../components/ui/Button';
import DesktopImage from '../assets/Desktop.png';
import ShapesImage from '../assets/Shapes.png';
import ArtVenueSVG from '../assets/ArtVenue.svg';
import SHELLSSVG from '../assets/SHELLS.svg';
import SmartFinderSVG from '../assets/SmartFinder.svg';
import WAVESSVG from '../assets/WAVES.svg';
import ZoomerrSVG from '../assets/Zoomerr.svg';
import { FaArrowRight } from "react-icons/fa";

/**
 * Page d'accueil (Home)
 * Contient le hero, la section de confiance, et deux sections de contenu
 * Version Responsive
 */
function Home() {
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
        <h1 className="text-white font-extrabold text-4xl leading-[110%] text-center mb-6 lg:text-6xl max-w-2xl">
          Explorez le <span className="text-purple-light font-normal">Web</span> sous toutes ses{' '}
          <span className="underline decoration-purple-light">facettes</span>
        </h1>

        {/* Description */}
        <p className="text-white leading-[140%] text-center mb-8 max-w-2xl lg:text-lg">
          Le monde du web évolue constamment, et nous sommes là pour vous guider à travers ses tendances, 
          technologies et meilleures pratiques. Que vous soyez développeur, designer ou passionné du digital, 
          notre blog vous offre du contenu de qualité pour rester à la pointe.
        </p>

        {/* Boutons CTA */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 lg:mb-16">
          <Button className="cursor-pointer">
            Découvrir les articles
          </Button>
          <Button variant="secondary" className="cursor-pointer">
            S'abonner à la newsletter
          </Button>
        </div>

        {/* Image mockup navigateur */}
        <div className="w-full max-w-lg lg:max-w-2xl">
          <img 
            src={DesktopImage} 
            alt="" 
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Section "Ils nous font confiance" */}
      <section className={sectionClass}>
        <div className={containerClass}>
          
          {/* Titre de la section */}
          <h2 className="text-white font-extrabold text-3xl leading-[110%] text-center mb-12 lg:text-5xl">
            Ils nous font confiance
          </h2>

          {/* Logos des partenaires - générés dynamiquement */}
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center gap-2 text-white">
                <img src={partner.logo} alt="" />
                <span className="font-bold text-lg">{partner.name}</span>
              </div>
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
            <div className="flex-1 text-center lg:text-left">
              <p className={subtitleClass}>
                DES RESSOURCES POUR TOUS LES NIVEAUX
              </p>
              <h2 className={titleClass}>
                <span className="text-purple-light">Apprenez</span> et{' '}
                <span className="text-purple-light">progressez</span>
              </h2>
              <p className={paragraphClass}>
                Que vous débutiez en développement web ou que vous soyez un expert 
                cherchant à approfondir vos connaissances, nous vous proposons des tutoriels, 
                guides et bonnes pratiques pour apprendre efficacement.
              </p>
              <a href="#" className={linkClass}>
                Explorer les ressources
                <FaArrowRight />
              </a>
            </div>

            {/* Colonne droite - Image */}
            <div className="flex-1 w-full max-w-lg">
              <img 
                src={DesktopImage} 
                alt="" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section "Restez informé" */}
      <section className={sectionClass}>
        <div className={containerClass}>
          
          {/* Layout 2 colonnes sur desktop (inverse) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
            
            {/* Colonne droite - Texte */}
            <div className="flex-1 text-center lg:text-left">
              <p className={subtitleClass}>
                LE WEB, UN ÉCOSYSTÈME EN CONSTANTE ÉVOLUTION
              </p>
              <h2 className={titleClass}>
                Restez informé des dernières{' '}
                <span className="text-purple-light">tendances</span>
              </h2>
              <p className={paragraphClass}>
                Chaque semaine, nous analysons les nouveautés du web : frameworks émergents, 
                bonnes pratiques SEO, accessibilité, et bien plus encore. Ne manquez aucune 
                actualité du digital !
              </p>
              <a href="#" className={linkClass}>
                Lire les articles récents
                <FaArrowRight />
              </a>
            </div>

            {/* Colonne gauche - Image géométrique */}
            <div className="flex-1 w-full max-w-xs">
              <img 
                src={ShapesImage} 
                alt="" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;