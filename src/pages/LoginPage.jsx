import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { formState, handleInputChange } = useForm({
    username: "",
    password: "",
  });
  const { username, password } = formState;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setErrors([]);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLogged", "true");
        navigate("/home", { state: { message: data.message } });
      } else if (response.status === 400) {
        setErrors(data.errors);
      } else if (response.status === 401) {
        setError("Usuario o contraseña incorrectos");
      } else {
        setError("Ocurrió un error en el servidor, intentá más tarde");
      }
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-sm rounded-lg bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Iniciar sesión
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Usuario
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              className="rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Contraseña
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </label>

          {errors.length > 0 && (
            <ul className="list-inside list-disc rounded bg-red-100 px-4 py-2 text-sm text-red-700">
              {errors.map((err) => (
                <li key={err.msg}>{err.msg}</li>
              ))}
            </ul>
          )}

          {error && (
            <p className="rounded bg-red-100 px-4 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tenés cuenta?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Registrate
          </Link>
        </p>
      </section>
    </main>
  );
};
