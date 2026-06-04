import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { state } = useAuth();
    return state.user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;