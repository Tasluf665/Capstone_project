import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/auth/check-auth`,
                    { withCredentials: true }
                );
                setAuthenticated(response.data.authenticated);
            } catch (err) {
                console.error('Error checking authentication:', err);
                setApiError(true);
            } finally {
                setLoading(false);
            }
        };
        checkAuthentication();
    }, []);

    const handleLogin = () => {
        window.location.href = `${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/auth/atlassian`;
    };

    const handleLogout = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/auth/logout`, { withCredentials: true });
            setAuthenticated(false);
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    return { authenticated, loading, apiError, handleLogin, handleLogout };
};

export default useAuth;