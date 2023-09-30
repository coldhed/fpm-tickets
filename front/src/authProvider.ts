import { AuthProvider } from 'react-admin';

const authProvider : AuthProvider = {
    // stores a function that does the login
    login: async ({ username, password }) => {
        const request = new Request("http://127.0.0.1:4000/Usuarios/login", {
            method: "POST",
            body: JSON.stringify({ "correo": username, "contrasena": password }),
            headers: new Headers({ "Content-Type": "application/json" }),
        });

        try {
            const response = await fetch(request);

            if (response.status == 200) {
                let body = await response.json();

                localStorage.setItem("auth", body.token)
                localStorage.setItem("identity", JSON.stringify({ "id": body.id, "fullName": body.fullName, "rol": body.rol }))
                return Promise.resolve();
            } else {
                return Promise.reject();
            }
        } catch {
            throw new Error("Network error");
        }
    },

    logout: () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("identity");
        return Promise.resolve();
    },

    // helps react admin check if we are auhtenticated
    checkAuth: () => {
        return localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
    },

    // checks if an error is due to authentication
    checkError: (error) => {
        const status = error.status;

        if (status == 401 || status == 403) {
            localStorage.removeItem("auth");
            localStorage.removeItem("identity");
            return Promise.reject();
        }

        return Promise.resolve();
    },

    getIdentity: () => {
        try {
            const identity = localStorage.getItem("identity");
            
            if (!identity) return Promise.reject();

            return Promise.resolve(JSON.parse(identity));
        } catch {
            return Promise.reject();
        }
    },

    getPermissions: () => {
        try {
            const identity = localStorage.getItem("identity");

            if (!identity) return Promise.reject();

            const role = JSON.parse(identity).rol;

            return role ? Promise.resolve(role) : Promise.reject();
        } catch {
            return Promise.reject();
        }
    },
};

export default authProvider;