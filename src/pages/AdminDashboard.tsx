import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdminArticles } from '../hooks/useAdminArticles';
import { useAdminUsers } from '../hooks/useAdminUsers';
import ConfirmModal from '../components/ui/ConfirmModal';

type AdminTab = 'articles' | 'users';

/**
 * Dashboard d'administration
 * Accessible uniquement aux superusers (is_staff = true)
 */
function AdminDashboard() {
    const { state } = useAuth();
    const [activeTab, setActiveTab] = useState<AdminTab>('articles');

    const {
        articles,
        loadingArticles,
        articlesError,
        deletingSlug,
        articleToDelete,
        articleActionMessage,
        setArticleToDelete,
        handleDeleteArticle,
    } = useAdminArticles();

    const {
        users,
        loadingUsers,
        usersError,
        updatingUserId,
        userActionMessage,
        pendingUsers,
        handleToggleUserActive,
        handleToggleUserStaff,
    } = useAdminUsers();

    const tabClass = (tab: AdminTab) =>
        `px-6 py-2 rounded-xl text-sm font-medium transition ${
            activeTab === tab
                ? 'bg-purple-600 text-white'
                : 'border-2 border-purple-light text-white hover:bg-purple-light hover:text-blue-gray-900'
        }`;

    return (
        <>
            {/* Modale confirmation suppression article */}
            <ConfirmModal
                isOpen={!!articleToDelete}
                title="Supprimer l'article"
                message="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
                confirmLabel="Supprimer"
                cancelLabel="Annuler"
                onConfirm={handleDeleteArticle}
                onCancel={() => setArticleToDelete(null)}
            />

            {/* En-tête */}
            <div className="text-center mb-8 lg:mb-12 max-w-4xl mx-auto">
                <h1 className="text-white font-extrabold text-4xl mb-6 lg:text-6xl">
                    Administration
                </h1>
                <p className="text-white lg:text-lg">
                    Bienvenue {state.user?.first_name} — gestion des articles et des utilisateurs.
                </p>
            </div>

            {/* Statistiques */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-6 border-2 border-purple-light rounded-3xl bg-purple-dark text-center">
                    <p className="text-gray-400 text-sm mb-2">Articles</p>
                    <p className="text-white font-extrabold text-4xl">{articles.length}</p>
                </div>
                <div className="p-6 border-2 border-purple-light rounded-3xl bg-purple-dark text-center">
                    <p className="text-gray-400 text-sm mb-2">Utilisateurs</p>
                    <p className="text-white font-extrabold text-4xl">{users.length}</p>
                </div>
                <div className="p-6 border-2 border-purple-light rounded-3xl bg-purple-dark text-center">
                    <p className="text-gray-400 text-sm mb-2">En attente</p>
                    <p className="text-yellow-400 font-extrabold text-4xl">{pendingUsers.length}</p>
                </div>
            </div>

            {/* Onglets */}
            <div className="max-w-4xl mx-auto flex gap-4 mb-8">
                <button className={tabClass('articles')} onClick={() => setActiveTab('articles')}>
                    Articles
                </button>
                <button className={tabClass('users')} onClick={() => setActiveTab('users')}>
                    Utilisateurs
                    {pendingUsers.length > 0 && (
                        <span className="ml-2 bg-yellow-400 text-blue-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                            {pendingUsers.length}
                        </span>
                    )}
                </button>
            </div>

            {/* ===== ONGLET ARTICLES ===== */}
            {activeTab === 'articles' && (
                <div className="max-w-4xl mx-auto flex flex-col gap-4">
                    {articleActionMessage && (
                        <p className="text-green-400 text-sm text-center">{articleActionMessage}</p>
                    )}
                    {articlesError && (
                        <p className="text-red-400 text-center">{articlesError}</p>
                    )}
                    {loadingArticles && (
                        <p className="text-white text-center">Chargement des articles...</p>
                    )}
                    {!loadingArticles && articles.length === 0 && (
                        <p className="text-white text-center">Aucun article.</p>
                    )}
                    {articles.map((article) => (
                        <div
                            key={article.slug}
                            className="p-6 border-2 border-purple-light rounded-3xl bg-purple-dark"
                        >
                            <div className="flex justify-between items-start gap-4 mb-2">
                                <h2 className="text-white font-bold text-lg">{article.title}</h2>
                                <div className="flex items-center gap-4 shrink-0">
                                    <Link
                                        to={`/blog/${article.slug}`}
                                        className="text-purple-light hover:text-white text-sm transition"
                                    >
                                        Voir
                                    </Link>
                                    <button
                                        onClick={() => setArticleToDelete(article.slug)}
                                        disabled={deletingSlug === article.slug}
                                        className="text-red-400 hover:text-red-300 text-sm transition disabled:opacity-50"
                                    >
                                        {deletingSlug === article.slug ? 'Suppression...' : 'Supprimer'}
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">
                                Par {article.author.first_name} {article.author.last_name} —{' '}
                                {new Date(article.created_at).toLocaleDateString('fr-FR', {
                                    year: 'numeric', month: 'long', day: 'numeric',
                                })}
                            </p>
                            <p className="text-gray-300 line-clamp-2">{article.content}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* ===== ONGLET UTILISATEURS ===== */}
            {activeTab === 'users' && (
                <div className="max-w-4xl mx-auto flex flex-col gap-4">
                    {userActionMessage && (
                        <p className="text-green-400 text-sm text-center">{userActionMessage}</p>
                    )}
                    {usersError && (
                        <p className="text-red-400 text-center">{usersError}</p>
                    )}
                    {loadingUsers && (
                        <p className="text-white text-center">Chargement des utilisateurs...</p>
                    )}
                    {!loadingUsers && users.length === 0 && (
                        <p className="text-white text-center">Aucun utilisateur.</p>
                    )}
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="p-6 border-2 border-purple-light rounded-3xl bg-purple-dark"
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h2 className="text-white font-bold text-lg">
                                            {user.first_name} {user.last_name}
                                        </h2>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                            user.is_active
                                                ? 'bg-green-400/20 text-green-400'
                                                : 'bg-yellow-400/20 text-yellow-400'
                                        }`}>
                                            {user.is_active ? 'Validé' : 'En attente'}
                                        </span>
                                        {user.is_staff && (
                                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-400/20 text-purple-300">
                                                Admin
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-400 text-sm">{user.email}</p>
                                    <p className="text-gray-500 text-xs mt-1">
                                        Inscrit le {new Date(user.date_joined).toLocaleDateString('fr-FR', {
                                        year: 'numeric', month: 'long', day: 'numeric',
                                    })}
                                    </p>
                                </div>

                                {user.id !== state.user?.id && (
                                    <div className="flex gap-3 shrink-0">
                                        <button
                                            onClick={() => handleToggleUserActive(user)}
                                            disabled={updatingUserId === user.id}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition disabled:opacity-50 ${
                                                user.is_active
                                                    ? 'border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white'
                                                    : 'border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white'
                                            }`}
                                        >
                                            {updatingUserId === user.id ? '...' : user.is_active ? 'Désactiver' : 'Valider'}
                                        </button>
                                        <button
                                            onClick={() => handleToggleUserStaff(user)}
                                            disabled={updatingUserId === user.id || !user.is_active}
                                            title={!user.is_active ? 'L\'utilisateur doit être validé avant d\'être promu' : ''}
                                            className="px-4 py-2 rounded-xl text-sm font-medium border-2 border-purple-light text-white hover:bg-purple-light hover:text-blue-gray-900 transition disabled:opacity-50"
                                        >
                                            {updatingUserId === user.id ? '...' : user.is_staff ? 'Rétrograder' : 'Promouvoir'}
                                        </button>
                                    </div>
                                )}

                                {user.id === state.user?.id && (
                                    <span className="text-gray-500 text-xs italic">Votre compte</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default AdminDashboard;