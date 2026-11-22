import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

/**
 * Route protégée réservée aux superusers (is_staff = true)
 * Redirige vers / si l'utilisateur n'est pas admin
 */
function PrivateAdminRoute({ children }: { children: React.ReactNode }) {
    const { state } = useAuth();

    if (state.isLoading) return <p role="status">Chargement...</p>;
    if (!state.user) return <Navigate to="/login" />;
    if (!state.user.is_active) return <Navigate to="/login" replace />;

    return children;
}

export default PrivateAdminRoute;