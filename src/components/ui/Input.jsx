/**
 * Composant Input réutilisable avec label
 * Crée un champ de saisie stylisé avec un label au-dessus
 * 
 * @param {string} label - Texte du label affiché au-dessus de l'input
 * @param {string} type - Type d'input HTML (text, password, email, etc.)
 * @param {string} id - Identifiant unique pour l'input et son label
 * @param {string} value - Valeur actuelle de l'input
 * @param {Function} onChange - Fonction appelée à chaque modification
 * @param {string} placeholder - Texte d'indication dans l'input
 */
function Input({ label, type = "text", id, value, onChange, placeholder = "" }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Affiche le label seulement s'il est fourni */}
      {label && (
        <label 
          htmlFor={id} 
          className="text-purple-light font-inter font-inter font-medium text-2xl text-center"
        >
          {label}
        </label>
      )}
      
      {/* Champ de saisie avec bordure inférieure */}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border-b border-purple-light text-white text-lg p-2 font-inter focus:outline-none focus:border-purple-600 text-center"
      />
    </div>
  );
}

export default Input;