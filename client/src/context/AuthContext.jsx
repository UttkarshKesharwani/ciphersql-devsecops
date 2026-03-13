import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");
            if (savedUser && savedUser !== "undefined") {
                return JSON.parse(savedUser);
            }
        } catch (error) {
            console.error("Failed to parse user from local storage", error);
        }
        return null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    )
}