import React, { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "./authContext";

export const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
    } catch (err: any) {
      setErr(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Login</h2>
      <form onSubmit={submit} className="space-y-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border"
          type="password"
          placeholder="Password"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Login
        </button>
        {err && <div className="text-red-600">{err}</div>}
      </form>
    </div>
  );
};
