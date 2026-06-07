import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { state } = useAuth();
    if (!state.user) return <Navigate to="/login" />;
    if (!state.user.is_active) return <Navigate to="/login" />;
    return children;
}

export default PrivateRoute;