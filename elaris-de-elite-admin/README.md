# Élaris de Élite — Panel de Administración

Panel privado construido con **React 19 + Vite** y **Tailwind CSS**, usado por el personal de la tienda para gestionar productos, clientes, pedidos, administradores, códigos de descuento y campañas de marketing.

## Tecnologías y librerías principales

| Librería | Uso |
|---|---|
| `react` / `react-dom` | Librería de UI |
| `react-router-dom` | Enrutamiento y protección de rutas privadas |
| `tailwindcss` (`@tailwindcss/vite`) | Estilos |
| `lucide-react` | Iconografía |
| `recharts` | Gráficos del dashboard |
| `sweetalert2` | Alertas y confirmaciones |

## Requisitos previos

- Node.js 18+
- El backend (`backend/`) corriendo en `http://localhost:3000`

## Instalación y ejecución

```bash
cd elaris-de-elite-admin
npm install
npm run dev
```

Por defecto Vite usa el puerto `5173`; si el cliente ya lo está usando, este proyecto tomará el `5174` (el backend ya tiene habilitado CORS para ambos puertos).

## Estructura del proyecto

```
src/
├── pages/            # Vistas del panel (Dashboard, Productos, Clientes, Pedidos, Administradores, ...)
├── components/         # BarraLateral, BarraNavegacion, RutaPrivada
└── utils/                # adminSession.js (sesión reflejada en localStorage para la UI)
```

## Autenticación y rutas protegidas

El login (`pages/Login.jsx`) llama a `POST /api/loginAdmin`, que responde con los datos del administrador y setea una cookie httpOnly (`adminAuthCookie`) verificada por el backend en cada endpoint protegido.

Todas las rutas del panel, salvo `/login`, están envueltas en `components/RutaPrivada.jsx` (`App.jsx`), que redirige a `/login` si no hay una sesión de administrador activa. La protección real de los datos ocurre en el backend mediante el middleware `adminAuth`.

## Módulos disponibles

| Página | Función |
|---|---|
| `Dashboard.jsx` | Resumen general con estadísticas y gráficos |
| `Productos.jsx` / `AgregarProducto.jsx` | CRUD de productos (con subida de imágenes) |
| `CategoriasYMarcas.jsx` | CRUD de categorías y marcas |
| `Clientes.jsx` | Listado y eliminación de clientes |
| `Pedidos.jsx` | Listado de pedidos y cambio de estado |
| `Ventas.jsx` | Reportes de ventas |
| `Reviews.jsx` | Moderación de reseñas de productos |
| `CodigosDescuentos.jsx` / `AgregarCodigo.jsx` | CRUD de códigos de descuento |
| `Marketing.jsx` / `CampanasMarketingAgregar.jsx` | CRUD de campañas de marketing |
| `Administradores.jsx` / `AgregarAdministrador.jsx` | Gestión de cuentas de administrador |
