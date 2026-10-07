import { Link } from "react-router";

export const Navbar = () => {
  return (
    <header className="bg-white shadow">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <span className="text-xl font-bold text-blue-600">Blog Personal</span>

        <div className="flex items-center gap-4">
          <Link
            to="/home"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Inicio
          </Link>

          <button
            type="button"
            className="rounded bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};
