/* =================================
   SHIKSHASETU CONFIGURATION
================================= */

const CONFIG = {
    API_BASE_URL: "https://api.shikshasetu.online",
    TOKEN_KEY: "shikshasetu_token",
    USER_KEY: "shikshasetu_user",

    REQUEST_TIMEOUT: 15000,

    HEADERS: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};

/* Freeze config for security */
Object.freeze(CONFIG);