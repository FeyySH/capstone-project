import { createContext, useEffect, useState } from "react";

// Simulating an API endpoint for token-based authentication
const loginEndpoint = "/api/login";
const logoutEndpoint = "/api/logout";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const response = await fetch("/api/checkToken");
                if (response.ok) {
                    const user = await response.json();
                    setCurrentUser(user);
                }
            } catch (error) {
                console.error("Error checking token:", error);
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await fetch(loginEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const user = await response.json();
                setCurrentUser(user);
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const logout = async () => {
        try {
            await fetch(logoutEndpoint);
            setCurrentUser(null);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const value = { currentUser, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
