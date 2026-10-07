import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, { credentials: "include" });
      const result = await response.json();

      if (response.ok) {
        setData(result);
      } else if (response.status === 401) {
        setError("Sesión inexistente o expirada, volvé a iniciar sesión");
      } else if (response.status === 403) {
        setError("No tenés permisos para ver este contenido");
      } else {
        setError("Ocurrió un error en el servidor, intentá más tarde");
      }
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  // La petición se repite cada vez que cambia la url
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
};
