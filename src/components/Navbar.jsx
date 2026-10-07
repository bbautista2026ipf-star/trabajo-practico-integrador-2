import { useState } from "react";
import { Link, useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Con 401 la cookie ya no existe, igual se cierra la sesión en el front
      if (response.ok || response.status === 401) {
        localStorage.removeItem("isLogged");
        navigate("/login", {
          state: { message: "Sesión cerrada correctamente" },
        });
      } else {
        setError("No se pudo cerrar la sesión");
      }
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <span className="text-xl font-bold text-blue-600">Blog Personal</span>

        <div className="flex items-center gap-4">
          {error && <span className="text-sm text-red-600">{error}</span>}

          <Link
            to="/home"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Inicio
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoading}
            className="rounded bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {isLoading ? "Saliendo..." : "Logout"}
          </button>
        </div>
      </nav>
    </header>
  );
};
