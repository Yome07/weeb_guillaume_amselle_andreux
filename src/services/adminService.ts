import api from './api';

export interface AdminUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
}

// Lister tous les utilisateurs
export async function getAdminUsers(): Promise<AdminUser[]> {
    const response = await api.get<AdminUser[]>('/api/admin/users/');
    return response.data;
}

// Mettre à jour un utilisateur (valider, désactiver, etc.)
export async function updateAdminUser(
    userId: string,
    payload: Partial<Pick<AdminUser, 'is_active' | 'is_staff'>>
): Promise<AdminUser> {
    const response = await api.patch<AdminUser>(`/api/admin/users/${userId}/`, payload);
    return response.data;
}