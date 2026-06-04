import { useParams, Link } from 'react-router-dom';
import { useArticleDetail } from '../hooks/useArticleDetail';
import {useAuth} from "../context/AuthContext.tsx";
import {useState} from "react";
import {deleteArticle} from "../services/blogService.ts";
import ConfirmModal from '../components/ui/ConfirmModal';

/**
 * Page détail d'un article (publique)
 * Affiche le contenu complet d'un article avec auteur et dates
 */
function ArticleDetail() {
    const { slug } = useParams<{ slug: string }>();
    const { article, isLoading, error } = useArticleDetail(slug ?? '');
    const { state } = useAuth();

    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    // Vérifier si l'utilisateur connecté est l'auteur de l'article
    const isAuthor = state.user?.id === article?.author.id;

    console.log('user email:', state.user?.email);
    console.log('author email:', article?.author.email);
    console.log('isAuthor:', isAuthor);

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

    return (
        <>
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
            {!isLoading && !error && article && !successMessage && (
                <div className="w-full max-w-4xl mx-auto p-8 lg:p-12 border-2 border-purple-light rounded-3xl bg-purple-dark">

                    {/* Titre */}
                    <h1 className="text-white font-extrabold text-3xl lg:text-5xl mb-4">
                        {article.title}
                    </h1>

                    {isAuthor && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            disabled={isDeleting}
                            className="shrink-0 text-red-400 hover:text-red-300 text-sm font-medium transition disabled:opacity-50"
                        >
                            Supprimer
                        </button>
                    )}

                    {/* Méta : auteur + dates */}
                    <div className="flex flex-col gap-1 mb-8 text-sm text-gray-400">
                        <p>
                            Par{' '}
                            <span className="text-purple-light font-medium">
                {article.author.first_name} {article.author.last_name}
              </span>
                        </p>
                        <p>
                            Publié le{' '}
                            {new Date(article.created_at).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                            {article.updated_at !== article.created_at && (
                                <span>
                  {' '}· Mis à jour le{' '}
                                    {new Date(article.updated_at).toLocaleDateString('fr-FR', {
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
                        {article.content}
                    </div>
                </div>
            )}
        </>
    );
}

export default ArticleDetail;