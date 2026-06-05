import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../services/blogService';

interface UseArticleFormReturn {
    title: string;
    content: string;
    errors: Record<string, string>;
    apiError: string | null;
    isLoading: boolean;
    setTitle: (value: string) => void;
    setContent: (value: string) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

/**
 * Hook pour gérer la logique du formulaire de création d'article
 *
 * @returns {UseArticleFormReturn} - État et fonctions pour gérer le formulaire
 */
export function useArticleForm(): UseArticleFormReturn {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * Gère l'envoi du formulaire
     * @param {FormEvent} e - événement d'envoi du formulaire
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setApiError(null);

        const newErrors: Record<string, string> = {};

        if (!title.trim()) {
            newErrors.title = 'Le titre est requis.';
        } else if (title.trim().length < 5) {
            newErrors.title = 'Le titre doit contenir au moins 5 caractères.';
        }

        if (!content.trim()) {
            newErrors.content = 'Le contenu est requis.';
        } else if (content.trim().length < 20) {
            newErrors.content = 'Le contenu doit contenir au moins 20 caractères.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            const article = await createArticle({ title: title.trim(), content: content.trim() });
            setTitle('');
            setContent('');
            setErrors({});
            navigate(`/blog/${article.slug}`);
        } catch (err: any) {
            setApiError(err.message || "Une erreur est survenue lors de la publication.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        title,
        content,
        errors,
        apiError,
        isLoading,
        setTitle,
        setContent,
        handleSubmit,
    };
}