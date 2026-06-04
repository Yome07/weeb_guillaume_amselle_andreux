import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const token = sessionStorage.getItem('access_token');
    return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;