import { useState } from 'react';

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
function Input({ label, type = "text", id, value, onChange }) {
  // État pour savoir si l'input est focus
  const [isFocused, setIsFocused] = useState(false);

  // Le label doit monter si l'input est focus OU si il contient du texte
  const shouldFloat = isFocused || value;

  return (
    <div className="relative w-full">
      {/* Input */}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent border-b border-purple-light text-white font-inter text-lg px-2 pt-6 pb-2 focus:outline-none focus:border-purple-600 transition-colors peer text-center"
      />

      {/* Label flottant */}
      <label
        htmlFor={id}
        className={`
          absolute left-1/2 font-inter font-medium pointer-events-none transition-all duration-300 whitespace-nowrap text-purple-light
          ${shouldFloat 
            ? 'top-1 -translate-x-1/2 text-base' 
            : 'top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl'
          }
        `}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;