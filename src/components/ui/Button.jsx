/**
 * Composant Button réutilisable
 * Permet de créer des boutons avec différentes variantes (primary, secondary)
 * 
 * @param {ReactNode} children - Le contenu du bouton (texte, icône, etc.)
 * @param {Function} onClick - Fonction appelée au clic
 * @param {string} type - Type HTML du bouton (button, submit, reset)
 * @param {string} variant - Style du bouton (primary ou secondary)
 * @param {string} className - Classes CSS supplémentaires
 */
function Button({ children, onClick, type = "button", variant = "primary", className = "" }) {
  // Classes CSS communes à tous les boutons
  const baseClasses = "flex items-center justify-center px-4 py-2 rounded-lg font-medium transition duration-200 text-white border-2";
  
  // Définition des différentes variantes de style
  const variants = {
    primary: "bg-purple-600 border-purple-600 hover:bg-purple-light hover:border-purple-light",
    secondary: "bg-transparent border-white hover:bg-white hover:text-blue-gray-900",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      // Combine les classes de base + variante + classes personnalisées
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;