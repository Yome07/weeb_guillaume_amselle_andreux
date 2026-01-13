import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
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
  return (
    <div className="min-h-screen flex flex-col bg-blue-gray-900">
      {/* En-tête avec logo et menu */}
      <Header />

      {/* Section Hero */}
      <section className="flex-1 flex flex-col items-center px-5 py-12 md:px-10 lg:px-20 lg:py-20">
        
        {/* Titre principal */}
        <h1 className="text-white font-roboto font-extrabold text-[40px] leading-[110%] text-center mb-6 lg:text-[56px] max-w-[600px]">
          Explorez le <span className="text-purple-light font-normal">Web</span> sous toutes ses <span className="underline decoration-purple-light">facettes</span>
        </h1>

        {/* Description */}
        <p className="text-white font-roboto font-normal text-base leading-[140%] text-center mb-8 max-w-[700px] lg:text-lg">
          Le monde du web évolue constamment, et nous sommes là pour vous guider à travers ses tendances, technologies et meilleures pratiques. Que vous soyez développeur, designer ou passionné du digital, notre blog vous offre du contenu de qualité pour rester à la pointe.
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
        <div className="w-full max-w-[500px] lg:max-w-[700px]">
          <img 
            src={DesktopImage} 
            alt="Mockup navigateur web" 
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

      {/* Section "Ils nous font confiance" */}
      <section className="bg-blue-gray-900 py-12 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-20">
          
          {/* Titre de la section */}
          <h2 className="text-white font-roboto font-extrabold text-[32px] leading-[110%] text-center mb-12 lg:text-[40px]">
            Ils nous font confiance
          </h2>

          {/* Logos des partenaires */}
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {/* Logo 1 - SmartFinder */}
            <div className="flex items-center gap-2 text-white">
              <img src={SmartFinderSVG} />
              <span className="font-roboto font-bold text-lg">SmartFinder</span>
            </div>

            {/* Logo 2 - Zoomer */}
            <div className="flex items-center gap-2 text-white">
              <img src={ZoomerrSVG} />
              <span className="font-roboto font-bold text-lg">Zoomerr</span>
            </div>

            {/* Logo 3 - SHELLS */}
            <div className="flex items-center gap-2 text-white">
              <img src={SHELLSSVG} />
              <span className="font-roboto font-bold text-lg">SHELLS</span>
            </div>

            {/* Logo 4 - WAVES */}
            <div className="flex items-center gap-2 text-white">
              <img src={WAVESSVG} />
              <span className="font-roboto font-bold text-lg">WAVES</span>
            </div>

            {/* Logo 5 - ArtVenue */}
            <div className="flex items-center gap-2 text-white">
              <img src={ArtVenueSVG} />
              <span className="font-roboto font-bold text-lg">ArtVenue</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Apprenez et progressez" */}
      <section className="bg-blue-gray-900 py-12 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-20">
          
          {/* Layout 2 colonnes sur desktop */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            
            {/* Colonne gauche - Texte */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-white font-roboto font-bold uppercase tracking-widest mb-4">
                DES RESSOURCES POUR TOUS LES NIVEAUX
              </p>
              <h2 className="text-white font-roboto font-extrabold text-[40px] leading-[110%] mb-4 lg:text-[48px]">
                <span className="text-purple-light">Apprenez</span> et <span className="text-purple-light">progressez</span>
              </h2>
              <p className="text-white font-roboto font-normal text-base leading-[140%] mb-6 lg:text-lg">
                Que vous débutiez en développement web ou que vous soyez un expert 
                cherchant à approfondir vos connaissances, nous vous proposons des tutoriels, 
                guides et bonnes pratiques pour apprendre efficacement.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center gap-2 text-white font-roboto font-medium text-base hover:text-purple-light transition"
              >
                Explorer les ressources
                <FaArrowRight />
              </a>
            </div>

            {/* Colonne droite - Image */}
            <div className="flex-1 w-full max-w-[500px]">
              <img 
                src={DesktopImage} 
                alt="Ressources d'apprentissage" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section "Restez informé" */}
      <section className="bg-blue-gray-900 py-12 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-20">
          
          {/* Layout 2 colonnes sur desktop (inverse) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
            
            {/* Colonne droite - Texte */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-white font-roboto font-bold uppercase tracking-widest mb-4">
                LE WEB, UN ÉCOSYSTÈME EN CONSTANTE ÉVOLUTION
              </p>
              <h2 className="text-white font-roboto font-extrabold text-[40px] leading-[110%] mb-4 lg:text-[48px]">
                Restez informé des dernières <span className="text-purple-light">tendances</span>
              </h2>
              <p className="text-white font-roboto font-normal text-base leading-[140%] mb-6 lg:text-lg">
                Chaque semaine, nous analysons les nouveautés du web : frameworks émergents, 
                bonnes pratiques SEO, accessibilité, et bien plus encore. Ne manquez aucune 
                actualité du digital !
              </p>
              <a 
                href="#" 
                className="inline-flex items-center gap-2 text-white font-roboto font-medium text-base hover:text-purple-light transition"
              >
                Lire les articles récents
                <FaArrowRight />
              </a>
            </div>

            {/* Colonne gauche - Image géométrique */}
            <div className="flex-1 w-full max-w-[300px] flex justify-center">
              <img 
                src={ShapesImage} 
                alt="Forme géométrique" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}

export default Home;