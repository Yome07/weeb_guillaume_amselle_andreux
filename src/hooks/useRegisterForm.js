import { useState } from 'react';

/**
 * Hook personnalisé pour gérer la logique du formulaire d'inscription
 * Gère la validation de l'email et du mot de passe
 *
 * @returns {Object} - État et fonctions pour gérer le formulaire
 */
export function useRegisterForm() {
  // États pour les champs du formulaire
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // États pour les erreurs
  const [errors, setErrors] = useState({});

  /**
   * Valide le format de l'email
   */
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  /**
   * Valide le mot de passe
   * - Minimum 8 caractères
   * - Au moins une majuscule
   * - Au moins une minuscule
   * - Au moins un chiffre
   * - Au moins un caractère spécial
   */
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar,
      minLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
    };
  };

  /**
   * Gère l'envoi du formulaire
   */
  const handleSubmit = (e, t) => {
    e.preventDefault();

    // Réinitialiser les erreurs
    const newErrors = {};

    // Validation du nom
    if (!lastname.trim()) {
      newErrors.lastname = t.register.validation.lastnameRequired;
    }

    // Validation du prénom
    if (!firstname.trim()) {
      newErrors.firstname = t.register.validation.firstnameRequired;
    }

    // Validation de l'email
    if (!email.trim()) {
      newErrors.email = t.register.validation.emailRequired;
    } else if (!validateEmail(email)) {
      newErrors.email = t.register.validation.emailInvalid;
    }

    // Validation du mot de passe
    const passwordValidation = validatePassword(password);
    if (!password) {
      newErrors.password = t.register.validation.passwordRequired;
    } else if (!passwordValidation.isValid) {
      newErrors.password = t.register.validation.passwordWeak;
    }

    // Validation de la confirmation du mot de passe
    if (!confirmPassword) {
      newErrors.confirmPassword = t.register.validation.confirmPasswordRequired;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t.register.validation.passwordMismatch;
    }

    // Si des erreurs existent, les afficher
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    // Si tout est valide
    console.log('Inscription réussie !', { lastname, firstname, email, password });

    // Réinitialiser le formulaire
    setLastname('');
    setFirstname('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});

    return true;
  };

  // Vérifier la force du mot de passe en temps réel
  const passwordStrength = password ? validatePassword(password) : null;

  // Vérifier si les mots de passe correspondent
  const passwordsMatch = password === confirmPassword;

  return {
    // États
    lastname,
    firstname,
    email,
    password,
    confirmPassword,
    errors,
    passwordStrength,
    passwordsMatch,

    // Setters
    setLastname,
    setFirstname,
    setEmail,
    setPassword,
    setConfirmPassword,

    // Fonctions
    handleSubmit,
    validateEmail,
    validatePassword,
  };
}

