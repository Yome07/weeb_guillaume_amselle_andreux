import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout principal de l'application
 * Contient le Header et le Footer
 * Affiche les pages enfants via <Outlet />
 */
function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-gray-900">
      {/* Header présent sur toutes les pages */}
      <Header />
      
      {/* Contenu de la page (Home, Contact, Login, etc.) */}
      <main className="px-20 py-20">
        <Outlet />
      </main>
      
      {/* Footer présent sur toutes les pages */}
      <Footer />
    </div>
  );
}

export default Layout;