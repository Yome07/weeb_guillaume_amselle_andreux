import { Link } from 'react-router-dom';
import { useArticleList } from '../hooks/useArticleList';

/**
 * Page liste des articles (publique)
 * Affiche tous les articles avec titre, auteur, date et extrait du contenu
 */
function ArticleList() {
    const { articles, isLoading, error } = useArticleList();

    return (
        <>
            {/* En-tête */}
            <div className="text-center mb-8 lg:mb-12 max-w-4xl mx-auto">
                <h1 className="text-white font-extrabold text-4xl mb-6 lg:text-6xl">
                    Le Blog
                </h1>
                <p className="text-white lg:text-lg">
                    Découvrez nos derniers articles.
                </p>
            </div>

            {/* Lien vers la création (visible uniquement si connecté) */}
            {sessionStorage.getItem('access_token') && (
                <div className="max-w-4xl mx-auto mb-8 flex justify-end">
                    <Link
                        to="/blog/new"
                        className="bg-purple-light text-white font-semibold px-6 py-2 rounded-xl hover:opacity-80 transition"
                    >
                        + Nouvel article
                    </Link>
                </div>
            )}

            {/* État chargement */}
            {isLoading && (
                <p className="text-white text-center">Chargement des articles...</p>
            )}

            {/* Erreur */}
            {error && (
                <p className="text-red-400 text-center">{error}</p>
            )}

            {/* Liste des articles */}
            {!isLoading && !error && (
                <div className="max-w-4xl mx-auto flex flex-col gap-6">
                    {articles.length === 0 && (
                        <p className="text-white text-center">Aucun article pour le moment.</p>
                    )}
                    {articles.map((article) => (
                        <Link
                            key={article.slug}
                            to={`/blog/${article.slug}`}
                            className="block w-full p-6 lg:p-8 border-2 border-purple-light rounded-3xl bg-purple-dark hover:opacity-80 transition"
                        >
                            <h2 className="text-white font-bold text-xl lg:text-2xl mb-2">
                                {article.title}
                            </h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Par {article.author.first_name} {article.author.last_name} —{' '}
                                {new Date(article.created_at).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                            <p className="text-gray-400 line-clamp-3">
                                {article.content}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}

export default ArticleList;