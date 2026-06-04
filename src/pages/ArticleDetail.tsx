import { useParams, Link } from 'react-router-dom';
import { useArticleDetail } from '../hooks/useArticleDetail';

/**
 * Page détail d'un article (publique)
 * Affiche le contenu complet d'un article avec auteur et dates
 */
function ArticleDetail() {
    const { slug } = useParams<{ slug: string }>();
    const { article, isLoading, error } = useArticleDetail(slug ?? '');

    return (
        <>
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

            {/* Contenu de l'article */}
            {!isLoading && !error && article && (
                <div className="w-full max-w-4xl mx-auto p-8 lg:p-12 border-2 border-purple-light rounded-3xl bg-purple-dark">

                    {/* Titre */}
                    <h1 className="text-white font-extrabold text-3xl lg:text-5xl mb-4">
                        {article.title}
                    </h1>

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