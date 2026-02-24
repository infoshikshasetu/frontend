/* =================================
   SHIKSHASETU API HANDLER
================================= */

class ApiService {

    static async request(endpoint, method = "GET", data = null, authRequired = false) {

        const url = `${CONFIG.API_BASE_URL}${endpoint}`;

        const headers = { ...CONFIG.HEADERS };

        if (authRequired) {
            const token = localStorage.getItem(CONFIG.TOKEN_KEY);
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
        }

        const options = {
            method,
            headers
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), CONFIG.REQUEST_TIMEOUT);
            options.signal = controller.signal;

            const response = await fetch(url, options);
            clearTimeout(timeoutId);

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Something went wrong");
            }

            return result;

        } catch (error) {
            console.error("API Error:", error.message);
            throw error;
        }
    }

    static get(endpoint, auth = false) {
        return this.request(endpoint, "GET", null, auth);
    }

    static post(endpoint, data, auth = false) {
        return this.request(endpoint, "POST", data, auth);
    }

    static put(endpoint, data, auth = false) {
        return this.request(endpoint, "PUT", data, auth);
    }

    static delete(endpoint, auth = false) {
        return this.request(endpoint, "DELETE", null, auth);
    }
}