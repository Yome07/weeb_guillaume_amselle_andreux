import {
    createContext,
    useReducer,
    useContext,
    useEffect,
    type Dispatch,
    type ReactNode,
} from 'react';
import api from '../services/api';
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
    isLoading: boolean;
}
type AuthAction =
    | { type: 'LOGIN'; payload: AuthUser }
    | { type: 'LOGOUT' };
interface AuthContextType {
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
}
// Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload, isLoading: false };
        case 'LOGOUT':
            return { user: null, isLoading: false };
        default:
            return state;
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
        user: null,
        isLoading: true,
    });
    useEffect(() => {
        let cancelled = false;
        async function restoreSession(): Promise<void> {
            const accessToken = sessionStorage.getItem('access_token');
            if (!accessToken) {
                if (!cancelled) dispatch({ type: 'LOGOUT' });
                return;
            }
            try {
// L'intercepteur renouvelle automatiquement l'access token si
// celui actuellement stocké a expiré, puis rejoue cette requête.
                const response = await api.get<AuthUser>('/users/');
                if (!cancelled) {
                    dispatch({ type: 'LOGIN', payload: response.data });
                }
            } catch {
                sessionStorage.removeItem('access_token');
                if (!cancelled) dispatch({ type: 'LOGOUT' });
            }
        }
        restoreSession();
        return () => {
            cancelled = true;
        };
    }, []);
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
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
}