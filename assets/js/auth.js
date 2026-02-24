/* =================================
   SHIKSHASETU AUTH SYSTEM
================================= */

class AuthService {

    static async login(endpoint, email, password) {
        try {
            const response = await ApiService.post(endpoint, {
                email,
                password
            });

            localStorage.setItem(CONFIG.TOKEN_KEY, response.token);
            localStorage.setItem(CONFIG.USER_KEY, JSON.stringify(response.user));

            return response;

        } catch (error) {
            throw error;
        }
    }

    static logout() {
        localStorage.removeItem(CONFIG.TOKEN_KEY);
        localStorage.removeItem(CONFIG.USER_KEY);
        window.location.href = "/index.html";
    }

    static getToken() {
        return localStorage.getItem(CONFIG.TOKEN_KEY);
    }

    static getUser() {
        const user = localStorage.getItem(CONFIG.USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    static isAuthenticated() {
        return !!this.getToken();
    }

    static protectPage(redirectTo = "/index.html") {
        if (!this.isAuthenticated()) {
            window.location.href = redirectTo;
        }
    }

    // ✅ Role-based access control
    static requireRole(role, redirect = "/index.html") {
        const user = this.getUser();
        if (!user || user.role !== role) {
            window.location.href = redirect;
        }
    }
}