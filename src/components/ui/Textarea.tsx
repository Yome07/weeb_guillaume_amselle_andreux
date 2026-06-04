import { useState, ChangeEvent } from 'react';

interface TextareaProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
}

/**
 * Composant Textarea réutilisable avec label flottant
 * Même style et comportement que le composant Input
 *
 * @param {string} label - Texte du label affiché au-dessus du textarea
 * @param {string} id - Identifiant unique pour le textarea et son label
 * @param {string} value - Valeur actuelle du textarea
 * @param {Function} onChange - Fonction appelée à chaque modification
 * @param {string} placeholder - Texte d'indication dans le textarea
 * @param {number} rows - Nombre de lignes visibles (défaut : 6)
 */
function Textarea({ label, id, value, onChange, placeholder, rows = 6 }: TextareaProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const shouldFloat = isFocused || value;

    return (
        <div className="relative w-full">
            {/* Textarea */}
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                rows={rows}
                className="w-full bg-transparent border-b border-purple-light text-white font-inter text-lg px-2 pt-6 pb-2 focus:outline-none focus:border-purple-600 transition-colors resize-none"
            />
            {/* Label flottant */}
            <label
                htmlFor={id}
                className={`
          absolute left-1/2 font-inter font-medium pointer-events-none transition-all duration-300 whitespace-nowrap text-purple-light
          ${shouldFloat
                    ? 'top-1 -translate-x-1/2 text-base'
                    : 'top-6 -translate-x-1/2 text-2xl'
                }
        `}
            >
                {label}
            </label>
        </div>
    );
}

export default Textarea;