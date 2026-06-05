import { useState, useEffect } from 'react';
import { getArticle, Article } from '../services/blogService';

interface UseArticleDetailReturn {
    article: Article | null;
    isLoading: boolean;
    error: string | null;
}

/**
 * Hook pour récupérer le détail d'un article par son id
 */
export function useArticleDetail(slug: string): UseArticleDetailReturn {
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;
        let cancelled = false;

        getArticle(slug)
            .then((data) => {
                if (!cancelled) setArticle(data);
            })
            .catch((err) => {
                if (!cancelled) setError(err.message);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => { cancelled = true; };
    }, [slug]);

    return { article, isLoading, error };
}