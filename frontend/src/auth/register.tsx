import React, { useState } from "react";
import api from "../api";

export const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { name, email, password });
      setMsg("Registered! Please login.");
    } catch (err: any) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Register</h2>
      <form onSubmit={submit} className="space-y-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border"
          placeholder="Name"
        />
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
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Register
        </button>
        {msg && <div className="mt-2 text-sm">{msg}</div>}
      </form>
    </div>
  );
};
