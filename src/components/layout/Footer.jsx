import { FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

/**
 * Composant Footer
 * Version Mobile First
 * TODO: Ajouter les versions tablette et desktop
 */
function Footer() {
  return (
    <footer className="w-full bg-white border-t border-blue-gray-300">
      <div className="max-w-[320px] mx-auto px-20 py-12">
        {/* Logo */}
        <div className="mb-12">
          <h2 className="text-blue-gray-900 font-roboto font-bold text-[32px] leading-[110%]">
            weeb
          </h2>
        </div>

        {/* Sections */}
        <div className="space-y-12 mb-12">
          {/* Product Section */}
          <div>
            <h3 className="text-blue-gray-400 font-roboto font-medium text-base uppercase mb-4">
              PRODUCT
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Pricing</a></li>
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Overview</a></li>
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Browse</a></li>
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Accessibility</a></li>
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Five</a></li>
            </ul>
          </div>

          {/* Solutions Section */}
          <div>
            <h3 className="text-blue-gray-400 font-roboto font-medium text-base uppercase mb-4">
              SOLUTIONS
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Brainstorming</a></li>
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Ideation</a></li>
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Wireframing</a></li>
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Research</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-blue-gray-400 font-roboto font-medium text-base uppercase mb-4">
              RESOURCES
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Help Center</a></li>
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Blog</a></li>
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Tutorials</a></li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-blue-gray-400 font-roboto font-medium text-base uppercase mb-4">
              COMPANY
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">About</a></li>
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Press</a></li>
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Events</a></li>
              <li><a href="#" className="text-blue-gray-900 hover:text-purple-600">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-gray-200 pt-12 space-y-6">
          <p className="text-blue-gray-900 text-base">
            @ 2025 Weeb, Inc. All rights reserved.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="text-blue-gray-900 hover:text-purple-600 transition">
              <FaYoutube size={24} />
            </a>
            <a href="#" className="text-blue-gray-900 hover:text-purple-600 transition">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-blue-gray-900 hover:text-purple-600 transition">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-blue-gray-900 hover:text-purple-600 transition">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-blue-gray-900 hover:text-purple-600 transition">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;