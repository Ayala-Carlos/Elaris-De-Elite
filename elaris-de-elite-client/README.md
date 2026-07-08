# Élaris de Élite — Tienda en línea (Cliente)

Aplicación pública de la tienda, construida con **React 19 + Vite** y **Tailwind CSS**. Permite a los clientes navegar el catálogo, registrarse, iniciar sesión, comprar, dejar reseñas y consultar su historial de pedidos.

## Tecnologías y librerías principales

| Librería | Uso |
|---|---|
| `react` / `react-dom` | Librería de UI |
| `react-router-dom` | Enrutamiento y protección de rutas privadas |
| `tailwindcss` (`@tailwindcss/vite`) | Estilos y diseño responsive |
| `lucide-react` / `react-icons` | Iconografía |
| `sweetalert2` | Alertas y confirmaciones (toasts/modales) |
| `recharts` | Gráficos (página de reseñas/estadísticas) |

## Requisitos previos

- Node.js 18+
- El backend (`backend/`) corriendo en `http://localhost:3000`

## Instalación y ejecución

```bash
cd elaris-de-elite-client
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173` (puerto por defecto de Vite).

Si el backend corre en otra URL, se puede sobreescribir con una variable de entorno:

```bash
VITE_API_URL=http://localhost:3000/api
```

## Estructura del proyecto

```
src/
├── pages/            # Vistas/rutas de la app (Login, Productos, Carrito, PerfilUsuario, ...)
├── components/         # Componentes reutilizables (Navbar, Footer, PrivateRoute, ...)
├── context/             # AuthContext y CartContext (estado global de sesión y carrito)
├── hooks/                # Hooks personalizados (useAuth, useCart, useProducts, useOrderHistory, ...)
└── services/              # Wrappers de fetch hacia la API del backend
```

## Funcionalidades principales

- **Catálogo de productos**: listado con filtros por categoría y búsqueda (`Productos.jsx`), detalle de producto (`ProductoDetalle.jsx`).
- **Autenticación**: registro con confirmación de cuenta por correo electrónico, inicio de sesión, recuperación de contraseña por correo (`Login.jsx`, `AuthContext`).
- **Carrito de compras**: agregar/actualizar/eliminar productos, aplicar códigos de descuento, y checkout con dirección de envío y pago simulado (`Carrito.jsx`, `CartContext`). Solo un cliente autenticado puede usar el carrito y finalizar una compra (rutas protegidas con `PrivateRoute`).
- **Perfil de usuario**: edición de datos personales e **historial de pedidos** con su estado (`PerfilUsuario.jsx`).
- **Reseñas de productos**: un cliente autenticado puede dejar una reseña únicamente sobre productos que ya haya comprado.
- **Notificaciones**: confirmaciones y errores mediante SweetAlert2 y mensajes en línea en los formularios.

## Rutas protegidas

`/perfilusuario` y `/carrito` requieren sesión iniciada (ver `components/PrivateRoute.jsx`); si no hay sesión, redirige a `/login`.
