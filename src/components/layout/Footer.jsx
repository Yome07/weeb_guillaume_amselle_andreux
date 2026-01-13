import { FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

/**
 * Composant Footer (Pied de page) - RESPONSIVE
 * Mobile: Layout 1 colonne
 * Tablette: Layout 3 colonnes
 * Desktop: Layout 5 colonnes
 */
function Footer() {
  // Classes CSS réutilisables
  const titleClass = "text-blue-gray-400 font-roboto font-medium text-base uppercase mb-4";
  const linkClass = "text-blue-gray-900 text-base hover:text-purple-600 transition";

  // Données des sections du footer
  const footerSections = [
    {
      title: "PRODUCT",
      links: [
        { name: "Pricing", url: "#" },
        { name: "Overview", url: "#" },
        { name: "Browse", url: "#" },
        { name: "Accessibility", url: "#" },
        { name: "Five", url: "#" },
      ],
    },
    {
      title: "SOLUTIONS",
      links: [
        { name: "Brainstorming", url: "#" },
        { name: "Ideation", url: "#" },
        { name: "Wireframing", url: "#" },
        { name: "Research", url: "#" },
      ],
    },
    {
      title: "RESOURCES",
      links: [
        { name: "Help Center", url: "#" },
        { name: "Blog", url: "#" },
        { name: "Tutorials", url: "#" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { name: "About", url: "#" },
        { name: "Press", url: "#" },
        { name: "Events", url: "#" },
        { name: "Careers", url: "#" },
      ],
    },
  ];

  // Données des réseaux sociaux
  const socialLinks = [
    { name: "Youtube", icon: FaYoutube, url: "#" },
    { name: "Facebook", icon: FaFacebook, url: "#" },
    { name: "Twitter", icon: FaTwitter, url: "#" },
    { name: "Instagram", icon: FaInstagram, url: "#" },
    { name: "Linkedin", icon: FaLinkedin, url: "#" },
  ];

  return (
    <>
      <footer className="w-full bg-white border-t border-blue-gray-300">
        {/* Container principal responsive */}
        <div className="max-w-[320px] mx-auto px-20 py-12 md:max-w-[768px] md:px-10 lg:max-w-[1280px] lg:px-20">

          {/* Grid des sections - responsive */}
          <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
            
            {/* Logo */}
            <div>
              <h2 className="text-blue-gray-900 font-roboto font-bold text-[32px] leading-[110%]">
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
              <p className="text-blue-gray-900 text-base order-1 lg:order-2">
                @ 2025 Weeb, Inc. All rights reserved.
              </p>
              
              {/* Social Icons - générés dynamiquement */}
              <div className="flex gap-4 order-2 lg:order-3">
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