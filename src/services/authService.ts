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

interface RegisterPayload {
    email: string;
    password: string;
    password_confirm: string;
    firstname: string;
    lastname: string;
}

export async function register(payload: RegisterPayload): Promise<void> {
    // Mapper les clés camelCase en snake_case pour Django
    const djangoPayload = {
        email: payload.email,
        password: payload.password,
        password_confirm: payload.password_confirm,
        first_name: payload.firstname,
        last_name: payload.lastname,
    };
    await publicApi.post('/users/register/', djangoPayload);
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

interface PasswordResetConfirmPayload {
    uidb64: string;
    token: string;
    password: string;
}

export async function confirmPasswordReset(payload: PasswordResetConfirmPayload): Promise<void> {
    await publicApi.post('/users/password-reset/confirm/', payload);
}