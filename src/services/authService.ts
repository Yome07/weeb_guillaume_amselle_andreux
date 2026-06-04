import { publicApi } from './api';

interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    access: string;
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
    const response = await publicApi.post('/users/register/', djangoPayload);
    sessionStorage.setItem('access_token', response.data.access);
}

export async function logout(): Promise<void> {
    sessionStorage.removeItem('access_token');
}