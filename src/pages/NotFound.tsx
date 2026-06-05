import { Link } from 'react-router-dom';

/**
 *
 * Page 404 - Not Found
 *
 */
function NotFound() {
    return (
        <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-white font-extrabold text-6xl lg:text-8xl mb-6">404</h1>
            <p className="text-white text-xl mb-8">Cette page n'existe pas.</p>
            <Link to="/" className="text-purple-light hover:underline">
                Retour à l'accueil
            </Link>
        </div>
    );
}

export default NotFound;