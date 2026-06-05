import { useState, useEffect, useMemo } from 'react';
import { getAdminUsers, updateAdminUser, type AdminUser } from '../services/adminService';

interface UseAdminUsersReturn {
    users: AdminUser[];
    loadingUsers: boolean;
    usersError: string | null;
    updatingUserId: string | null;
    userActionMessage: string | null;
    pendingUsers: AdminUser[];
    handleToggleUserActive: (user: AdminUser) => Promise<void>;
    handleToggleUserStaff: (user: AdminUser) => Promise<void>;
}

/**
 * Hook pour gérer les utilisateurs dans le dashboard admin
 * Chargement, validation, désactivation, promotion
 */
export function useAdminUsers(): UseAdminUsersReturn {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
    const [usersError, setUsersError] = useState<string | null>(null);
    const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
    const [userActionMessage, setUserActionMessage] = useState<string | null>(null);

    // Chargement des utilisateurs à l'initialisation du composant
    useEffect(() => {
        let cancelled = false;

        getAdminUsers()
            .then((data) => { if (!cancelled) setUsers(data); })
            .catch(() => { if (!cancelled) setUsersError('Impossible de charger les utilisateurs.'); })
            .finally(() => { if (!cancelled) setLoadingUsers(false); });

        return () => { cancelled = true; };
    }, []);

    const pendingUsers = useMemo(() => users.filter((u) => !u.is_active), [users]);

    // Valider ou désactiver un utilisateur et gérer les états de mise à jour et les messages d'action
    const handleToggleUserActive = async (user: AdminUser): Promise<void> => {
        setUpdatingUserId(user.id);
        setUserActionMessage(null);
        try {
            const updated = await updateAdminUser(user.id, { is_active: !user.is_active });
            setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, ...updated } : u));
            setUserActionMessage(user.is_active ? 'Utilisateur désactivé.' : 'Utilisateur validé.');
        } catch (err: any) {
            const message = err?.response?.data?.message;
            setUserActionMessage(message || 'Erreur lors de la modification.');
        } finally {
            setUpdatingUserId(null);
        }
    };

    // Promouvoir ou rétrograder un utilisateur et gérer les états de mise à jour et les messages d'action
    const handleToggleUserStaff = async (user: AdminUser): Promise<void> => {
        setUpdatingUserId(user.id);
        setUserActionMessage(null);
        try {
            const updated = await updateAdminUser(user.id, { is_staff: !user.is_staff });
            setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, ...updated } : u));
            setUserActionMessage(user.is_staff ? 'Droits admin retirés.' : 'Droits admin accordés.');
        } catch (err: any) {
            const message = err?.response?.data?.message;
            setUserActionMessage(message || 'Erreur lors de la modification.');
        } finally {
            setUpdatingUserId(null);
        }
    };

    return {
        users,
        loadingUsers,
        usersError,
        updatingUserId,
        userActionMessage,
        pendingUsers,
        handleToggleUserActive,
        handleToggleUserStaff,
    };
}