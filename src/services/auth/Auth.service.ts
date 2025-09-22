class AuthService {    
    static checkAuth(): boolean {
        if (typeof window === 'undefined') {
            return false;
        }

        const token = localStorage.getItem('token');
        if (! token) {
            return false;
        }
        return true;
    }

    static login(token: string): void {
        localStorage.setItem('token', token);
    }

    static logout(): void {
        localStorage.removeItem('token');
    }

    static getToken(): string | null {
        return localStorage.getItem('token');
    }
}
export default AuthService;
