import { useState, FormEvent } from 'react';
import { deleteArticle, updateArticle, Article } from '../services/blogService';
import { useAuth } from '../context/AuthContext';

interface UseArticleActionsProps {
    slug: string;
    article: Article | null;
}

interface UseArticleActionsReturn {
    // États suppression
    isDeleting: boolean;
    deleteError: string | null;
    successMessage: string | null;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    handleDelete: () => Promise<void>;

    // États édition
    isEditing: boolean;
    editTitle: string;
    editContent: string;
    isSaving: boolean;
    editError: string | null;
    editErrors: Record<string, string>;
    setEditTitle: (value: string) => void;
    setEditContent: (value: string) => void;
    setIsEditing: (value: boolean) => void;
    handleEditStart: () => void;
    handleEditSave: (e: FormEvent<HTMLFormElement>) => Promise<void>;

    // Article courant (mis à jour après édition)
    displayArticle: Article | null;
    isAuthor: boolean;
}

/**
 * Hook pour gérer les actions sur un article (édition et suppression)
 * Utilisé dans ArticleDetail
 */
export function useArticleActions({ slug, article }: UseArticleActionsProps): UseArticleActionsReturn {
    const { state } = useAuth();

    // États suppression
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // États édition
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>('');
    const [editContent, setEditContent] = useState<string>('');
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [editError, setEditError] = useState<string | null>(null);
    const [editErrors, setEditErrors] = useState<Record<string, string>>({});
    const [currentArticle, setCurrentArticle] = useState<Article | null>(article);

    // Synchroniser currentArticle avec article au chargement
    if (article && !currentArticle) {
        setCurrentArticle(article);
    }

    const displayArticle = currentArticle ?? article;

    // Vérifier si l'utilisateur connecté est l'auteur de l'article
    const isAuthor = state.user?.id === displayArticle?.author.id;

    // Passer en mode édition
    const handleEditStart = () => {
        if (!displayArticle) return;
        setEditTitle(displayArticle.title);
        setEditContent(displayArticle.content);
        setEditError(null);
        setEditErrors({});
        setIsEditing(true);
    };

    // Sauvegarder les modifications
    const handleEditSave = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!slug) return;

        const newErrors: Record<string, string> = {};
        if (!editTitle.trim()) newErrors.title = 'Le titre est requis.';
        if (!editContent.trim()) newErrors.content = 'Le contenu est requis.';

        if (Object.keys(newErrors).length > 0) {
            setEditErrors(newErrors);
            return;
        }

        setIsSaving(true);
        setEditError(null);
        try {
            const updated = await updateArticle(slug, {
                title: editTitle.trim(),
                content: editContent.trim(),
            });
            setCurrentArticle(updated);
            setIsEditing(false);
        } catch {
            setEditError('Une erreur est survenue lors de la sauvegarde.');
        } finally {
            setIsSaving(false);
        }
    };

    // Supprimer l'article
    const handleDelete = async (): Promise<void> => {
        setIsModalOpen(false);
        setIsDeleting(true);
        setDeleteError(null);
        try {
            await deleteArticle(slug);
            setSuccessMessage('L\'article a été supprimé avec succès.');
        } catch {
            setDeleteError('Une erreur est survenue lors de la suppression.');
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        isDeleting,
        deleteError,
        successMessage,
        isModalOpen,
        setIsModalOpen,
        handleDelete,
        isEditing,
        editTitle,
        editContent,
        isSaving,
        editError,
        editErrors,
        setEditTitle,
        setEditContent,
        setIsEditing,
        handleEditStart,
        handleEditSave,
        displayArticle,
        isAuthor,
    };
}