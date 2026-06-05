import { useState, useEffect } from 'react';
import { getArticles, deleteArticle, type Article } from '../services/blogService';

interface UseAdminArticlesReturn {
    articles: Article[];
    loadingArticles: boolean;
    articlesError: string | null;
    deletingSlug: string | null;
    articleToDelete: string | null;
    articleActionMessage: string | null;
    setArticleToDelete: (slug: string | null) => void;
    handleDeleteArticle: () => Promise<void>;
}

/**
 * Hook pour gérer les articles dans le dashboard admin
 * Chargement, suppression et messages d'action
 */
export function useAdminArticles(): UseAdminArticlesReturn {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loadingArticles, setLoadingArticles] = useState<boolean>(true);
    const [articlesError, setArticlesError] = useState<string | null>(null);
    const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
    const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
    const [articleActionMessage, setArticleActionMessage] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        getArticles()
            .then((data) => { if (!cancelled) setArticles(data); })
            .catch(() => { if (!cancelled) setArticlesError('Impossible de charger les articles.'); })
            .finally(() => { if (!cancelled) setLoadingArticles(false); });

        return () => { cancelled = true; };
    }, []);

    // Supprimer un article et gérer les états de suppression et les messages d'action
    const handleDeleteArticle = async (): Promise<void> => {
        if (!articleToDelete) return;
        setDeletingSlug(articleToDelete);
        setArticleToDelete(null);
        setArticleActionMessage(null);
        try {
            await deleteArticle(articleToDelete);
            setArticles((prev) => prev.filter((a) => a.slug !== articleToDelete));
            setArticleActionMessage('Article supprimé avec succès.');
        } catch {
            setArticleActionMessage('Erreur lors de la suppression.');
        } finally {
            setDeletingSlug(null);
        }
    };

    return {
        articles,
        loadingArticles,
        articlesError,
        deletingSlug,
        articleToDelete,
        articleActionMessage,
        setArticleToDelete,
        handleDeleteArticle,
    };
}