import api, { publicApi } from './api';

interface LoginPayload {
    email: string;
    password: string;
}

interface LoginUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
}

interface LoginResponse {
    access: string;
    user: LoginUser;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await publicApi.post<LoginResponse>('/users/login/', payload);
    sessionStorage.setItem('access_token', response.data.access);
    return response.data;
}

interface ProfileUpdateResponse {
    message: string;
    user: LoginUser;
}

export async function updateProfile(
    payload: Pick<LoginUser, 'first_name' | 'last_name'>
): Promise<LoginUser> {
    const response = await api.patch<ProfileUpdateResponse>('/users/', payload);
    return response.data.user;
}

interface ChangePasswordPayload {
    current_password: string;
    password: string;
    password_confirm: string;
}

export async function changePassword(
    payload: ChangePasswordPayload
): Promise<void> {
    await api.patch('/users/', payload);
}

interface RegisterPayload {
    email: string;
    password: string;
    password_confirm: string;
    firstname: string;
    lastname: string;
}

interface RegisterResponse {
    message: string;
}

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
    // Mapper les clés camelCase en snake_case pour Django
    const djangoPayload = {
        email: payload.email,
        password: payload.password,
        password_confirm: payload.password_confirm,
        first_name: payload.firstname,
        last_name: payload.lastname,
    };
    const response = await publicApi.post<RegisterResponse>('/users/register/', djangoPayload);

    return response.data;
}

export async function logout(): Promise<void> {
    try {
        await publicApi.post('/users/logout/', {});
    } catch {
        // On nettoie quand même la session locale même si le serveur échoue
    } finally {
        sessionStorage.removeItem('access_token');
    }
}

export async function requestPasswordReset(email: string): Promise<void> {
    await publicApi.post('/users/password-reset/request/', { email });
}
