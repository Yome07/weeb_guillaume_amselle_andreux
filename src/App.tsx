import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import ArticleCreate from './pages/ArticleCreate';
import PrivateRoute from './PrivateRoute';
import './App.css';
import ResetPassword from "./pages/ResetPassword.tsx";
import PrivateAdminRoute from "./PrivateAdminRoute.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="register" element={<Register />} />
                <Route path="blog" element={<ArticleList />} />
                <Route
                    path="blog/new"
                    element={
                        <PrivateRoute>
                            <ArticleCreate />
                        </PrivateRoute>
                    }
                />
                <Route
                path="admin"
                element={
                <PrivateAdminRoute>
                    <AdminDashboard />
                </PrivateAdminRoute>
            }
                />
                <Route path="blog/:slug" element={<ArticleDetail />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;