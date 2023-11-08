// useTokenCheck.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthServise';

function useTokenCheck() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = AuthService.getJwtToken();

        if (token && AuthService.isTokenExpired(token)) {
            navigate('/signin');
            window.location.reload();
        }
    }, [navigate]);

    return AuthService.getJwtToken();
}

export default useTokenCheck;
