import api, { publicApi } from './api';

export interface ArticleAuthor {
    id: string; // UUID
    first_name: string;
    last_name: string;
}

export interface Article {
    author: ArticleAuthor;
    title: string;
    content: string;
    slug: string;
    favorites_count: number;
    is_favorite: boolean;
    created_at: string;
    updated_at: string;
}

export interface ArticleCreatePayload {
    title: string;
    content: string;
}

export interface ArticleUpdatePayload {
    title: string;
    content: string;
}

// Lecture publique — pas besoin de token
export async function getArticles(): Promise<Article[]> {
    const response = await publicApi.get<Article[]>('/articles/');
    return response.data;
}

export async function getArticle(slug: string): Promise<Article> {
    const response = await publicApi.get<Article>(`/articles/${slug}/`);
    return response.data;
}

// Écriture protégée — token ajouté automatiquement par l'intercepteur
export async function createArticle(payload: ArticleCreatePayload): Promise<Article> {
    const response = await api.post<Article>('/articles/', payload);
    return response.data;
}

// Modification protégée — seul le propriétaire peut modifier
export async function updateArticle(slug: string, payload: ArticleUpdatePayload): Promise<Article> {
    const response = await api.patch<Article>(`/articles/${slug}/`, payload);
    return response.data;
}

// Suppression protégée — seul le propriétaire peut supprimer
export async function deleteArticle(slug: string): Promise<void> {
    await api.delete(`/articles/${slug}/`);
}