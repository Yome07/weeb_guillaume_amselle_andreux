import {ReactNode} from "react";
import {useAuth} from "./context/AuthContext.tsx";
import {Navigate} from "react-router-dom";

function PublicOnlyRoute({ children }: { children: ReactNode }) {
    const { state } = useAuth();

    // Attend que la restauration de session soit terminée
    if (state.isLoading) return <p role="status">Chargement…</p>;

    // Un utilisateur connecté n’a pas beoin de s’inscrire ou de se connecter
    if (state.user?.is_active) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default PublicOnlyRoute