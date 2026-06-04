import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useArticleForm } from '../hooks/useArticleForm';
//import { FormEvent } from 'react';
import Textarea from "../components/ui/Textarea.tsx";

/**
 * Page de création d'un article (authentifié uniquement)
 * Formulaire avec validation : titre et contenu requis
 */
function ArticleCreate() {
    const {
        title,
        content,
        errors,
        apiError,
        isLoading,
        setTitle,
        setContent,
        handleSubmit,
    } = useArticleForm();

    return (
        <>
            {/* Titre */}
            <div className="text-center mb-8 lg:mb-12 max-w-4xl mx-auto">
                <h1 className="text-white font-extrabold text-4xl mb-6 lg:text-6xl">
                    Nouvel article
                </h1>
                <p className="text-white lg:text-lg">
                    Partagez vos idées avec la communauté.
                </p>
            </div>

            {/* Formulaire */}
            <div className="w-full max-w-sm lg:max-w-2xl p-8 lg:p-12 border-2 border-purple-light rounded-3xl bg-purple-dark mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:gap-8">

                    {/* Titre de l'article */}
                    <div>
                        <Input
                            label="Titre"
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-2">{errors.title}</p>
                        )}
                    </div>

                    {/* Contenu */}
                    <div>
                        <Textarea
                            label="Contenu"
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={10}
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm mt-2">{errors.content}</p>
                        )}
                    </div>

                    {/* Erreur API */}
                    {apiError && (
                        <p className="text-red-400 text-sm text-center">{apiError}</p>
                    )}

                    {/* Bouton */}
                    <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                        {isLoading ? 'Publication...' : 'Publier l\'article'}
                    </Button>
                </form>
            </div>
        </>
    );
}

export default ArticleCreate;