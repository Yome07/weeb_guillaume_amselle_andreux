import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { LanguageProvider } from '../../context/LanguageContext';

/**
 * Layout principal de l'application
 * Contient le Header et le Footer
 * Affiche les pages enfants via <Outlet />
 */
function Layout() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-blue-gray-900">
        {/* Header présent sur toutes les pages */}
        <Header />
        
        {/* Contenu de la page (Home, Contact, Login, Register, ForgotPassword) */}
        <main className="px-20 py-20">
          <Outlet />
        </main>
        
        {/* Footer présent sur toutes les pages */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default Layout;