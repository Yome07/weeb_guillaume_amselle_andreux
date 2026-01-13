import { useState } from 'react';
import Button from '../ui/Button'
import { Link } from 'react-router-dom';

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
      <header className="w-full relative z-50 md:mt-6 mb-6">
        <div className="max-w-[1000px] mx-auto p-4 bg-white/5 shadow-dark-xxl rounded-[10px]">
          {/* Container responsive avec breakpoints */}
          <div className="flex justify-between items-center">

            {/* Groupe gauche : Logo + Navigation */}
            <div className="flex items-center gap-8">
              {/* Logo Weeb avec lien vers Home*/}
              <Link to="/">
                <h1 className="text-white font-roboto font-bold text-[32px] leading-[110%]">
                  weeb
                </h1>
              </Link>

              {/* Navigation Desktop/Tablette - cachée sur mobile */}
              <nav className="hidden md:flex items-center gap-8">
                <Link 
                  to="/" 
                  className="text-white font-roboto font-normal text-base hover:text-purple-light transition"
                >
                  About Us
                </Link>
                <Link 
                  to="/contact" 
                  className="text-white font-roboto font-normal text-base hover:text-purple-light transition"
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Boutons Desktop/Tablette - cachés sur mobile */}
            <div className="hidden md:flex items-center gap-4">
              {/* Bouton Log In */}
              <Link 
                to="/login"
                className="text-white font-roboto font-normal text-base hover:text-purple-light transition"
              >
                Log In
              </Link>
              
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
         <Link
            to="/"
            onClick={closeMenu}
            className="text-white font-roboto font-medium text-2xl hover:text-purple-light transition"
          >
            About Us
          </Link>

          {/* Lien Contact */}
          <Link
              to="/contact"
              onClick={closeMenu}
              className="text-white font-roboto font-medium text-2xl hover:text-purple-light transition"
          >
            Contact
          </Link>

          {/* Séparateur */}
          <div className="w-24 h-px bg-white/20 my-4"></div>

          {/* Bouton Log In */}
          <Link
            to="/login"
            onClick={closeMenu}
            className="text-white font-roboto font-medium text-xl hover:text-purple-light transition"
          >
            Log In
          </Link>

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