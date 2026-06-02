import { useState, FormEvent } from 'react';

interface PasswordStrength {
  isValid: boolean;
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

interface UseRegisterFormReturn {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: Record<string, string>;
  passwordStrength: PasswordStrength | null;
  passwordsMatch: boolean;
  setLastname: (value: string) => void;
  setFirstname: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, t: any) => boolean;
  validateEmail: (email: string) => boolean;
  validatePassword: (password: string) => PasswordStrength;
}

interface Translations {
  register: {
    validation: {
      lastnameRequired: string;
      firstnameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
      passwordWeak: string;
      confirmPasswordRequired: string;
      passwordMismatch: string;
    };
  };
}

/**
 * Hook personnalisé pour gérer la logique du formulaire d'inscription
 * Gère la validation de l'email et du mot de passe
 *
 * @returns {UseRegisterFormReturn} - État et fonctions pour gérer le formulaire
 */
export function useRegisterForm(): UseRegisterFormReturn {
  // États pour les champs du formulaire
  const [lastname, setLastname] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // États pour les erreurs
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Valide le format de l'email
   */
  const validateEmail = (email: string): boolean => {
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
  const validatePassword = (password: string): PasswordStrength => {
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
  const handleSubmit = (e: FormEvent<HTMLFormElement>, t: Translations): boolean => {
    e.preventDefault();

    // Réinitialiser les erreurs
    const newErrors: Record<string, string> = {};

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

