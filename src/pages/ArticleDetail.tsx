import { useParams, Link } from 'react-router-dom';
import { useArticleDetail } from '../hooks/useArticleDetail';
import {useAuth} from "../context/AuthContext.tsx";
import {FormEvent, useState} from "react";
import {deleteArticle, updateArticle} from "../services/blogService.ts";
import ConfirmModal from '../components/ui/ConfirmModal';
import ArticleForm from "../components/ui/ArticleForm.tsx";

/**
 * Page détail d'un article (publique)
 * Affiche le contenu complet d'un article avec auteur et dates
 */
function ArticleDetail() {
    const { slug } = useParams<{ slug: string }>();
    const { article, isLoading, error } = useArticleDetail(slug ?? '');
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
    const [currentArticle, setCurrentArticle] = useState(article);

    // Synchroniser currentArticle avec article au chargement
    if (article && !currentArticle) {
        setCurrentArticle(article);
    }

    // Vérifier si l'utilisateur connecté est l'auteur de l'article
    const isAuthor = state.user?.id === article?.author.id;

    // Passer en mode édition
    const handleEditStart = () => {
        const current = currentArticle ?? article;
        if (!current) return;
        setEditTitle(current.title);
        setEditContent(current.content);
        setEditError(null);
        setEditErrors({});
        setIsEditing(true);
    };

    // Sauvegarder les modifications
    const handleEditSave = async (e: FormEvent<HTMLFormElement>) => {
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
    const handleDelete = async () => {
        setIsModalOpen(false);
        setIsDeleting(true);
        setDeleteError(null);
        try {
            await deleteArticle(slug!);
            setSuccessMessage('L\'article a été supprimé avec succès.');
        } catch {
            setDeleteError('Une erreur est survenue lors de la suppression.');
        } finally {
            setIsDeleting(false);
        }
    };

    const displayArticle = currentArticle ?? article;

    return (
        <>
            {/* Modale de confirmation suppression */}
            <ConfirmModal
                isOpen={isModalOpen}
                title="Supprimer l'article"
                message="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
                confirmLabel="Supprimer"
                cancelLabel="Annuler"
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />

            {/* Lien retour */}
            <div className="max-w-4xl mx-auto mb-6">
                <Link to="/blog" className="text-purple-light hover:underline text-sm">
                    ← Retour aux articles
                </Link>
            </div>

            {/* État chargement */}
            {isLoading && (
                <p className="text-white text-center">Chargement de l'article...</p>
            )}

            {/* Erreur */}
            {error && (
                <p className="text-red-400 text-center">{error}</p>
            )}

            {/* Message de succès suppression */}
            {successMessage && (
                <div className="w-full max-w-4xl mx-auto p-8 border-2 border-purple-light rounded-3xl bg-purple-dark text-center">
                    <p className="text-green-400 text-lg font-medium mb-6">✓ {successMessage}</p>
                    <Link to="/blog" className="text-purple-light hover:underline text-sm">
                        Retour aux articles
                    </Link>
                </div>
            )}

            {/* Contenu de l'article */}
            {!isLoading && !error && displayArticle && !successMessage && (
                <div className="w-full max-w-4xl mx-auto p-8 lg:p-12 border-2 border-purple-light rounded-3xl bg-purple-dark">

                    {isEditing ? (
                        /* ===== MODE ÉDITION ===== */
                        <ArticleForm
                            title={editTitle}
                            content={editContent}
                            errors={editErrors}
                            apiError={editError}
                            isLoading={isSaving}
                            submitLabel="Sauvegarder"
                            onTitleChange={setEditTitle}
                            onContentChange={setEditContent}
                            onSubmit={handleEditSave}
                            onCancel={() => setIsEditing(false)}
                        />
                    ) : (
                        /* ===== MODE LECTURE ===== */
                        <>
                            {/* En-tête : titre + boutons auteur */}
                            <div className="flex justify-between items-start mb-4 gap-4">
                                <h1 className="text-white font-extrabold text-3xl lg:text-5xl">
                                    {displayArticle.title}
                                </h1>
                                {isAuthor && (
                                    <div className="flex items-center gap-4 shrink-0">
                                        <button
                                            onClick={handleEditStart}
                                            className="text-purple-light hover:text-white text-sm font-medium transition"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            disabled={isDeleting}
                                            className="text-red-400 hover:text-red-300 text-sm font-medium transition disabled:opacity-50"
                                        >
                                            {isDeleting ? 'Suppression...' : 'Supprimer'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Méta : auteur + dates */}
                            <div className="flex flex-col gap-1 mb-8 text-sm text-gray-400">
                                <p>
                                    Par{' '}
                                    <span className="text-purple-light font-medium">
                                        {displayArticle.author.first_name} {displayArticle.author.last_name}
                                    </span>
                                </p>
                                <p>
                                    Publié le{' '}
                                    {new Date(displayArticle.created_at).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                    {displayArticle.updated_at !== displayArticle.created_at && (
                                        <span>
                                            {' '}· Mis à jour le{' '}
                                            {new Date(displayArticle.updated_at).toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    )}
                                </p>
                            </div>

                            {/* Erreur suppression */}
                            {deleteError && (
                                <p className="text-red-400 text-sm mb-4">{deleteError}</p>
                            )}

                            {/* Séparateur */}
                            <hr className="border-purple-light mb-8 opacity-30" />

                            {/* Contenu */}
                            <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                                {displayArticle.content}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default ArticleDetail;