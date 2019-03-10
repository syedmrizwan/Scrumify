export const loginService = {
    login
}

function login(payload) {
    let config = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: payload.email,
            password: payload.password
        })
    };
    return fetch("http:localhost:8080/login", config);
}