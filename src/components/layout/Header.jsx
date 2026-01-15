import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

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
   * Ferme le menu mobile
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Classes CSS réutilisables
  const navLinkClass = "text-white hover:text-purple-light transition";
  const mobileNavLinkClass = "text-white font-medium text-2xl hover:text-purple-light transition";
  const burgerBarClass = "w-7 h-1 bg-white rounded-full transition-all duration-300";

  // Liens de navigation
  const navLinks = [
    { name: "Contact", path: "/contact" },
    // d’autres liens de navigation pourraient être rajoutés ici
  ];

  return (
    <>
      <header className="relative z-50 md:mt-6 mb-6">
        <div className="max-w-5xl mx-auto p-4 bg-white/5 shadow-2xl rounded-xl">
          <div className="flex justify-between items-center">

            {/* Groupe gauche : Logo + Navigation */}
            <div className="flex items-center gap-8">
              {/* Logo Weeb */}
              <Link 
                to="/"
                aria-label="Weeb - Retour à l'accueil"
              >
                <h1 className="text-white font-bold text-3xl hover:text-purple-light transition cursor-pointer">
                  weeb
                </h1>
              </Link>

              {/* Navigation Desktop - cachée sur mobile */}
              <nav 
                className="hidden md:flex items-center gap-8"
                aria-label="Navigation principale"
              >
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className={navLinkClass}
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Boutons Desktop - cachés sur mobile */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className={navLinkClass} aria-label="Se connecter à votre compte">
                Connexion
              </Link>
              <Link to="/register">
                <Button aria-label="Créer un nouveau compte">S’inscrire</Button>
              </Link>
            </div>

            {/* Menu Burger - visible uniquement sur mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden w-12 h-12 bg-purple-600 rounded-lg flex flex-col justify-center items-center gap-1 hover:bg-purple-light transition"
              aria-label={isMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {/* Barres du burger animées */}
              <span className={`${burgerBarClass} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} aria-hidden="true" />
              <span className={`${burgerBarClass} ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true" />
              <span className={`${burgerBarClass} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} aria-hidden="true" />
              <span className="sr-only">
                {isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile Full-Screen */}
      <div
        id="mobile-menu"
        className={`
          fixed inset-0 bg-blue-gray-900 z-40 md:hidden transition-transform duration-300 ease-in-out 
          ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation mobile"
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8" aria-label="Navigation mobile">
          
          {/* Liens de navigation mobile */}
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={closeMenu}
              className={mobileNavLinkClass}
              aria-current={location.pathname === link.path ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}

          {/* Séparateur */}
          <div className="w-24 h-px bg-white/20 my-4" aria-hidden="true" />

          {/* Bouton Log In */}
          <Link
            to="/login"
            onClick={closeMenu}
            className="text-white font-roboto font-medium text-xl hover:text-purple-light transition"
            aria-label="Se connecter à votre compte"
          >
            Connexion
          </Link>

          {/* Bouton Join Now */}
          <Link to="/register" onClick={closeMenu}>
            <Button aria-label="Créer un nouveau compte">S’inscrire</Button>
          </Link>
        </nav>
      </div>

      {/* Overlay - ferme le menu au clic */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          role="button"
          tabIndex={0}
          aria-label="Fermer le menu de navigation"
        />
      )}
    </>
  );
}

export default Header;