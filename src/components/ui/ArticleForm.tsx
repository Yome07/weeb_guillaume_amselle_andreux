import { FormEvent } from 'react';
import Input from './Input';
import Textarea from './Textarea';
import Button from './Button';

interface ArticleFormProps {
    title: string;
    content: string;
    errors: Record<string, string>;
    apiError: string | null;
    isLoading: boolean;
    submitLabel: string;
    onTitleChange: (value: string) => void;
    onContentChange: (value: string) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onCancel?: () => void;
}

/**
 * Composant formulaire réutilisable pour la création et la modification d'un article
 * Utilisé dans ArticleCreate et ArticleDetail (mode édition)
 */
function ArticleForm({
                         title,
                         content,
                         errors,
                         apiError,
                         isLoading,
                         submitLabel,
                         onTitleChange,
                         onContentChange,
                         onSubmit,
                         onCancel,
                     }: ArticleFormProps) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6 lg:gap-8">

            {/* Titre de l'article */}
            <div>
                <Input
                    label="Titre"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
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
                    onChange={(e) => onContentChange(e.target.value)}
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

            {/* Boutons */}
            <div className="flex justify-end gap-4 mt-4">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="text-white hover:text-purple-light text-sm font-medium transition disabled:opacity-50"
                    >
                        Annuler
                    </button>
                )}
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Sauvegarde...' : submitLabel}
                </Button>
            </div>
        </form>
    );
}

export default ArticleForm;