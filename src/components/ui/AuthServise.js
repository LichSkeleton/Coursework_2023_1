import { jwtDecode as jwt_decode } from 'jwt-decode';

class AuthService {
    constructor() {
        this.token = sessionStorage.getItem('jwtToken') || null;
    }

    getJwtToken() {
        return this.token;
    }

    getEmail(token) {
        if (typeof token !== 'string') {
            console.error('Invalid token specified: must be a string');
            return null;
        }
    
        try {
            const decodedToken = jwt_decode(token);
            return decodedToken.email || null;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    getActivePackage(token) {
        if (typeof token !== 'string') {
            console.error('Invalid token specified: must be a string');
            return null;
        }
    
        try {
            const decodedToken = jwt_decode(token);
            return decodedToken.active_package_id;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    getJwtTokenRole(token) {
        if (typeof token !== 'string') {
            console.error('Invalid token specified: must be a string');
            return null;
        }
    
        try {
            const decodedToken = jwt_decode(token);
            return decodedToken.role || null;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    login(token) {
        this.token = token;
        // Save the token in sessionStorage
        sessionStorage.setItem('jwtToken', token);
    }

    logout() {
        this.token = null;
        // Remove the token from sessionStorage
        sessionStorage.removeItem('jwtToken');
    }

    isLoggedIn() {
        return !!this.token && !this.isTokenExpired(this.token);
    }

    isTokenExpired(token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            // Token has expired
            sessionStorage.removeItem('jwtToken');
            return true;
        }

        return false;
    }
}

export default new AuthService();
