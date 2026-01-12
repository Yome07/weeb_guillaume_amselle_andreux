/**
 * Composant Header (En-tête)
 * Version Mobile First - contient le logo et le menu burger
 * TODO: Ajouter les versions tablette et desktop
 */
function Header() {
  return (
    <header className="w-full bg-white/5 shadow-dark-xxl rounded-b-[10px]">
      {/* Container avec padding et largeur max pour mobile */}
      <div className="flex justify-between items-center px-5 py-[15px] max-w-[320px] mx-auto">
        
        {/* Logo Weeb */}
        <h1 className="text-white font-roboto font-bold text-[32px] leading-[110%]">
          weeb
        </h1>

        {/* Bouton Menu Burger (3 barres) */}
        <button 
          className="w-12 h-11 bg-purple-600 border-2 border-purple-600 rounded-lg flex flex-col justify-center items-center gap-1 hover:bg-purple-light hover:border-purple-light transition"
          aria-label="Menu"
        >
          {/* Les 3 barres horizontales du menu burger */}
          <span className="w-7 h-1 bg-white rounded-full"></span>
          <span className="w-7 h-1 bg-white rounded-full"></span>
          <span className="w-7 h-1 bg-white rounded-full"></span>
        </button>
      </div>
    </header>
  );
}

export default Header;