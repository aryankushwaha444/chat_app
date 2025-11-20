import React, { useContext, useState } from "react";
import { AuthContext } from "./auth/authContext";
import { Login } from "./auth/login";
import { Register } from "./auth/register";
import { Chat } from "./components/chat";

const App: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const [view, setView] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="max-w-2xl mx-auto flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Chat App</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-2">
              <div className="text-sm">{user.name}</div>
              <button onClick={logout} className="px-3 py-1 border rounded">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setView("login")}
                className="px-3 py-1 border rounded"
              >
                Login
              </button>
              <button
                onClick={() => setView("register")}
                className="px-3 py-1 border rounded"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        {user ? <Chat /> : view === "login" ? <Login /> : <Register />}
      </main>
    </div>
  );
};

export default App;
