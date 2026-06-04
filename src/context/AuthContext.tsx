import { createContext, useReducer, useContext, ReactNode } from 'react';

// Types
interface AuthUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
}

interface AuthState {
    user: AuthUser | null;
}

type AuthAction =
    | { type: 'LOGIN'; payload: AuthUser }
    | { type: 'LOGOUT' };

interface AuthContextType {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}

// Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
}

// Décoder le token JWT depuis sessionStorage pour initialiser l'état
function getUserFromToken(): AuthUser | null {
    const token = sessionStorage.getItem('access_token');
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            id: payload.user_id,
            first_name: payload.first_name,
            last_name: payload.last_name,
            email: payload.email,
            is_staff: payload.is_staff,
            is_active: payload.is_active,
        };
    } catch {
        return null;
    }
}

// Créer le contexte
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Provider d'authentification
 * Gère l'état de connexion et les infos utilisateur
 * Initialise depuis le token JWT existant en sessionStorage
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, {
        user: getUserFromToken(), // Restaure la session si un token existe
    });

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook personnalisé pour consommer le contexte d'authentification
 * @returns { state, dispatch }
 */
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
}