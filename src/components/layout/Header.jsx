import { useState } from 'react';
import Button from '../ui/Button'

/**
 * Composant Header (En-tête) - RESPONSIVE avec Menu Mobile
 * Mobile: Logo + Menu burger qui ouvre un menu full-screen
 * Tablette/Desktop: Logo + Navigation (About Us, Contact) + Boutons (Log In, Join Now)
 */
function Header() {
  // État pour gérer l'ouverture/fermeture du menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Toggle le menu mobile (ouvrir/fermer)
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Ferme le menu mobile (utilisé lors du clic sur un lien)
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="w-full bg-white/5 shadow-dark-xxl rounded-b-[10px] relative z-50">
        {/* Container responsive avec breakpoints */}
        <div className="flex justify-between items-center px-5 py-[15px] max-w-[320px] mx-auto md:max-w-[768px] md:px-10 lg:max-w-[1280px] lg:px-20">
          
          {/* Logo Weeb */}
          <h1 className="text-white font-roboto font-bold text-[32px] leading-[110%]">
            weeb
          </h1>

          {/* Navigation Desktop/Tablette - cachée sur mobile */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#" 
              className="text-white font-roboto font-normal text-base hover:text-purple-light transition"
            >
              About Us
            </a>
            <a 
              href="#" 
              className="text-white font-roboto font-normal text-base hover:text-purple-light transition"
            >
              Contact
            </a>
          </nav>

          {/* Boutons Desktop/Tablette - cachés sur mobile */}
          <div className="hidden md:flex items-center gap-4">
            {/* Bouton Log In */}
            <Button variant='secondary' >
              Log In
            </Button>
            
            {/* Bouton Join Now */}
            <Button>
              Join Now
            </Button>
          </div>

          {/* Menu Burger - visible uniquement sur mobile */}
          <button 
            onClick={toggleMenu}
            className="md:hidden w-12 h-11 bg-purple-600 border-2 border-purple-600 rounded-lg flex flex-col justify-center items-center gap-1 hover:bg-purple-light hover:border-purple-light transition"
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            {/* Animation des barres en X quand le menu est ouvert */}
            <span 
              className={`w-7 h-1 bg-white rounded-full transition-transform duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span 
              className={`w-7 h-1 bg-white rounded-full transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span 
              className={`w-7 h-1 bg-white rounded-full transition-transform duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>
      </header>

      {/* Menu Mobile Full-Screen - s'affiche au clic */}
      <div
        className={`fixed inset-0 bg-blue-gray-900 z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Container du menu mobile */}
        <nav className="flex flex-col items-center justify-center h-full gap-8 px-8">
          
          {/* Lien About Us */}
         <a 
            href="#"
            onClick={closeMenu}
            className="text-white font-roboto font-medium text-2xl hover:text-purple-light transition"
          >
            About Us
          </a>

          {/* Lien Contact */}
        <a  
            href="#"
            onClick={closeMenu}
            className="text-white font-roboto font-medium text-2xl hover:text-purple-light transition"
          >
            Contact
          </a>

          {/* Séparateur */}
          <div className="w-24 h-px bg-white/20 my-4"></div>

          {/* Bouton Log In */}
          <button
            onClick={closeMenu}
            className="text-white font-roboto font-medium text-xl hover:text-purple-light transition"
          >
            Log In
          </button>

          {/* Bouton Join Now */}
          <button
            onClick={closeMenu}
            className="bg-purple-600 text-white font-roboto font-medium text-base px-8 py-4 rounded-lg border-2 border-purple-600 hover:bg-purple-light hover:border-purple-light transition"
          >
            Join Now
          </button>
        </nav>
      </div>

      {/* Overlay pour fermer le menu en cliquant à l'extérieur */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        ></div>
      )}
    </>
  );
}

export default Header;