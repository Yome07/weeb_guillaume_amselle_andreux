import { useState, useEffect } from 'react';
import { getArticles, Article } from '../services/blogService';

interface UseArticleListReturn {
    articles: Article[];
    isLoading: boolean;
    error: string | null;
}

/**
 * Hook pour récupérer la liste de tous les articles
 */
export function useArticleList(): UseArticleListReturn {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        setIsLoading(true);
        setError(null);

        getArticles()
            .then((data) => {
                if (!cancelled) setArticles(data);
            })
            .catch((err) => {
                if (!cancelled) setError(err.message);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => { cancelled = true; };
    }, []);

    return { articles, isLoading, error };
}