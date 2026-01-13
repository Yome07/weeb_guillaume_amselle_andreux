import { FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

/**
 * Composant Footer (Pied de page) - RESPONSIVE
 * Mobile: Layout 1 colonne
 * Tablette: Layout 2 colonnes
 * Desktop: Layout 4 colonnes
 */
function Footer() {
  return (
    <footer className="w-full bg-white border-t border-blue-gray-300">
      {/* Container principal responsive */}
      <div className="max-w-[320px] mx-auto px-20 py-12 md:max-w-[768px] md:px-10 lg:max-w-[1280px] lg:px-20">

        {/* Grid des sections - responsive */}
        {/* Mobile: 1 colonne | Tablette: 3 colonnes | Desktop: 5 colonnes */}
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
            
            {/* Logo */}
            
            <h2 className="text-blue-gray-900 font-roboto font-bold text-[32px] leading-[110%]">
                weeb
            </h2>
            
          
          {/* Section PRODUCT */}
          <div>
            <h3 className="text-blue-gray-400 font-roboto font-medium text-base uppercase mb-4">
              PRODUCT
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Browse
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Five
                </a>
              </li>
            </ul>
          </div>

          {/* Section SOLUTIONS */}
          <div>
            <h3 className="text-blue-gray-400 font-roboto font-medium text-base uppercase mb-4">
              SOLUTIONS
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Brainstorming
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Ideation
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Wireframing
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Research
                </a>
              </li>
            </ul>
          </div>

          {/* Section RESOURCES */}
          <div>
            <h3 className="text-blue-gray-400 font-roboto font-medium text-base uppercase mb-4">
              RESOURCES
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Tutorials
                </a>
              </li>
            </ul>
          </div>

          {/* Section COMPANY */}
          <div>
            <h3 className="text-blue-gray-400 font-roboto font-medium text-base uppercase mb-4">
              COMPANY
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-gray-900 text-base hover:text-purple-600 transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Section Bottom - responsive */}
        <div className="border-t border-blue-gray-200 pt-12">
          {/* Layout différent selon la taille d'écran */}
          {/* Mobile: vertical | Desktop: horizontal space-between */}
          <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">

            {/* Copyright */}
            <p className="text-blue-gray-900 text-base order-1 lg:order-2">
              @ 2025 Weeb, Inc. All rights reserved.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 order-2 lg:order-3">
              <a 
                href="#" 
                className="text-blue-gray-900 hover:text-purple-600 transition"
                aria-label="Youtube"
              >
                <FaYoutube size={24} />
              </a>
              <a 
                href="#" 
                className="text-blue-gray-900 hover:text-purple-600 transition"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="#" 
                className="text-blue-gray-900 hover:text-purple-600 transition"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a 
                href="#" 
                className="text-blue-gray-900 hover:text-purple-600 transition"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="#" 
                className="text-blue-gray-900 hover:text-purple-600 transition"
                aria-label="Linkedin"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;