import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Composant qui fait apparaître ses enfants au scroll
 * Animation de opacity 0 → 1 + translation
 * 
 * @param {ReactNode} children - Contenu à animer
 * @param {number} delay - Délai avant l'animation (en secondes)
 * @param {string} direction - Direction de l'animation ('up', 'down', 'left', 'right')
 */
function FadeInOnScroll({ children, delay = 0, direction = 'up' }) {
  // Permet d’avoir accès à un élément du DOM sans déclencher de re-render
  const ref = useRef(null);
  
  // Détecte quand l'élément entre dans le viewport
  const isInView = useInView(ref, { 
    once: true,    // Animation une seule fois
    amount: 0.33    // Déclenche quand 33% de l'élément est visible
  });

  // Positions initiales selon la direction
  const directions = {
    up: { y: 50 },      // Monte
    down: { y: -50 },   // Descend
    left: { x: 50 },    // Vient de la droite
    right: { x: -50 },  // Vient de la gauche
  };

  return (
    <motion.div
      ref={ref}
      initial={{                  // état intial de l’animation 
        opacity: 0,               // élément non visible
        ...directions[direction]  // décalage suivant la direction choisie
      }}
      animate={isInView ? {       // état final si élément dans le viewPort
        opacity: 1,               // élément visible
        x: 0,                     // retrouve sa position
        y: 0 
      } : {}}
      transition={{ 
        duration: 0.8,        // Durée de l'animation
        delay: delay,         // Délai avant le début
        ease: "easeOut"       // Courbe d'animation fluide
      }}
    >
      {children}
    </motion.div>
  );
}

export default FadeInOnScroll;