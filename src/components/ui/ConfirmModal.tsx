import Button from './Button';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * Composant modale de confirmation réutilisable
 * S'affiche par-dessus le contenu avec un overlay sombre
 */
function ConfirmModal({
                          isOpen,
                          title,
                          message,
                          confirmLabel = 'Confirmer',
                          cancelLabel = 'Annuler',
                          onConfirm,
                          onCancel,
                      }: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-50 bg-black/60"
                onClick={onCancel}
            />

            {/* Modale */}
            <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-8 border-2 border-purple-light rounded-3xl bg-purple-dark shadow-2xl">

                {/* Titre */}
                <h2 className="text-white font-bold text-xl mb-4">
                    {title}
                </h2>

                {/* Message */}
                <p className="text-gray-300 mb-8">
                    {message}
                </p>

                {/* Boutons */}
                <div className="flex justify-end gap-4">
                    <Button
                        variant="secondary"
                        onClick={onCancel}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={onConfirm}
                        className="bg-red-600 border-red-600 hover:bg-red-500 hover:border-red-500"
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ConfirmModal;