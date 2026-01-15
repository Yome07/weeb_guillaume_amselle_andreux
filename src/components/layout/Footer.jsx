import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaBluesky } from "react-icons/fa6";

/**
 * Composant Footer (Pied de page) - RESPONSIVE
 * Mobile: Layout 1 colonne
 * Tablette: Layout 3 colonnes
 * Desktop: Layout 5 colonnes
 */
function Footer() {
  // Classes CSS réutilisables
  const titleClass = "text-blue-gray-600 font-medium uppercase mb-4";
  const linkClass = "text-blue-gray-900 hover:text-purple-600 transition";

  // Données des sections du footer
  const footerSections = [
    {
      title: "PRODUIT",
      links: [
        { name: "Tarifs", url: "#" },
        { name: "Aperçu", url: "#" },
        { name: "Parcourir", url: "#" },
        { name: "Accessibilité", url: "#" },
        { name: "Five", url: "#" },
      ],
    },
    {
      title: "SOLUTIONS",
      links: [
        { name: "Brainstorming", url: "#" },
        { name: "Idéation", url: "#" },
        { name: "Wireframing", url: "#" },
        { name: "Recherche", url: "#" },
      ],
    },
    {
      title: "RESSOURCES",
      links: [
        { name: "Centre d’aide", url: "#" },
        { name: "Blog", url: "#" },
        { name: "Tutoriels", url: "#" },
      ],
    },
    {
      title: "ENTREPRISE",
      links: [
        { name: "À propos", url: "#" },
        { name: "Presse", url: "#" },
        { name: "Événements", url: "#" },
        { name: "Carrières", url: "#" },
      ],
    },
  ];

  // Données des réseaux sociaux
  const socialLinks = [
    { name: "Youtube", icon: FaYoutube, url: "#" },
    { name: "Facebook", icon: FaFacebook, url: "#" },
    { name: "Bluesky", icon: FaBluesky, url: "#" },
    { name: "Instagram", icon: FaInstagram, url: "#" },
    { name: "Linkedin", icon: FaLinkedin, url: "#" },
  ];

  return (
    <>
      <footer className="w-full bg-white border-t border-blue-gray-300">
        {/* Container principal responsive */}
        <div className="max-w-xs mx-auto px-20 py-12 md:max-w-3xl lg:max-w-7xl">

          {/* Grid des sections - responsive */}
          <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
            
            {/* Logo */}
            <div>
              <h2 className="text-blue-gray-900 font-bold text-3xl">
                weeb
              </h2>
            </div>

            {/* Sections dynamiques générées à partir du tableau */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className={titleClass}>{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.url} className={linkClass}>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section Bottom - responsive */}
          <div className="border-t border-blue-gray-200 pt-12">
            <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
              
              {/* Copyright */}
              <p className="text-blue-gray-900">
                @ 2025 Weeb, Inc. All rights reserved.
              </p>
              
              {/* Social Icons - générés dynamiquement */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className="text-blue-gray-900 hover:text-purple-600 transition"
                      aria-label={social.name}
                    >
                      <Icon size={24} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;