import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaBluesky } from "react-icons/fa6";
import { useLanguage } from '../../context/LanguageContext';

/**
 * Composant Footer (Pied de page) - RESPONSIVE
 * Mobile: Layout 1 colonne
 * Tablette: Layout 3 colonnes
 * Desktop: Layout 5 colonnes
 */
function Footer() {
  const { t } = useLanguage(); // Hook pour accéder aux traductions

  // Classes CSS réutilisables
  const titleClass = "text-blue-gray-600 font-medium uppercase mb-4";
  const linkClass = "text-blue-gray-900 hover:text-purple-600 transition";

  // Données des sections du footer
  const footerSections = [
    {
      title: t.footer.product.title,
      links: [
        { name: t.footer.product.pricing, url: "#" },
        { name: t.footer.product.overview, url: "#" },
        { name: t.footer.product.browse, url: "#" },
        { name: t.footer.product.accessibility, url: "#" },
        { name: t.footer.product.five, url: "#" },
      ],
    },
    {
      title: t.footer.solutions.title,
      links: [
        { name: t.footer.solutions.brainstorming, url: "#" },
        { name: t.footer.solutions.ideation, url: "#" },
        { name: t.footer.solutions.wireframing, url: "#" },
        { name: t.footer.solutions.research, url: "#" },
      ],
    },
    {
      title: t.footer.resources.title,
      links: [
        { name: t.footer.resources.helpCenter, url: "#" },
        { name: t.footer.resources.blog, url: "#" },
        { name: t.footer.resources.tutorials, url: "#" },
      ],
    },
    {
      title: t.footer.company.title,
      links: [
        { name: t.footer.company.about, url: "#" },
        { name: t.footer.company.press, url: "#" },
        { name: t.footer.company.events, url: "#" },
        { name: t.footer.company.careers, url: "#" },
      ],
    },
  ];

  // Données des réseaux sociaux
  const socialLinks = [
    { name: t.footer.social.youtube, icon: FaYoutube, url: "#" },
    { name: t.footer.social.facebook, icon: FaFacebook, url: "#" },
    { name: t.footer.social.bluesky, icon: FaBluesky, url: "#" },
    { name: t.footer.social.instagram, icon: FaInstagram, url: "#" },
    { name: t.footer.social.linkedin, icon: FaLinkedin, url: "#" },
  ];

  return (
    <>
      <footer className="w-full bg-white border-t border-blue-gray-300">
        {/* Container principal responsive */}
        <div className="max-w-xs mx-auto px-20 py-12 md:max-w-3xl lg:max-w-7xl">

          {/* Grid des sections - responsive */}
          <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
            
            {/* Logo */}
            <div className="md:row-span-2">
              <h2 className="text-blue-gray-900 font-bold text-3xl">
                {t.footer.logo}
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
          <div className="border-t border-blue-gray-200 pt-12 flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
            {/* Copyright */}
            <p className="text-blue-gray-900">
              {t.footer.copyright}
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
      </footer>
    </>
  );
}

export default Footer;