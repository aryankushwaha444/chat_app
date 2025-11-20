import React, { createContext, useEffect, useState } from "react";
import api from "../api";

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login: (token: string, user: IUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      // try fetch profile
      api
        .get("/users/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  const login = (tok: string, u: IUser) => {
    setToken(tok);
    setUser(u);
    localStorage.setItem("token", tok);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
