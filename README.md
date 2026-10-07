# Trabajo Práctico Integrador N° II

Frontend del Sistema de Gestión de Blog Personal con Autenticación, desarrollado con React y Vite. Consume la API del Trabajo Práctico Integrador N° I.

## Backend utilizado

Repositorio del Trabajo Práctico Integrador N° I:

https://github.com/bbautista2026ipf-star/trabajo-practico-integrador-1

## Tecnologías

- React + Vite
- React Router
- Tailwind CSS

## Cómo levantar el proyecto

### 1. Backend

```bash
git clone https://github.com/bbautista2026ipf-star/trabajo-practico-integrador-1.git
cd trabajo-practico-integrador-1
npm install
```

Crear el archivo `.env` a partir de `.env.example`, completar los datos de MySQL y el `JWT_SECRET`, y crear la base de datos indicada en `DB_NAME`. Luego:

```bash
npm run dev
```

El servidor queda en `http://localhost:3000`, con CORS habilitado para `http://localhost:5173` y la opción `credentials`.

### 2. Frontend

```bash
git clone https://github.com/bbautista2026ipf-star/trabajo-practico-integrador-2.git
cd trabajo-practico-integrador-2
npm install
npm run dev
```

Abrir `http://localhost:5173` en el navegador.

## Rutas

| Ruta | Tipo | Descripción |
| --- | --- | --- |
| `/login` | Pública | Inicio de sesión |
| `/register` | Pública | Registro de usuario |
| `/home` | Privada | Listado de artículos publicados |
| `*` | - | Redirige a `/home` o `/login` según la sesión |

## Estructura

```
src/
├── components/   Navbar
├── hooks/        useFetch y useForm
├── pages/        HomePage, LoginPage y RegisterPage
├── router/       AppRouter, PrivateRoutes y PublicRoutes
├── App.jsx
├── index.css
└── main.jsx
```

## Ramas

- `main`: rama principal.
- `develop`: rama de integración.
- `desarrollo-pantallas`: custom hooks, páginas, Navbar y estilos con Tailwind CSS.
- `proteccion-rutas`: login y registro contra el backend, isLogged en localStorage, logout y rutas públicas y privadas.
