"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { api } from "../lib/api";

interface User {
    id: string;
    name: string;
    email: string;
    timezone: string;
}

interface AuthContextValue {
    user: User | null;
    loading: boolean;
    login: (
        email: string,
        password: string
    ) => Promise<void>;
    register: (
        name: string,
        email: string,
        password: string,
        timezone?: string
    ) => Promise<void>;
    logout: () => void;
}

interface AuthResponse {
    token: string;
    user: User;
}

const AuthContext =
    createContext<AuthContextValue | undefined>(
        undefined
    );

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const restoreSession =
            async () => {
                const token =
                    localStorage.getItem(
                        "token"
                    );

                if (!token) {
                    setLoading(false);
                    return;
                }

                try {
                    const currentUser =
                        await api.get<User>(
                            "/auth/me",
                            token
                        );

                    setUser(currentUser);
                } catch {
                    localStorage.removeItem(
                        "token"
                    );

                    setUser(null);
                } finally {
                    setLoading(false);
                }
            };

        restoreSession();
    }, []);

    const login = async (
        email: string,
        password: string
    ) => {
        const data =
            await api.post<AuthResponse>(
                "/auth/login",
                {
                    email,
                    password,
                }
            );

        localStorage.setItem(
            "token",
            data.token
        );

        setUser(data.user);
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        timezone = "Africa/Nairobi"
    ) => {
        await api.post<AuthResponse>(
            "/auth/register",
            {
                name,
                email,
                password,
                timezone,
            }
        );
    };

    const logout = () => {
        localStorage.removeItem(
            "token"
        );

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within an AuthProvider"
        );
    }

    return context;
}