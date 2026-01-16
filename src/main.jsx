import React from 'react'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Configuration des routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // Route par défaut (/)
        element: <Home />, // Composant Home
      },
      {
        path: "contact", // Route /contact
        element: <Contact />, // Composant Contact
      },
      {
        path: "login", // Route /login
        element: <Login />, // Coposant Login
      },
      {
        path: "forgot-password", // Route /forgot-password
        element: <ForgotPassword />,  // Composant ForgotPassword
      },
      {
        path: "register", // Route /register
        element: <Register />, // Composant Register
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
