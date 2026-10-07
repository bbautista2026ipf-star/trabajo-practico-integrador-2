import { Navbar } from "../components/Navbar";
import { useFetch } from "../hooks/useFetch";

export const HomePage = () => {
  const {
    data: articles,
    isLoading,
    error,
  } = useFetch("http://localhost:3000/api/articles");

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Artículos publicados
        </h1>

        {isLoading && <p className="text-gray-600">Cargando artículos...</p>}

        {error && (
          <p className="rounded bg-red-100 px-4 py-2 text-red-700">{error}</p>
        )}

        {articles?.length === 0 && (
          <p className="text-gray-600">No hay artículos publicados.</p>
        )}

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles?.map((article) => (
            <li
              key={article.id}
              className="flex flex-col gap-2 rounded-lg bg-white p-4 shadow"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {article.title}
              </h2>
              <p className="flex-1 text-sm text-gray-600">
                {article.excerpt || "Sin resumen"}
              </p>
              <p className="text-sm font-medium text-blue-600">
                Autor: {article.author.username}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};
