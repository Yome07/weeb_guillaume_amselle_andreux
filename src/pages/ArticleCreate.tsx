import { useArticleForm } from '../hooks/useArticleForm';
//import { FormEvent } from 'react';
import ArticleForm from "../components/ui/ArticleForm.tsx";

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
                <ArticleForm
                    title={title}
                    content={content}
                    errors={errors}
                    apiError={apiError}
                    isLoading={isLoading}
                    submitLabel="Publier l'article"
                    onTitleChange={setTitle}
                    onContentChange={setContent}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    );
}

export default ArticleCreate;